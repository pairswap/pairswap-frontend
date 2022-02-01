import PropTypes from 'prop-types';

function Main({ children }) {
  return (
    <div className="flex h-screen w-screen flex-col bg-gradient-to-b from-indigo-50 to-gray-100 font-base">
      {children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
