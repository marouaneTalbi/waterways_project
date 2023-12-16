import React, { useState } from 'react'
import BoatProvider from '../contexts/boatContext'
import EstablishmentProvider from '../contexts/establishmentContext'
import BoatList from '../components/Boat/BoatList'
import BoatForm from '../components/Boat/BoatForm'
import GenericModal from '../components/GenericModal/GenericModal'
import Establishments from '../components/Establishment/establishments'

export default function ProviderDashboard() {
    const [isBoatModalOpen, setBoatModalOpen] = useState(false);

    const handleCloseModal = () => {
        setBoatModalOpen(false);
    };
    const handleOpenBoatModal = () => {
        setBoatModalOpen(true);
    }

    return (
        <div className="grid md:grid-cols-4 grid-cols-1 md:grid-rows-5 grid-rows-8 gap-4 w-full h-[1900px] md:h-auto">
            <div className='bg-white rounded border-2 border-gray-100 p-4'>
                {/* STAT 1 */}
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-4'>
                {/* STAT 2 */}
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-4'>
                {/* STAT 3 */}
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-4'>
                {/* STAT 4 */}
            </div>
            {/**/} <div className="md:col-span-2 row-span-2 bg-white rounded border-2 border-gray-100 p-4">
                <EstablishmentProvider>
                    <Establishments/>
                </EstablishmentProvider>
            </div>
            <div className="md:col-span-2 row-span-2 md:col-start-3 bg-white rounded border-2 border-gray-100 p-4">
                <GenericModal title="Ajouter un bateau" onClose={handleCloseModal} isOpen={isBoatModalOpen}>
                    <EstablishmentProvider>
                        <BoatProvider>
                            <BoatForm onCloseModal={handleCloseModal} />
                        </BoatProvider>
                    </EstablishmentProvider>
                </GenericModal>
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Bateau(x)</h4>
                    </div>
                    <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenBoatModal}>AJOUTER</button>
                </header>
                <BoatProvider>
                    <BoatList />
                </BoatProvider>
            </div> 
            <div className="md:col-span-2 row-span-2 md:row-start-4 bg-white rounded border-2 border-gray-100 p-4">
                {/* RESERVATION LIST */}
            </div>
            <div className="md:col-span-2 row-span-2 md:col-start-3 md:row-start-4 bg-white rounded border-2 border-gray-100 p-4">
                {/* I DON'T KNOW */}
            </div>
        </div>
    )
}
