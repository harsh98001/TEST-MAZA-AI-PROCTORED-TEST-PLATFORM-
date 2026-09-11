import { useState, useEffect, useRef, useCallback } from 'react';
import { initVisionEngine, captureEvidenceSnapshot, isAIProctoringEnabled } from '../proctoring/aiVisionEngine';

export function useAIProctoring({
  videoElement = null,
  isActive = false,
  onViolation = () => {},
  onCriticalViolation = () => {},
  audioLevel = 0,
}) {
  const [riskScore, setRiskScore] = useState(0); // 0 to 100
  const [faceCount, setFaceCount] = useState(1);
  const [isDeviceDetected, setIsDeviceDetected] = useState(false);
  const [aiStatus, setAiStatus] = useState('STANDBY'); // 'STANDBY' | 'NORMAL' | 'NO_FACE' | 'MULTI_FACE' | 'PHONE'
  const [violationsList, setViolationsList] = useState([]);

  const multiFaceStreakRef = useRef(0);
  const zeroFaceStreakRef = useRef(0);
  const engineRef = useRef(null);

  // 1. Decay risk score slowly over time
  useEffect(() => {
    if (!isActive) return;

    const decayTimer = setInterval(() => {
      setRiskScore((prev) => Math.max(0, prev - 2));
    }, 3000);

    return () => clearInterval(decayTimer);
  }, [isActive]);

  // 2. Audio level contribution to risk score
  useEffect(() => {
    if (!isActive || audioLevel <= 68) return;

    setRiskScore((prev) => Math.min(100, prev + 8));
  }, [audioLevel, isActive]);

  // 3. Handle AI Vision Events
  const handleVisionEvent = useCallback(
    (event) => {
      if (!isActive) return;

      if (event.type === 'FACE_COUNT') {
        const count = event.count;
        setFaceCount(count);

        if (count === 1) {
          // Normal single candidate face
          multiFaceStreakRef.current = 0;
          zeroFaceStreakRef.current = 0;
          setAiStatus('NORMAL');
        } else if (count === 0) {
          // Zero faces detected
          zeroFaceStreakRef.current++;
          multiFaceStreakRef.current = 0;
          setAiStatus('NO_FACE');

          // Log warning if absence lasts > 3 consecutive passes (~1.5s)
          if (zeroFaceStreakRef.current === 3) {
            const snapshot = videoElement ? captureEvidenceSnapshot(videoElement, 320) : null;
            setRiskScore((prev) => Math.min(100, prev + 15));
            const violation = {
              type: 'FACE_ABSENT',
              reason: 'Candidate face absent from camera frame',
              timestamp: Date.now(),
              snapshot,
            };
            setViolationsList((prev) => [violation, ...prev].slice(0, 20));
            onViolation('Candidate face not detected in camera frame', violation);
          }
        } else if (count >= 2) {
          // Multiple faces detected
          multiFaceStreakRef.current++;
          zeroFaceStreakRef.current = 0;
          setAiStatus('MULTI_FACE');
          setRiskScore(100);

          // Debounce: 2 consecutive detections (~1s) triggers immediate hard auto-lockout
          if (multiFaceStreakRef.current >= 2) {
            const snapshot = videoElement ? captureEvidenceSnapshot(videoElement, 320) : null;
            const violation = {
              type: 'MULTIPLE_FACES',
              reason: 'Multiple faces detected in examination frame (Unauthorized presence)',
              timestamp: Date.now(),
              snapshot,
            };
            setViolationsList((prev) => [violation, ...prev].slice(0, 20));
            onCriticalViolation({
              reason: 'MULTIPLE_FACES_DETECTED',
              message: 'Multiple individuals detected in proctor camera stream.',
              snapshot,
            });
          }
        }
      } else if (event.type === 'DEVICE_DETECTED') {
        // Mobile phone / handheld device detected
        setIsDeviceDetected(true);
        setAiStatus('PHONE');
        setRiskScore((prev) => Math.min(100, prev + 45));

        const violation = {
          type: 'DEVICE_DETECTED',
          reason: 'Mobile handheld phone detected in examination area',
          timestamp: Date.now(),
          snapshot: event.snapshot,
        };
        setViolationsList((prev) => [violation, ...prev].slice(0, 20));
        onViolation('Unauthorized mobile phone / handheld device detected', violation);

        setTimeout(() => setIsDeviceDetected(false), 4000);
      }
    },
    [isActive, onCriticalViolation, onViolation, videoElement]
  );

  // 4. Initialize Vision Engine when video element is ready
  useEffect(() => {
    if (!isActive || !videoElement || !isAIProctoringEnabled()) {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
      setAiStatus('STANDBY');
      return;
    }

    try {
      const engine = initVisionEngine(videoElement, handleVisionEvent);
      engineRef.current = engine;
      setAiStatus('NORMAL');

      return () => {
        engine.stop();
        engineRef.current = null;
      };
    } catch (err) {
      console.warn('AI Vision Engine init error:', err);
    }
  }, [handleVisionEvent, isActive, videoElement]);

  const captureSnapshot = useCallback(
    (maxWidth = 320) => {
      if (videoElement) {
        return captureEvidenceSnapshot(videoElement, maxWidth);
      }
      return null;
    },
    [videoElement]
  );

  return {
    riskScore: Math.round(riskScore),
    faceCount,
    isDeviceDetected,
    aiStatus,
    violationsList,
    captureSnapshot,
  };
}
