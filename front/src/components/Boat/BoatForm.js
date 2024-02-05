import React, {useEffect, useContext, useState, useMemo} from 'react'
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
    const { addSlots, setSlots, slots, addMultipleSlots} = useContext(SlotsContext);
    const [startTime, setStartTime] = useState(slots && slots.startTime ? slots.startTime : '');
    const [endTime, setEndTime] = useState(slots && slots.endTime ? slots.endTime : '');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        getEstablishmentList();
    }, [])


    const isDateValid = useMemo(() => {
        const isStartDateValid = !slots.startBookingDate || new Date(slots.startBookingDate) > new Date();
        const isEndDateValid = !slots.startBookingDate || !slots.endBookingDate || new Date(slots.startBookingDate) <= new Date(slots.endBookingDate);
        const isTimeValid = !startTime || !endTime || startTime < endTime;
        return isStartDateValid && isEndDateValid && isTimeValid;
    }, [slots.startBookingDate, slots.endBookingDate, startTime, endTime]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isDateValid) {
            setFormErrors({
                dateError: "Veuillez vérifier les dates et heures.",
            });
            return;
        }
        try {
            const idBoat = await addBoat();
            const formattedStartTime = startTime ? startTime : "00:00";
            const formattedEndTime = endTime ? endTime : "00:00";

            await addMultipleSlots(idBoat, formattedStartTime, formattedEndTime, slots.startBookingDate, slots.endBookingDate);
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

            <div className="mb-2 block">
                <Label htmlFor="startBookingDate" value="Date de début" />
            </div>
            <DatePicker
                locale={fr}
                selected={slots && slots.startBookingDate ? slots.startBookingDate : ''}
                onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, startBookingDate: date }))}
                dateFormat="dd/MM/yyyy"
            />

            <div className="mb-2 block">
                <Label htmlFor="endBookingDate" value="Date de fin" />
            </div>
            <DatePicker
                locale={fr}
                selected={slots && slots.endBookingDate ? slots.endBookingDate : ''}
                onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, endBookingDate: date }))}
                dateFormat="dd/MM/yyyy"
            />

            <div className="mb-2 block">
                <Label htmlFor="startTime" value="Horaire de début" />
            </div>
            <input
                id="startTime"
                type="text"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                pattern="[0-9]{2}:[0-9]{2}"
                placeholder="HH:mm"
                required
            />

            <div className="mb-2 block">
                <Label htmlFor="endTime" value="Horaire de fin" />
            </div>
            <input
                id="endTime"
                type="text"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                pattern="[0-9]{2}:[0-9]{2}"
                placeholder="HH:mm"
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
