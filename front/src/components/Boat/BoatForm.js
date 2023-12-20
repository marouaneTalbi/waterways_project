import React, { useEffect, useContext } from 'react'
import { TextInput, Label, Button, Select } from 'flowbite-react';
import { BoatContext } from '../../contexts/boatContext';
import { EstablishmentContext } from '../../contexts/establishmentContext';
import { SlotsContext } from '../../contexts/slotsContext';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';


export default function BoatForm({ onCloseModal }) {
    const { boat, setBoat, addBoat, getLastBoat} = useContext(BoatContext);
    const { establishmentList, getEstablishmentList, establishment, setEstablishment, getEtablismentName } = useContext(EstablishmentContext);
    const { addSlots, setSlots, slots} = useContext(SlotsContext);

    useEffect(() => {
        getEstablishmentList();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Ajout du bateau et récupération de l'ID
            const idBoat = await addBoat();
            await addSlots(idBoat);
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2 block">
                <Label htmlFor="name" value="Nom" />
            </div>
            <TextInput
                id="name"
                value={boat && boat.name ? boat.name : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, name: event.target.value }))}
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="modele" value="Modèle" />
            </div>
            <TextInput
                id="modele"
                value={boat && boat.modele ? boat.modele : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, modele: event.target.value }))}
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="size" value="Taille" />
            </div>
            <TextInput
                id="size"
                value={boat && boat.size ? boat.size : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, size: Number(event.target.value) }))}
                type="integer"
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="capacity" value="Capacité" />
            </div>
            <TextInput
                id="capacity"
                value={boat && boat.capacity ? boat.capacity : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, capacity: Number(event.target.value) }))}
                type="integer"
                required
            />

            <div className="mt-5 block">
                <Label htmlFor="timeNumber" value="Temps minimum de réservation" />
            </div>

            <TextInput
                id="minTime"
                value={boat && boat.minTime ? boat.minTime : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, minTime: Number(event.target.value) }))}
                type="integer"
                required
            />

            <DatePicker
                showTimeSelect
                minTime={new Date(0, 0, 0, 5, 0)}
                maxTime={new Date(0, 0, 0, 23, 0)}
                timeFormat="HH:mm"
                dateFormat="dd/MM/yyyy HH:mm"
                locale={fr}
                selectsStart
                selected={slots && slots.startBookingDate ? slots.startBookingDate : ''}
                onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, startBookingDate: date}))}
                startDate={slots && slots.startBookingDate ? slots.startBookingDate : ''}
            />

            <div className="mb-2 block">
                <Label htmlFor="dateAvailable" value="date de fin" />
            </div>
            <DatePicker
                showTimeSelect
                minTime={new Date(0, 0, 0, 5, 0)}
                maxTime={new Date(0, 0, 0, 23, 0)}
                timeFormat="HH:mm"
                dateFormat="dd/MM/yyyy HH:mm"
                selectsEnd
                selected={slots && slots.endBookingDate ? slots.endBookingDate : ''}
                onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, endBookingDate: date}))}
                endDate={slots && slots.endBookingDate ? slots.endBookingDate : ''}
                startDate={slots && slots.endBookingDate ? slots.endBookingDate : ''}
                minDate={slots && slots.endBookingDate ? slots.endBookingDate : ''}
            />

            <h3 className="flex items-center justify-center mt-10">Date de disponibilité</h3>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="dateAvailable" value="date de début" />
                </div>

            </div>

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

                <h3 className="flex items-center justify-center mt-10">Date de disponibilité</h3>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="dateAvailable" value="date de début" />
                    </div>

                </div>

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
