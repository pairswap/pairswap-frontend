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
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
        >
          <div ref={ref} className="w-[420px] min-h-[24rem] bg-white border rounded-xl">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
