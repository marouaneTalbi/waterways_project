import React, { useEffect, useContext } from 'react'
import { TextInput, Label, Button, Select } from 'flowbite-react';
import { BoatContext } from '../../contexts/boatContext';
import { EstablishmentContext } from '../../contexts/establishmentContext';


export default function BoatForm({ onCloseModal }) {
    const { boat, setBoat, addBoat } = useContext(BoatContext);
    const { establishmentList, getEstablishmentList, establishment, setEstablishment, getEtablismentName } = useContext(EstablishmentContext);

    useEffect(() => {
        getEstablishmentList();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        addBoat();
        onCloseModal();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
                id="name"
                value={boat && boat.name ? boat.name : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, name: event.target.value }))}
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="modele" value="Modele" />
            </div>
            <TextInput
                id="modele"
                value={boat && boat.modele ? boat.modele : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, modele: event.target.value }))}
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="size" value="Size" />
            </div>
            <TextInput
                id="size"
                value={boat && boat.size ? boat.size : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, size: Number(event.target.value) }))}
                type="integer"
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="capacity" value="Capacity" />
            </div>
            <TextInput
                id="capacity"
                value={boat && boat.capacity ? boat.capacity : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, capacity: Number(event.target.value) }))}
                type="integer"
                required
            />

            <div className="mb-2 block">
                <Label htmlFor="Establishment" value="establishment" />
            </div>
            <Select
                id="establishment"
                value={establishment || ''}
                onChange={(event) => {
                    setEstablishment(event.target.value);
                    setBoat((prevBoat) => ({ ...prevBoat, establishment: event.target.value }));
                }}
                required
            >
                <option value="" disabled>Choisir un établissement</option>
                {establishmentList.map((establishment) => (
                    <option key={establishment.id} value={establishment.id}>
                        {establishment.name}
                    </option>
                ))}
            </Select>

            <div className="w-full mt-4">
                <Button color='red' type='submit'>Ajouter</Button>
            </div>
        </form>
    )
}
