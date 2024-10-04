import React from 'react';

const Modal = ({ showModal, handleClose, children }) => {
  if (!showModal) return null;
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <span className='close-btn' onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
