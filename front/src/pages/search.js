import { Button, Tabs } from 'flowbite-react';
import React, { useState } from 'react';
import BoatCardList from '../components/Boat/BoatCardList';
import BoatSearchForm from '../components/Boat/BoatSearchForm';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import BoatProvider from '../contexts/boatContext';
import EstablishmentProvider from '../contexts/establishmentContext';
import EstablishmentSearchForm from '../components/Establishment/EstablishmentSearchForm';
import EstablishmentCardList from '../components/Establishment/EstablishmentCardList';
import UserSearchForm from '../components/User/UserSearchForm';

export default function Search() {
    const [showMap, setShowMap] = useState(false);

    const handleButtonClick = () => {
        setShowMap(!showMap);
    };

    return (
        <>
            <EstablishmentProvider>
            <BoatProvider>
                <section className='w-full flex flex-row flex-1 relative'>
                    {showMap ? (
                        <div className='w-full h-full'>
                            <GoogleMap />
                        </div>
                    ) : (
                        <section className='md:w-3/6 w-full flex flex-col gap-4 pr-4 overflow-y-hidden'>
                            <Tabs.Group>
                                <Tabs.Item active title="Bateau" className='outline-none'>
                                    <BoatSearchForm />
                                    <BoatCardList />
                                </Tabs.Item>
                                <Tabs.Item title="Etablissement">
                                    <EstablishmentSearchForm />
                                    <EstablishmentCardList />
                                </Tabs.Item>
                                <Tabs.Item title="Prestataire">
                                    <UserSearchForm />
                                    <BoatCardList />
                                </Tabs.Item>
                            </Tabs.Group>
                        
                        </section>
                    )}
                    <div className='w-full h-full hidden md:block md:w-3/6'>
                        <GoogleMap />
                    </div>
                    <Button className='absolute bottom-0 left-0 right-0 mx-auto md:hidden' color='blue' onClick={handleButtonClick}>
                        Afficher la carte
                    </Button>
                </section>
            </BoatProvider>
            </EstablishmentProvider>
        </>
    )
}

