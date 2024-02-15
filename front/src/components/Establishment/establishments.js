import React, {useContext, useEffect, useState} from "react";
import GenericModal from '../GenericModal/GenericModal';
import EstablishmentList from "./EstablishmentList";
import EstablishmentForm from "./EstablishmentForm";
import { TranslationContext } from "../../contexts/translationContext";

export default function Establishments() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { translations  } = useContext(TranslationContext);
    
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <GenericModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Modifier mes informations"
            >
                <EstablishmentForm onCloseModal={handleCloseModal}/>
            </GenericModal>
            <header className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-medium">{translations.establishments}</h4>
                </div>
                <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>AJOUTER</button>
            </header>
            {
                <EstablishmentList  />
            }
        </div>
    );
}