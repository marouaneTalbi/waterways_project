import React, { useContext } from 'react'
import { TextInput } from 'flowbite-react';
import { HiSearch, HiLocationMarker, HiUser } from 'react-icons/hi';
import { BoatContext } from '../../contexts/boatContext';
import { Button, Spinner } from 'flowbite-react';
// import { HiSearch } from 'react-icons/hi';

export default function BoatSearchForm({ initialValues = { search: '', location: '', people: '' } }) {
    const { searchBoat } = useContext(BoatContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        searchBoat(data);    
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-row gap-2'>
            <div>
                <TextInput defaultValue={initialValues.location} name='location' size="lg"  id="location" type="text" icon={HiLocationMarker} placeholder="Localisation*" required />
            </div>
            <div>
                <TextInput defaultValue={initialValues.people} name='people' size="lg"  id="people" type="number" icon={HiUser} placeholder="Nombre de personne" />
            </div>
            <div>
                <TextInput defaultValue={initialValues.search} name='search' size="sm" id="search" type="text" icon={HiSearch} placeholder="Recherche par prestataire ou prestation..." />
            </div>
            <div>
                <Button type='submit' color='blue' size="sm">
                    <HiSearch className="h-6 w-6" />
                </Button>
            </div>
        </form>
    )
}
