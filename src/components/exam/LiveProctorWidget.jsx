import { useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Camera,
  Eye,
  Lock,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Users,
  Video,
  VideoOff,
  Volume2,
} from 'lucide-react';

export function LiveProctorWidget({
  cameraStream,
  audioLevel = 0,
  hasCameraPermission = false,
  hasMicPermission = false,
  riskScore = 0,
  aiStatus = 'NORMAL',
  faceCount = 1,
  onVideoElementReady = null,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
      if (onVideoElementReady) {
        onVideoElementReady(videoRef.current);
      }
    }
  }, [cameraStream, onVideoElementReady]);

  const riskColor =
    riskScore > 70
      ? 'text-[#D64545] bg-[#D64545]/15 border-[#D64545]/40'
      : riskScore > 30
      ? 'text-[#EAB308] bg-[#EAB308]/15 border-[#EAB308]/40'
      : 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/40';

  const riskBg =
    riskScore > 70 ? 'bg-[#D64545]' : riskScore > 30 ? 'bg-[#EAB308]' : 'bg-[#10B981]';

  return (
    <div className="rounded-lg border border-app bg-surface p-5 space-y-4 font-mono text-xs shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center hairline-b pb-3">
        <div className="flex items-center space-x-2 text-main font-medium">
          <span className="w-2 h-2 rounded-full bg-[#D64545] animate-pulse" />
          <span className="tracking-mono-label uppercase">LIVE PROCTOR HUD</span>
        </div>
        <div className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-mono-label font-medium ${riskColor}`}>
          RISK: {riskScore}/100
        </div>
      </div>

      {/* Live Video Preview Box */}
      <div className="relative w-full aspect-video rounded overflow-hidden bg-black border border-app flex items-center justify-center">
        {hasCameraPermission && cameraStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
          />
        ) : (
          <div className="flex flex-col items-center space-y-1.5 text-center p-3 text-muted">
            <VideoOff size={20} className="text-[#D64545]" />
            <span className="text-[10px] tracking-mono-label uppercase">WEBCAM SIMULATOR</span>
            <span className="text-[9px] text-secondary">(Local Test Telemetry)</span>
          </div>
        )}

        {/* Live AI Vision Status Badge */}
        <div className="absolute top-2 left-2 flex items-center space-x-1.5 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 text-[9px]">
          {aiStatus === 'MULTI_FACE' ? (
            <span className="text-[#D64545] flex items-center gap-1 font-semibold animate-pulse">
              <Users size={10} /> MULTI-FACE ({faceCount})
            </span>
          ) : aiStatus === 'PHONE' ? (
            <span className="text-[#EAB308] flex items-center gap-1 font-semibold animate-pulse">
              <Smartphone size={10} /> PHONE DETECTED
            </span>
          ) : aiStatus === 'NO_FACE' ? (
            <span className="text-[#EAB308] flex items-center gap-1">
              <Eye size={10} /> NO FACE DETECTED
            </span>
          ) : (
            <span className="text-[#10B981] flex items-center gap-1">
              <ShieldCheck size={10} /> 1 FACE VERIFIED
            </span>
          )}
        </div>

        {/* Live Audio dB Bar Overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center space-x-2 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
          <Mic size={11} className={audioLevel > 60 ? 'text-[#D64545] animate-pulse' : 'text-[#10B981]'} />
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-100 rounded-full ${
                audioLevel > 60
                  ? 'bg-[#D64545]'
                  : audioLevel > 30
                  ? 'bg-[#EAB308]'
                  : 'bg-[#10B981]'
              }`}
              style={{ width: `${Math.max(8, audioLevel)}%` }}
            />
          </div>
          <span className="text-[9px] text-white/80">{audioLevel} dB</span>
        </div>
      </div>

      {/* Real-Time Risk Fusion Progress Bar */}
      <div className="space-y-1 pt-1">
        <div className="flex justify-between text-[9px] text-muted uppercase">
          <span>AI RISK FUSION INDEX</span>
          <span className={riskScore > 50 ? 'text-[#D64545] font-semibold' : 'text-main'}>
            {riskScore > 70 ? 'CRITICAL RISK' : riskScore > 30 ? 'ELEVATED' : 'NOMINAL'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-surface-raised rounded-full overflow-hidden border border-app">
          <div
            className={`h-full transition-all duration-300 rounded-full ${riskBg}`}
            style={{ width: `${Math.max(4, riskScore)}%` }}
          />
        </div>
      </div>

      {/* Security Status Checklist */}
      <div className="space-y-1.5 pt-1 text-[10px] text-secondary">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <Camera size={11} className="text-[#10B981]" /> AI Vision Proctor
          </span>
          <span className={aiStatus === 'MULTI_FACE' ? 'text-[#D64545] font-semibold' : 'text-[#10B981]'}>
            {aiStatus === 'MULTI_FACE' ? 'BREACHED' : 'ARMED'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <Volume2 size={11} className="text-[#10B981]" /> Acoustic Telemetry
          </span>
          <span className={audioLevel > 60 ? 'text-[#D64545] font-medium' : 'text-[#10B981]'}>
            {audioLevel > 60 ? 'NOISE DETECTED' : 'NORMAL'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <Lock size={11} className="text-[#D64545]" /> Clipboard & Keys
          </span>
          <span className="text-[#D64545]">LOCKED</span>
        </div>
      </div>
    </div>
  );
}
