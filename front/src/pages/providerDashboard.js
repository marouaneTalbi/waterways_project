import React, { useState, useContext, useEffect } from 'react'
import BoatProvider from '../contexts/boatContext'
import EstablishmentProvider from '../contexts/establishmentContext'
import SlotsProvider from '../contexts/slotsContext'
import BoatList from '../components/Boat/BoatList'
import BoatForm from '../components/Boat/BoatForm'
import GenericModal from '../components/GenericModal/GenericModal'
import Establishments from '../components/Establishment/establishments'
import { UserContext } from '../contexts/userContext'
import Loader from '../components/Loader/Loader'
import { TranslationContext } from '../contexts/translationContext'

export default function ProviderDashboard() {
    const [isBoatModalOpen, setBoatModalOpen] = useState(false);
    const { translations  } = useContext(TranslationContext);


    const { getUser, user, getProviderSatisfaction, satisfaction } = useContext(UserContext);

    useEffect(() => {
        getUser();
    }, []);
    
    useEffect(() => {
        if (user) {
            getProviderSatisfaction(user.id);
        }
    }, [user]);

    const handleCloseModal = () => {
        setBoatModalOpen(false);
    };
    const handleOpenBoatModal = () => {
        setBoatModalOpen(true);
    }

    return (
        <div className="grid md:grid-cols-4 grid-cols-1 md:grid-rows-5 grid-rows-8 gap-4 w-full h-[1900px] md:h-auto">
            <div className='bg-white rounded border-2 border-gray-100 p-4'>
                
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-4'>
                {/* STAT 2 */}
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-4'>
                {/* STAT 3 */}
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-6 flex flex-row gap-4 items-center'>
                <div className='bg-[#FFF5FB] w-20 h-20 flex justify-center items-center rounded-full'>
                    <svg width="25" height="23" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3333 1C13.6 1 11.5 4.11111 11.5 5.66667C11.5 4.11111 9.4 1 5.66667 1C1.93333 1 1 4.11111 1 5.66667C1 13.8333 11.5 19.6667 11.5 19.6667C11.5 19.6667 22 13.8333 22 5.66667C22 4.11111 21.0667 1 17.3333 1Z" stroke="#FFB6E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>
                        {satisfaction === null ? 
                            <Loader /> :
                            (satisfaction === 0 ? 'aucun' : (satisfaction + '%'))
                        }
                    </span>
                    <span className='text-lg text-gray-500'>Taux de satisfaction</span>
                </div>
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
                            <SlotsProvider>
                                <BoatForm onCloseModal={handleCloseModal} />
                            </SlotsProvider>
                        </BoatProvider>
                    </EstablishmentProvider>
                </GenericModal>
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">{translations.boats}</h4>
                    </div>
                    <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenBoatModal}>AJOUTER</button>
                </header>
                <BoatProvider>
                    <BoatList showList={true}/>
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
