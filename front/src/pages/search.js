import React, { useState } from 'react'
import { Button } from 'flowbite-react';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import BoatSearchForm from '../components/Boat/BoatSearchForm';
import BoatProvider from '../contexts/boatContext';
import BoatCardList from '../components/Boat/BoatCardList';

export default function Search() {
    const [showMap, setShowMap] = useState(false);

    const handleButtonClick = () => {
        setShowMap(!showMap);
    };

    return (
        <>
            <BoatProvider>
                <section className='w-full flex flex-row flex-1 relative'>
                    {showMap ? (
                        <div className='w-full h-full'>
                            <GoogleMap />
                        </div>
                    ) : (
                        <section className='md:w-3/6 w-full flex flex-col gap-4 pr-4 overflow-y-hidden'>
                            <BoatSearchForm />
                            <div className='flex flex-col gap-6 overflow-y-scroll'>
                                <BoatCardList />
                            </div>
                        </section>
                    )}
                    <div className='w-full h-full hidden md:block md:w-3/6'>
                        <GoogleMap />
                    </div>
                    <Button className='absolute bottom-0 left-0 right-0 mx-auto md:hidden' color='red' onClick={handleButtonClick}>
                        Afficher la carte
                    </Button>
                </section>
            </BoatProvider>
        </>
    )
}

