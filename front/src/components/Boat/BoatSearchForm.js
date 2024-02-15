import React, { useContext, useState } from 'react'
import { TextInput } from 'flowbite-react';
import { HiSearch, HiLocationMarker, HiUser } from 'react-icons/hi';
import { BoatContext } from '../../contexts/boatContext';
import { Button } from 'flowbite-react';
import { TranslationContext } from '../../contexts/translationContext';
// import { HiSearch } from 'react-icons/hi';

export default function BoatSearchForm({ initialValues = { search: '', location: '', people: '' } }) {
    const { searchBoat } = useContext(BoatContext);
    const { translations  } = useContext(TranslationContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        try {
            await searchBoat(data);    
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-row gap-2'>
            <div>
                <TextInput defaultValue={initialValues.location} name='location' size="lg"  id="location" type="text" icon={HiLocationMarker} placeholder={translations.localisation} required />
            </div>
            <div>
                <TextInput defaultValue={initialValues.people} name='people' size="lg"  id="people" type="number" icon={HiUser} placeholder={translations.nbpersonne} />
            </div>
            <div>
                <TextInput defaultValue={initialValues.search} name='search' size="sm" id="search" type="text" icon={HiSearch} placeholder={translations.boatname}/>
            </div>
            <div>
                <Button type='submit' color='blue' size="sm" disabled={isLoading}>
                    {isLoading ? 'Chargement...' : <HiSearch className="h-6 w-6" />}
                </Button>
            </div>
        </form>
    )
}
