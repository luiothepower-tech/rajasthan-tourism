import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'warning';
  onClose?: () => void;
}

export const ItineraryToast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
}) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-stone-700"
        >
          {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
          {type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}

          <span className="text-xs sm:text-sm font-medium leading-snug">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
