import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BoatProvider, { BoatContext } from '../../contexts/boatContext';
import { Button } from 'flowbite-react';
import CommentItem from '../Comment/CommentItem';
import CommentForm from '../Comment/CommentForm';
import CommentsList from '../Comment/CommentList';
import AddNote from '../notes/Addnotes';
import BoatRatingsSummary from '../notes/Shownotes';

export default function BoatPublic() {
    const { id } = useParams();
    const { getBoat, boat } = useContext(BoatContext);

    useEffect(() => {
        getBoat(id)
    }, [id])

    return (
            <div className="grid grid-cols-12 gap-4 flex-1">
                <div className="col-span-12 md:col-span-8 relative flex flex-col">
                    <img alt='boat-image' src='https://coursnautique.com/wp-content/uploads/2022/02/Les-diff%C3%A9rentes-parties-dun-bateau-scaled.jpeg' className='bg-red-500 w-full object-cover h-[400px] rounded-md' />
                    <div className='mt-4 flex flex-row justify-between px-4'>
                        <div>
                            <h2 className='font-bold text-2xl'>{boat && boat.name + ' ' + boat.modele}</h2>
                            <p className='text-gray-600'>{boat && boat.address + ' ' + boat.city}</p>
                        </div>
                        {/** FAUSSE DATA **/}
                        <span className='font-bold text-2xl'>€500/heure</span>
                    </div>
                    <div className='flex gap-12 mt-8 px-4 flex-wrap'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='rounded-full w-16 h-16 bg-light-orange flex items-center justify-center'>
                                <svg width="34" height="34" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.304" cy="10.3037" r="4.43881" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.0715 21.4008C18.0715 17.7235 14.5937 14.7426 10.3036 14.7426C6.01346 14.7426 2.53564 17.7235 2.53564 21.4008" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.9619 14.7425C19.4134 14.7425 21.4007 12.7552 21.4007 10.3037C21.4007 7.85225 19.4134 5.86493 16.9619 5.86493C15.6362 5.86493 14.4462 6.44614 13.6328 7.36766" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M24.7298 21.4008C24.7298 17.7236 21.252 14.7426 16.9619 14.7426C16.0662 14.7426 14.6282 14.4172 13.6328 13.3726" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className='font-bold'>{boat && boat.capacity} pers</span>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='rounded-full w-16 h-16 bg-light-orange flex items-center justify-center'>
                                <svg width="34" height="34" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.304" cy="10.3037" r="4.43881" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.0715 21.4008C18.0715 17.7235 14.5937 14.7426 10.3036 14.7426C6.01346 14.7426 2.53564 17.7235 2.53564 21.4008" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.9619 14.7425C19.4134 14.7425 21.4007 12.7552 21.4007 10.3037C21.4007 7.85225 19.4134 5.86493 16.9619 5.86493C15.6362 5.86493 14.4462 6.44614 13.6328 7.36766" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M24.7298 21.4008C24.7298 17.7236 21.252 14.7426 16.9619 14.7426C16.0662 14.7426 14.6282 14.4172 13.6328 13.3726" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className='font-bold'>{boat && boat.capacity} pers</span>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='rounded-full w-16 h-16 bg-light-orange flex items-center justify-center'>
                                <svg width="34" height="34" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.304" cy="10.3037" r="4.43881" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.0715 21.4008C18.0715 17.7235 14.5937 14.7426 10.3036 14.7426C6.01346 14.7426 2.53564 17.7235 2.53564 21.4008" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.9619 14.7425C19.4134 14.7425 21.4007 12.7552 21.4007 10.3037C21.4007 7.85225 19.4134 5.86493 16.9619 5.86493C15.6362 5.86493 14.4462 6.44614 13.6328 7.36766" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M24.7298 21.4008C24.7298 17.7236 21.252 14.7426 16.9619 14.7426C16.0662 14.7426 14.6282 14.4172 13.6328 13.3726" stroke="#FE7768" strokeWidth="1.33164" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className='font-bold'>{boat && boat.capacity} pers</span>
                        </div>
                    </div>

                    <div className='mt-8 px-4'>
                        <h4 className='text-lg font-semibold'>Description</h4>
                        <p className='text-gray-600'>{boat && (boat.description ?? 'Ce bateau n\'a pas de description')}</p>
                    </div>

                    <div className='mt-8 px-4 flex sm:flex-row flex-col sm:justify-between sm:items-center items-start gap-10 sm:gap-0'>
                        <div className='flex flex-row gap-6'>
                            <Button className='bg-dark-orange'>Réserver</Button>
                            <Button className='text-gray-500' color='gray'>
                                <svg className='mr-4' width="23" height="23" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.4863 4.21619C14.2863 4.21619 12.4863 6.88285 12.4863 8.21619C12.4863 6.88285 10.6863 4.21619 7.48633 4.21619C4.28633 4.21619 3.48633 6.88285 3.48633 8.21619C3.48633 15.2162 12.4863 20.2162 12.4863 20.2162C12.4863 20.2162 21.4863 15.2162 21.4863 8.21619C21.4863 6.88285 20.6863 4.21619 17.4863 4.21619Z" stroke="#929595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Ajouter aux favoris
                            </Button>
                        </div>
                        <div className='flex sm:flex-row flex-row-reverse gap-4 items-center'>
                            <div className='flex flex-col sm:text-right text-left'>
                                {/** FAUSSE DATA **/}
                                <span className='font-semibold text-gray-500 text-sm'>PRESTATAIRE</span>
                                <span className='font-normal text-lg'>Martin Delacroix</span>
                            </div>
                            <img className='rounded-lg w-12 h-12' alt='user-picture' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 bg-gray-100 rounded-md border border-gray-200 p-4">
                    <header className='w-full flex flex-row justify-between items-center mb-6'>
                        <h4 className='text-2xl font-semibold'>Commentaires</h4>
                        {/** FAUSSE DATA **/}
                        <span className='font-semibold text-gray-400 text-sm'>3 Commentaires</span>
                    </header>
                    <div className='flex flex-col gap-4'>
                        <CommentsList boatId={id} />
                        <CommentForm boatId={id} /> 
                        <AddNote boatId={id}/>
                        <BoatRatingsSummary boatId={id}/>
                    </div>
                </div>
            </div>
    )
}
