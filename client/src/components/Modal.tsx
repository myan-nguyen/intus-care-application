import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string; // The extra information to display in the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Modal;
