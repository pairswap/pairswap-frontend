import create from 'zustand';

const useSuccess = create((set) => ({
  hash: null,
  message: null,
  setMessage: (message) => set({ message }),
  setHash: (hash) => set({ hash }),
  reset: () => set({ message: null }),
}));

export default useSuccess;
