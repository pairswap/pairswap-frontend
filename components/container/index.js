import PropTypes from 'prop-types';

function Main({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen font-base bg-gradient-to-b from-indigo-50 to-gray-100">
      {children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
