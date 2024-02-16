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

export default function ProviderDashboard() {
    const [isBoatModalOpen, setBoatModalOpen] = useState(false);


    const { getUser, user, getProviderSatisfaction, satisfaction, reservations, getProviderReservation, getSlotsFromHistory, reservationsPassed, gain, getProviderGain } = useContext(UserContext);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getProviderGain(user.id);
            getSlotsFromHistory(user.id);
            getProviderReservation(user.id);
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
            <div className='bg-white rounded border-2 border-gray-100 p-4 flex flex-row gap-4 items-center'>
            <div className='bg-[#FFF6EB] w-20 h-20 flex justify-center items-center rounded-full'>
                <svg  width="25" height="23" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#feac50" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>                </div>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>
                        {gain === null ? 
                            <Loader /> :
                            (gain + '€')
                        }
                    </span>
                    <span className='text-lg text-gray-500'>Revenue total</span>
                </div>
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-4 flex flex-row gap-4 items-center'>
                <div className='bg-[#EDF8FF] w-20 h-20 flex justify-center items-center rounded-full'>
                    <svg width="25" height="23" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 9.33334H19.8333M17.5 14H19.8333M14 18.6667H8.16667M24.5 14V7.00001C24.5 5.71134 23.4553 4.66667 22.1667 4.66667H5.83333C4.54467 4.66667 3.5 5.71134 3.5 7V21C3.5 22.2887 4.54467 23.3333 5.83333 23.3333H14M8.16667 9.33334V14H12.8333V9.33334H8.16667Z" stroke="#69C0FF" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22.4791 22.4791C23.0069 21.9512 23.3333 21.2221 23.3333 20.4167C23.3333 18.8058 22.0275 17.5 20.4167 17.5C18.8058 17.5 17.5 18.8058 17.5 20.4167C17.5 22.0275 18.8058 23.3333 20.4167 23.3333C21.2221 23.3333 21.9512 23.0069 22.4791 22.4791ZM22.4791 22.4791L24.5 24.5" stroke="#69C0FF" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>
                        {reservationsPassed === null ? 
                            <Loader /> :
                            (reservationsPassed)
                        }
                    </span>
                    <span className='text-lg text-gray-500'>Nombre de réservations effectué</span>
                </div>
            </div>
            <div className='bg-white rounded border-2 border-gray-100 p-4 flex flex-row gap-4 items-center'>
                <div className='bg-[#EDF8FF] w-20 h-20 flex justify-center items-center rounded-full'>
                    <svg width="25" height="23" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 9.33334H19.8333M17.5 14H19.8333M14 18.6667H8.16667M24.5 14V7.00001C24.5 5.71134 23.4553 4.66667 22.1667 4.66667H5.83333C4.54467 4.66667 3.5 5.71134 3.5 7V21C3.5 22.2887 4.54467 23.3333 5.83333 23.3333H14M8.16667 9.33334V14H12.8333V9.33334H8.16667Z" stroke="#69C0FF" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22.4791 22.4791C23.0069 21.9512 23.3333 21.2221 23.3333 20.4167C23.3333 18.8058 22.0275 17.5 20.4167 17.5C18.8058 17.5 17.5 18.8058 17.5 20.4167C17.5 22.0275 18.8058 23.3333 20.4167 23.3333C21.2221 23.3333 21.9512 23.0069 22.4791 22.4791ZM22.4791 22.4791L24.5 24.5" stroke="#69C0FF" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>
                        {reservations === null ? 
                            <Loader /> :
                            (reservations)
                        }
                    </span>
                    <span className='text-lg text-gray-500'>Nombre de réservations</span>
                </div>
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
                        <h4 className="text-xl font-medium">BOATS</h4>
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
