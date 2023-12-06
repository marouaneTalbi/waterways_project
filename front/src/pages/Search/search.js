import React, { useState } from 'react'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import { Button } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import { HiSearch, HiLocationMarker, HiUser } from 'react-icons/hi';

export default function Search() {
  const [showMap, setShowMap] = useState(false);

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  const addressesArray = [
    // '1 rue de la paix, 75000 Paris',
    // '11 rue du Lunain, 77380 Combs la Ville',
  ]

  return (
    <>
      <section className='w-full flex flex-row flex-1 relative'>
        {showMap ? (
          <div className='w-full h-full'>
            <GoogleMap addresses={addressesArray} />
          </div>
        ) : (
          <div className='md:w-3/6 w-full flex flex-row gap-2 p-2'>
            <div className="flex flex-row gap-2 w-full h-max">
              <div className="max-w-xl">
                <TextInput size="lg" id="search" type="text" icon={HiSearch} placeholder="Recherche par prestataire ou prestation..." required />
              </div>
              <div className="max-w-sm">
                <TextInput size="lg"  id="location" type="text" icon={HiLocationMarker} placeholder="Localisation" />
              </div>
              <div className="max-w-sm">
                <TextInput size="lg"  id="people" type="number" icon={HiUser} placeholder="Nombre de personne" />
              </div>
            </div>
          </div>
        )}
        <div className='w-full h-full hidden md:block md:w-3/6'>
          <GoogleMap addresses={addressesArray} />
        </div>
        <Button className='absolute bottom-0 left-0 right-0 mx-auto md:hidden' color='red' onClick={handleButtonClick}>
          Afficher la carte
        </Button>
      </section>
    </>
  )
}

