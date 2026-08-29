import { useState, useEffect, useRef, useCallback } from 'react';

export function useAdvancedProctor({
  isActive = false,
  onViolation = () => {},
  maxViolations = 3,
}) {
  const [cameraStream, setCameraStream] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0); // 0 to 100
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isScreenSharingDetected, setIsScreenSharingDetected] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const audioAnimationRef = useRef(null);

  // 1. Initialize Webcam & Microphone
  useEffect(() => {
    if (!isActive) {
      // Clean up media streams
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (audioAnimationRef.current) {
        cancelAnimationFrame(audioAnimationRef.current);
      }
      return;
    }

    let streamInstance = null;

    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 320 }, height: { ideal: 240 }, frameRate: { ideal: 15 } },
          audio: true,
        });

        streamInstance = stream;
        setCameraStream(stream);
        setHasCameraPermission(true);
        setHasMicPermission(true);

        // Setup Audio Analyser
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const audioCtx = new AudioContext();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyserRef.current = analyser;

          const microphone = audioCtx.createMediaStreamSource(stream);
          microphoneRef.current = microphone;
          microphone.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const checkAudio = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            const volume = Math.min(100, Math.round((average / 128) * 100));
            setAudioLevel(volume);

            // Flag high sustained volume (talking violation)
            if (volume > 75) {
              onViolation('High vocal audio / conversational noise detected in room');
            }

            audioAnimationRef.current = requestAnimationFrame(checkAudio);
          };

          checkAudio();
        }
      } catch (err) {
        console.warn('Webcam/Microphone access not granted or unavailable:', err);
        setHasCameraPermission(false);
        setHasMicPermission(false);
      }
    }

    startMedia();

    return () => {
      if (streamInstance) {
        streamInstance.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (audioAnimationRef.current) {
        cancelAnimationFrame(audioAnimationRef.current);
      }
    };
  }, [isActive]);

  // 2. Anti-Copy / Anti-Paste / Anti-Context Menu / Anti-Screenshot
  useEffect(() => {
    if (!isActive) return;

    const handleCopy = (e) => {
      e.preventDefault();
      onViolation('Copy action blocked (Clipboard protected)');
    };

    const handleCut = (e) => {
      e.preventDefault();
      onViolation('Cut action blocked (Clipboard protected)');
    };

    const handlePaste = (e) => {
      e.preventDefault();
      onViolation('Paste action blocked (Clipboard protected)');
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      onViolation('Right-click inspect menu blocked');
    };

    const handleSelectStart = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Ctrl+U (source), Ctrl+S (save), Ctrl+P (print)
      if (isCtrlOrCmd && ['c', 'v', 'x', 'a', 'u', 's', 'p'].includes(key)) {
        e.preventDefault();
        onViolation(`Keyboard shortcut Ctrl+${key.toUpperCase()} blocked`);
      }

      // Block F12 and Ctrl+Shift+I / Ctrl+Shift+J (DevTools)
      if (e.key === 'F12' || (isCtrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(key))) {
        e.preventDefault();
        onViolation('Developer Inspection Tools shortcut blocked');
      }

      // Block PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        onViolation('Screenshot / PrintScreen capture attempted');
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isActive, onViolation]);

  // 3. Anti-DevTools & Window Geometry Monitoring
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      if (widthThreshold || heightThreshold) {
        setIsDevToolsOpen(true);
        onViolation('DevTools docked panel or inspection extension detected');
      } else {
        setIsDevToolsOpen(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive, onViolation]);

  return {
    cameraStream,
    audioLevel,
    hasCameraPermission,
    hasMicPermission,
    isDevToolsOpen,
    isScreenSharingDetected,
  };
}
