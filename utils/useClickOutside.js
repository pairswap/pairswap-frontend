import { useRef, useEffect } from 'react';

function useClickOutside(callback) {
  const ref = useRef();

  useEffect(() => {
    function onClickOutside(event) {
      if (!ref?.current?.contains(event.target) || ['Escape', 'Esc'].includes(event.key)) {
        callback();
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.addEventListener('keydown', onClickOutside);
    };
  }, [callback]);

  return ref;
}

export default useClickOutside;
