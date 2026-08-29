import { useEffect, useRef } from 'react';
import { Camera, Lock, Mic, ShieldCheck, Video, VideoOff, Volume2 } from 'lucide-react';

export function LiveProctorWidget({
  cameraStream,
  audioLevel = 0,
  hasCameraPermission = false,
  hasMicPermission = false,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  return (
    <div className="rounded-lg border border-app bg-surface p-5 space-y-4 font-mono text-xs shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center hairline-b pb-3">
        <div className="flex items-center space-x-2 text-main font-medium">
          <span className="w-2 h-2 rounded-full bg-[#D64545] animate-pulse" />
          <span className="tracking-mono-label uppercase">LIVE PROCTOR HUD</span>
        </div>
        <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
          WATCHDOG ARMED
        </span>
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

        {/* Live Audio dB Bar Overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center space-x-2 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
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

      {/* Security Status Checklist */}
      <div className="space-y-2 pt-1 text-[10px] text-secondary">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <Camera size={11} className="text-[#10B981]" /> Video Stream
          </span>
          <span className="text-[#10B981]">ACTIVE</span>
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
