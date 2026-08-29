import { motion } from 'framer-motion';
import { Camera, Check, Lock, Maximize2, Mic, MonitorX, ShieldAlert, ShieldCheck } from 'lucide-react';

export function ExamIntroModal({
  courseTitle,
  phaseTitle,
  questionCount,
  onStartExam,
}) {
  const securityRules = [
    { icon: Camera, title: 'Biometric Optical Stream', text: 'Live webcam video is continuously analyzed for head pose and multi-face detection.' },
    { icon: Mic, title: 'Acoustic Decibel Monitoring', text: 'Microphone ambient audio is analyzed in real-time to detect vocal cues and background speech.' },
    { icon: Lock, title: 'Hardware Keybind Lockout', text: 'Clipboard (copy/paste), context menus, F12 developer console, and print-screen are intercepted.' },
    { icon: MonitorX, title: 'Display Isolation Protocol', text: 'Window blur, tab switches, secondary displays, and screen-sharing utilities are blocked.' },
    { icon: ShieldAlert, title: '3-Strike Disqualification', text: 'A maximum of 3 security infractions will result in immediate automatic test termination.' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full p-8 rounded-lg border border-app bg-surface space-y-6 shadow-2xl text-main relative overflow-hidden"
      >
        {/* Top Eyebrow */}
        <div className="flex items-center justify-between border-b border-app pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-[#D64545]/10 border border-[#D64545]/30 flex items-center justify-center text-[#D64545]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block font-medium">
                TEST MAZA // SECURE PROCTOR CORE
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-main uppercase">
                EXAMINATION ENVIRONMENT
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono text-muted uppercase px-2.5 py-1 rounded border border-app bg-surface-raised">
            STRICT MODE
          </span>
        </div>

        {/* Course Target Information */}
        <div className="space-y-1.5 font-mono text-xs text-secondary bg-surface-raised p-4 rounded border border-app">
          <div className="flex justify-between items-center">
            <span className="text-muted uppercase">CURRICULUM:</span>
            <strong className="text-main font-medium">{courseTitle}</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted uppercase">EVALUATION PHASE:</span>
            <strong className="text-main font-medium">{phaseTitle}</strong>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-app">
            <span className="text-muted uppercase">TOTAL QUESTIONS:</span>
            <strong className="text-[#D64545] font-medium">{questionCount} Evaluated MCQs (60s / Q)</strong>
          </div>
        </div>

        {/* Security Checklist */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block font-medium">
            ACTIVE INTEGRITY PROTOCOLS
          </span>
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {securityRules.map((rule, idx) => {
              const Icon = rule.icon;
              return (
                <div key={idx} className="flex items-start space-x-3 p-2.5 rounded border border-app bg-surface-raised/50 text-xs">
                  <Icon size={16} className="text-[#D64545] mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="font-mono text-[11px] text-main font-medium uppercase block">
                      {rule.title}
                    </span>
                    <p className="text-secondary font-body leading-relaxed text-[11px]">
                      {rule.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Launch Button */}
        <button
          onClick={onStartExam}
          className="w-full py-4 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-[#D64545]/25 cursor-pointer"
          type="button"
        >
          <Maximize2 size={15} />
          <span>AUTHORIZE SENSORS & ENTER SECURE EXAM</span>
        </button>
      </motion.div>
    </div>
  );
}
