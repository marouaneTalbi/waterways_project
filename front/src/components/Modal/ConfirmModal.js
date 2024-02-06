import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, message }) => {

    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        content: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Deletion"
            style={modalStyle}
            ariaHideApp={false}
        >
            <div>
                <p>{message}</p>
                <button onClick={onConfirm}>Oui</button>
                <button onClick={onRequestClose}>Annuler</button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
