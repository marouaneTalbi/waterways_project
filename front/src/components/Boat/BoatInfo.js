'use client';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BoatContext } from '../../contexts/boatContext'
import Loader from '../Loader/Loader';
import DataCard from '../DataCard/DataCard';
import { faHouse, faMoneyBill, faUser, faFileLines, faGears, faWandMagicSparkles, faWrench, faBath, faRocket } from '@fortawesome/free-solid-svg-icons';
import GenericModal from '../GenericModal/GenericModal';
import BoatForm from './BoatForm';
import EstablishmentProvider from '../../contexts/establishmentContext';
import SlotsProvider from '../../contexts/slotsContext';
import GoogleMapComponent from '../GoogleMap/GoogleMap';
import { CommentContext } from '../../contexts/commentContext';
import NoteCard from '../notes/NoteCard';
import { NoteContext } from '../../contexts/noteContext';

export default function BoatInfo() {
    const { id } = useParams()
    const { getBoat, boat } = useContext(BoatContext);
    const { getBoatComments, boatComments } = useContext(CommentContext);
    const { getBoatNotes, getPercentage, ratings } = useContext(NoteContext);

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
        
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        getBoatNotes(id);
    }, [])

    useEffect(() => {
        getBoatComments(id);
    }, [])

    useEffect(() => {
        getBoat(id)
    }, [id])

    return (
        <div className="grid md:grid-cols-4 grid-cols-2 md:grid-rows-4 grid-rows-full gap-4 w-full">
            <GenericModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Modifier mes informations"
            >
                <EstablishmentProvider>
                    <SlotsProvider>
                        <BoatForm onCloseModal={handleCloseModal} />
                    </SlotsProvider>
                </EstablishmentProvider>
            </GenericModal>
            <div className="col-span-2 row-span-4 md:row-span-4 row-start-4 bg-white rounded border-2 border-gray-100 p-4 relative">
                <header className='flex flex-row justify-between'>
                    {boat == null ? <Loader /> : (
                        <h3 className='font-semibold text-xl'>{boat.name}</h3>
                    )}
                    <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>MODIFIER</button>
                </header>
                <div className='mt-4 flex flex-col mg:mb-10 mb-[100px]'>
                    {boat == null ? (
                        <div className="flex items-center justify-center h-[300px] w-full bg-gray-300 rounded-md dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                            </svg>
                        </div>
                    ) : (
                        <img alt='boat' 
                        src={boat ?  process.env.REACT_APP_SERVER+boat?.imageUrl : 'https://coursnautique.com/wp-content/uploads/2022/02/Les-diff%C3%A9rentes-parties-dun-bateau-scaled.jpeg' }
                        className='bg-red-500 w-full object-cover h-[300px] rounded-md' 
                        />

                    )}
                    <div className='flex flex-row flex-wrap h-max gap-8 mt-8 mb-8'>
                        <DataCard title='etablissement' value={boat?.establishment.name} icon={faHouse} />
                        <DataCard title='modele' value={boat?.modele} icon={faGears} />
                        <DataCard title='prix' value={boat?.price+'€'} icon={faMoneyBill} />
                        <DataCard title='personnes max' value={boat?.capacity} icon={faUser} />
                        <DataCard title='description' value={boat?.description} icon={faFileLines} />
                    </div>
                </div>
                <div className="py-6 border-t border-gray-100 absolute bottom-0 w-[calc(100%_-_2rem)] flex flex-row justify-between">
                    <a href={`/reservation/${id}`} className="text-dark-orange p-3 bg-light-orange rounded-lg text-center">Consulter le planning</a>
                    <Link to={`/boat/${id}`} className="font-semibold p-3 text-center">Voir la page du bateau</Link>
                </div>
            </div>
            <div className="md:col-start-3 md:row-start-1 row-start-1 col-span-2 md:col-span-1 p-6 md:p-8 bg-white rounded border-2 border-gray-100 flex flex-row gap-4 md:gap-6 items-center" title="Nombre d'utilisateurs ayant ce bateau en favoris">
                <div className='bg-[#FFF5FB] w-20 h-20 flex justify-center items-center rounded-full'>
                    <svg width="25" height="23" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3333 1C13.6 1 11.5 4.11111 11.5 5.66667C11.5 4.11111 9.4 1 5.66667 1C1.93333 1 1 4.11111 1 5.66667C1 13.8333 11.5 19.6667 11.5 19.6667C11.5 19.6667 22 13.8333 22 5.66667C22 4.11111 21.0667 1 17.3333 1Z" stroke="#FFB6E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>{boat == null ? <Loader /> : (boat.usersFavorites.length)}</span>
                    <span className='text-lg text-gray-500'>Favoris</span>
                </div>
            </div>
            <div className="md:col-start-4 md:row-start-1 row-start-2 col-span-2 md:col-span-1 p-6 md:p-8 bg-white rounded border-2 border-gray-100 flex flex-row gap-4 md:gap-6 items-center">
                <div className='bg-[#FFF6EB] w-20 h-20 flex justify-center items-center rounded-full'>
                    <svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.33333 10.5H18.6667M9.33333 14H18.6667M9.33333 17.5H12.8333M24.5 14C24.5 19.799 19.799 24.5 14 24.5C11.9338 24.5 10.0069 23.9032 8.38246 22.8725L3.5 24.5L5.12749 19.6175C4.09682 17.9931 3.5 16.0662 3.5 14C3.5 8.20101 8.20101 3.5 14 3.5C19.799 3.5 24.5 8.20101 24.5 14Z" stroke="#FEAC50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className='flex flex-col'>
                    <span className='text-4xl font-semibold'>{boatComments == null ? <Loader /> : (boatComments.length)}</span>
                    <span className='text-lg text-gray-500'>Commentaires</span>
                </div>
            </div>
            <div className="col-span-2 md:col-start-3 md:row-start-2 row-start-3 bg-white rounded border-2 border-gray-100 p-4">
                <h5 className='font-semibold text-xl'>Notes</h5>
                <div className='flex flex-col gap-6 md:gap-0 md:flex-row items-center justify-between mx-4 mt-6'>
                    <NoteCard title="Propreté" icon={faWandMagicSparkles} percentage={ratings && getPercentage(ratings.proprete)} />
                    <NoteCard title="Confort" icon={faBath} percentage={ratings && getPercentage(ratings.confort)} />
                    <NoteCard title="Performance" icon={faRocket} percentage={ratings && getPercentage(ratings.performance)} />
                    <NoteCard title="Equipement" icon={faWrench} percentage={ratings && getPercentage(ratings.equipement)} />
                </div>
            </div>
            <div className="col-span-2 row-span-2 h-[300px] md:h-auto md:row-start-3 md:col-start-3 row-start-8 bg-white rounded border-2 border-gray-100 p-4">
                {
                    boat && (
                        <EstablishmentProvider>
                            <GoogleMapComponent />
                        </EstablishmentProvider>
                    )
                }
            </div>
        </div>
    )
}
