import React, { useContext } from 'react'
import { EstablishmentContext } from '../../contexts/establishmentContext';
import { TextInput, Button } from 'flowbite-react';
import { HiSearch, HiLocationMarker } from 'react-icons/hi';

export default function EstablishmentSearch({ initialValues = { search: '', location: '' } }) {

    const { searchEstablishment } = useContext(EstablishmentContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        searchEstablishment(data);    
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-row gap-2'>
            <div>
                <TextInput defaultValue={initialValues.location} name='location' size="lg"  id="location" type="text" icon={HiLocationMarker} placeholder="Localisation*" />
            </div>
            <div>
                <TextInput defaultValue={initialValues.search} name='search' size="sm" id="search" type="text" icon={HiSearch} placeholder="Nom de l'établissement" />
            </div>
            <div>
                <Button type='submit' color='blue' size="sm">
                    <HiSearch className="h-6 w-6" />
                </Button>
            </div>
        </form>
    )
}