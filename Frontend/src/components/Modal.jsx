import React from 'react';
import './Modal.css'; // Create a new CSS file for modal styles

const Modal = ({ show, handleClose, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={handleClose} className="modal-close-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;