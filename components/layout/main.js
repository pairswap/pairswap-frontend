function Main({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen font-base bg-gradient-to-b from-indigo-50 to-white">
      {children}
    </div>
  );
}

export default Main;
