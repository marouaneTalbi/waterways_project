import React, {useEffect, useState} from "react";
import GenericModal from '../GenericModal/GenericModal';
import EstablishmentList from "./EstablishmentList";
import EstablishmentForm from "./EstablishmentForm";

export default function Establishments() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="mt-8 mx-4">
            <GenericModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Modifier mes informations"
            >
                <EstablishmentForm onCloseModal={handleCloseModal}/>
            </GenericModal>

            <div className="min-w-full leading-normal">
                <h2>Establishment</h2>
                <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>Ajouter</button>
            </div>
            {
                <EstablishmentList  />
            }
        </div>
    );
}