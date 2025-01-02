import PropTypes from 'prop-types';

const Modal = ({ isOpen, title, children, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl p-6 bg-white rounded shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex justify-end space-x-2">
            <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={onClose}
            >
            Cerrar
            </button>
          {onConfirm && (
            <button type="button" onClick={onConfirm}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
};

export default Modal;