import { motion, AnimatePresence } from 'framer-motion';
import useClickOutside from '../../utils/useClickOutside';

function Modal({ isOpen, onClose, children }) {
  const ref = useClickOutside(onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-10"
        >
          <div
            ref={ref}
            className="w-[420px] bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl mx-4"
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
