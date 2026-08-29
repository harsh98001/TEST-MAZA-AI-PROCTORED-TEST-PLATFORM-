import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={15} className="text-[#10B981]" />;
      case 'warning':
        return <AlertTriangle size={15} className="text-[#F59E0B]" />;
      case 'error':
        return <XCircle size={15} className="text-[#F43F5E]" />;
      default:
        return <Info size={15} className="text-[#38BDF8]" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={() => removeToast(toast.id)}
            className="pointer-events-auto cursor-pointer p-3.5 rounded border border-[#EDE8D0]/15 bg-[#0A110E]/95 backdrop-blur-md shadow-2xl text-[#EDE8D0] flex items-start space-x-3 group"
          >
            <div className="mt-0.5">{getIcon(toast.type)}</div>
            <div className="flex-1 space-y-0.5">
              <div className="text-[11px] font-mono tracking-wider font-semibold uppercase text-[#EDE8D0]">
                {toast.title}
              </div>
              {toast.message && (
                <div className="text-xs text-[#9EA9A0] font-sans leading-relaxed">
                  {toast.message}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
