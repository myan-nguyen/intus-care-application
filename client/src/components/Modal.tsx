import React, { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string | ReactNode; // The extra information to display in the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {typeof content === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />  // If content is string, use dangerouslySetInnerHTML
        ) : (
          content  // Otherwise render it as a ReactNode
        )}
      </div>
    </div>
  );
};

export default Modal;
