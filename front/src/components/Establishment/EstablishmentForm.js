import React, { useContext } from 'react'
import { TextInput, Label, Button } from 'flowbite-react';
import { EstablishmentContext } from '../../contexts/establishmentContext';

export default function EstablishmentForm({ onCloseModal }) {
    const {establishment, name, setName, address, setAddress, endDate, setEndDate, startDate, setStartDate, addEstablishment, editEstablishment} = useContext(EstablishmentContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(establishment) {
            editEstablishment({name, address, startDate, endDate}, establishment.id);
            onCloseModal();
        } else {
            addEstablishment({name, address, startDate, endDate});
            onCloseModal();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {
                 (
                    <>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <TextInput
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <div className="mb-2 block">
                            <Label htmlFor="start date" value="Start date" />
                        </div>
                        <TextInput
                            id="start date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type="time"
                            required
                        />
                        <div className="mb-2 block">
                            <Label htmlFor="end date" value="End date" />
                        </div>
                        <TextInput
                            id="end date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type="time"
                            required
                        />
                        { 
                            establishment ? 
                                <div className="w-full mt-4">
                                    <Button color='red' onClick={handleSubmit}>Modifier</Button>
                                </div> :
                                <div className="w-full mt-4">
                                    <Button color='red' onClick={handleSubmit}>Ajouter</Button>
                                </div>
                        }
                        
                    </>
                )
            }
        </form>
    )
}
