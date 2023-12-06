import React, { useState } from 'react'
import UserInfos from '../components/User/UserInfos'
import GenericModal from '../components/GenericModal/GenericModal'
import UserForm from '../components/User/UserForm';

export default function Profile() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
        
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="grid grid-cols-12 gap-4 flex-1">
            <GenericModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Modifier mes informations"
            >
                <UserForm onCloseModal={handleCloseModal} />
            </GenericModal>
            <div className="col-span-12 md:col-span-8 bg-white rounded border-2 border-gray-100 p-4 relative">
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
            <div className="col-span-12 md:col-span-4 bg-white rounded border-1 border-gray-100 p-4">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Réservation(s)</h4>
                    </div>
                    <div className="flex flex-wrap py-6 gap-20 gap-y-10">
                        {/* USER RESERVATIONS LIST */}
                    </div>  
                </header>
            </div>
            <div className="col-span-12 md:col-span-8 bg-white rounded border-2 border-gray-100 p-4">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Historique de réservations</h4>
                    </div>
                </header>
                <div className="flex flex-wrap py-6 gap-20 gap-y-10">
                    {/* USER HISTORIC RESERVATIONS LIST */}
                </div>  
            </div>
        </div>
    )
}
