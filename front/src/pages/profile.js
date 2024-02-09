import React, { useState } from 'react'
import UserInfos from '../components/User/UserInfos'
import GenericModal from '../components/GenericModal/GenericModal'
import UserForm from '../components/User/UserForm';
import BoatProvider from '../contexts/boatContext';
import UserFavorisList from '../components/User/UserFavorisList';

export default function Profile() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
        
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="grid grid-cols-2 grid-rows-full md:grid-cols-4 md:grid-rows-4 gap-4 flex-1">
            <GenericModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Modifier mes informations"
            >
                <UserForm onCloseModal={handleCloseModal} />
            </GenericModal>
            <div className="col-span-4 row-span-2 row-start-3 md:row-start-1 md:col-span-3 md:row-span-2 bg-white rounded border-2 border-gray-100 p-4 relative">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Mes informations</h4>
                    </div>
                    <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>MODIFIER</button>
                </header>
                <div className="flex flex-wrap py-6 gap-20 gap-y-10">
                    <UserInfos />
                </div>  
                <div className="py-6 border-t border-gray-100 absolute bottom-0 w-[calc(100%_-_2rem)]">
                    <a href="/requestProvider" className="text-dark-orange p-3 bg-light-orange rounded-lg">Deviens Prestataire</a>
                </div>
            </div>
            <div className="row-span-2 col-span-4 col-start-1 row-start-1 md:col-span-2 md:col-start-4 md:row-start-1 bg-white rounded border-2 border-gray-100 p-4">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Réservation(s)</h4>
                    </div>
                    <div className="flex flex-wrap py-6 gap-20 gap-y-10">
                        {/* USER RESERVATIONS LIST */}
                    </div>  
                </header>
            </div>
            <div className="col-span-4 row-span-2 col-start-1 row-start-5 md:row-start-3 md:col-start-1 md:col-span-2 bg-white rounded border-2 border-gray-100 p-4">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Historique de réservations</h4>
                    </div>
                </header>
                <div className="flex flex-wrap py-6 gap-20 gap-y-10">
                    {/* USER HISTORIC RESERVATIONS LIST */}
                </div>  
            </div>

            <div className='col-span-4 row-span-2 col-start-1 row-start-7 md:row-start-3 md:col-start-3 md:col-span-3 bg-white rounded border-2 border-gray-100 p-4 overflow-y-scroll'>
                <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-medium">Mes favoris</h4>
                </div>
                <BoatProvider>
                    <UserFavorisList />
                </BoatProvider>
            </div>
        </div>
    )
}
