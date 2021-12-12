function Main({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen font-base bg-gradient-to-b from-indigo-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {children}
    </div>
  );
}

export default Main;
