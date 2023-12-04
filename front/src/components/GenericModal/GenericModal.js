import React from 'react';
import { Modal } from 'flowbite-react';

const GenericModal = ({ isOpen, onClose, title, children }) => {
    return (
        <Modal show={isOpen} onClose={onClose} size="xl" popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-lg font-semibold mb-2 text-center">{title}</div>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default GenericModal;
