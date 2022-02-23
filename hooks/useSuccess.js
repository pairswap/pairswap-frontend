import create from 'zustand';

const useSuccess = create((set) => ({
  message: null,
  setMessage: (message) => set({ message }),
  reset: () => set({ message: null }),
}));

export default useSuccess;
