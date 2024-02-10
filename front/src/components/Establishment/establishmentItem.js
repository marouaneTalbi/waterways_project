import React, { useState, useContext, useEffect } from 'react';
import { EstablishmentContext } from "../../contexts/establishmentContext";
import EstablishmentInfos from './EstablishmentInfo';
import EstablishmentForm from './EstablishmentForm';
import GenericModal from '../GenericModal/GenericModal';
import BoatItem from '../Boat/BoatItem'
import BoatProvider, { BoatContext } from '../../contexts/boatContext';
import BoatList from '../Boat/BoatList';
import BoatForm from '../Boat/BoatForm';

export default function EstablishmentItem() {
    const { getCurrentEstablishment, getEstablishmentItem } = useContext(EstablishmentContext);
    const {getboatsOfEstablishment,  boatList } = useContext(BoatContext);

    const [establishment, setEstablishment] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [boats, setBoats] = useState();
    const [isBoatModalOpen, setBoatModalOpen] = useState(false);

    const handleCloseBoatModal = () => {
        setBoatModalOpen(false);
    };
    const handleOpenBoatModal = () => {
        setBoatModalOpen(true);
    }

    const handleOpenModal = () => {
        getEstablishmentItem(establishment)
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        getCurrentEstablishment().then(setEstablishment)
    }, []) 

    useEffect(() => {
        if(establishment && establishment.id) {
            getboatsOfEstablishment(establishment.id)
        }
    }, [establishment]) 

    return (
        <div className="grid grid:cols-2 md:grid-cols-4 grid-rows-4 gap-4 flex-1">
            <div className="col-span-2 row-span-2 bg-white rounded border-2 border-gray-100 p-4">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Mes informations</h4>
                    </div>
                    <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>MODIFIER</button>
                </header>
                <div className="flex flex-wrap py-6 gap-10 gap-y-10">
                    <EstablishmentInfos establishment={establishment} />
                </div>
            </div>
            <div className="col-span-2 row-span-2 md:col-start-1 row-start-3 bg-white rounded border-2 border-gray-100 p-4">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Bateau(x)</h4>
                    </div>
                    <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenBoatModal}>AJOUTER</button>
                </header>
               { boatList && establishment && <BoatList /> }
    
                <GenericModal title="Ajouter un bateau" onClose={handleCloseBoatModal} isOpen={isBoatModalOpen}>
                    <BoatForm onCloseModal={handleCloseBoatModal} />
                </GenericModal>
   
            </div>
            <div className="md:col-span-2 md:row-span-4 md:col-start-3 md:row-start-1 bg-white rounded border-2 border-gray-100 p-4 hidden md:block">3</div>
        </div>
    //     <div className="grid grid-cols-2 grid-rows-4 gap-4">
    //     <div className="col-span-2 row-span-2">1</div>
    //     <div className="col-span-2 row-span-2 row-start-3">2</div>
    // </div>
        // <div className="flex-1 grid md:grid-cols-4 grid-cols-2">
        //     <GenericModal
        //         isOpen={isModalOpen}
        //         onClose={handleCloseModal}
        //         title="Modifier mes informations"
        //     >
        //         <EstablishmentForm onCloseModal={handleCloseModal}/>
        //     </GenericModal>
        //     <div className="col-span-12 md:col-span-2 bg-white rounded border-2 border-gray-100 p-4 relative">
        //         <header className="flex flex-row justify-between">
        //             <div className="flex flex-col gap-2">
        //                 <h4 className="text-xl font-medium">Mes informations</h4>
        //             </div>
        //             <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>MODIFIER</button>
        //         </header>
        //         <div className="flex flex-wrap py-6 gap-20 gap-y-10">
        //             <EstablishmentInfos establishment={establishment} />
        //         </div>  
        //     </div>
            
        // </div>
    );
}