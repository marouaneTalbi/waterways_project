import React, {useEffect, useContext, useState, useMemo} from 'react'
import { TextInput, Label, Button, Select } from 'flowbite-react';
import { BoatContext } from '../../contexts/boatContext';
import { EstablishmentContext } from '../../contexts/establishmentContext';
import { SlotsContext } from '../../contexts/slotsContext';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../contexts/userContext';
import { useParams } from 'react-router-dom';


export default function BoatForm({ onCloseModal }) {
    const { boat, setBoat, addBoat, editBoat, showSlots} = useContext(BoatContext);
    const { establishmentList, getEstablishmentList, setEstablishment } = useContext(EstablishmentContext);
    const { setSlots, slots, addMultipleSlots} = useContext(SlotsContext);
    const [startTime, setStartTime] = useState(slots && slots.startTime ? slots.startTime : '');
    const [endTime, setEndTime] = useState(slots && slots.endTime ? slots.endTime : '');
    const { user } = useContext(UserContext);
    const [slotDuration, setSlotDuration] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { id: idBoat } = useParams();

    useEffect(() => {
        getEstablishmentList();
    }, [user]);

    const isDateValid = useMemo(() => {
        const isStartDateValid = !slots.startBookingDate || new Date(slots.startBookingDate) > new Date();
        const isEndDateValid = !slots.startBookingDate || !slots.endBookingDate || new Date(slots.startBookingDate) <= new Date(slots.endBookingDate);
        const isTimeValid = !startTime || !endTime || startTime < endTime;
        return isStartDateValid && isEndDateValid && isTimeValid;
    }, [slots.startBookingDate, slots.endBookingDate, startTime, endTime]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        if (!isDateValid) {
            toast.error('Please check date and hour', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        } 
        try {
                    const formattedStartTime = startTime ? startTime : "00:00";
                    const formattedEndTime = endTime ? endTime : "00:00";

                    const durationInMinutes = parseInt(slotDuration, 10);

                    let currentSlotStart = new Date(slots.startBookingDate);
                    const endDateTime = new Date(slots.endBookingDate);

                    const slotsToAdd = [];
                    while (currentSlotStart < endDateTime) {
                        const currentSlotEnd = new Date(currentSlotStart.getTime() + durationInMinutes * 60000);
                        slotsToAdd.push({ start: new Date(currentSlotStart), end: new Date(currentSlotEnd) });
                        currentSlotStart = new Date(currentSlotEnd);
                    }

                    setSlotDuration('');
                    await addMultipleSlots(idBoat, formattedStartTime, formattedEndTime, slots.startBookingDate, slots.endBookingDate, slotDuration);
                    onCloseModal();
            
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            {
               (boat && !boat?.id )|| showSlots ? 
               
               <>
               <div className="flex flex-wrap -mx-2">
    <div className="w-1/2 px-2 mb-4">
        <div className="mb-2 block">
            <Label htmlFor="startBookingDate" value="Start Date"/>
        </div>
        <DatePicker
            locale={fr}
            selected={slots && slots.startBookingDate ? slots.startBookingDate : ''}
            onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, startBookingDate: date }))}
            dateFormat="dd/MM/yyyy"
        />
    </div>

    <div className="w-1/2 px-2 mb-4">
        <div className="mb-2 block">
            <Label htmlFor="endBookingDate" value="End Date"/>
        </div>
        <DatePicker
            locale={fr}
            selected={slots && slots.endBookingDate ? slots.endBookingDate : ''}
            onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, endBookingDate: date }))}
            dateFormat="dd/MM/yyyy"
        />
    </div>

    <div className="w-1/2 px-2 mb-4">
        <div className="mb-2 block">
            <Label htmlFor="startTime" value="START HOUR"/>
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
    </div>

    <div className="w-1/2 px-2 mb-4">
        <div className="mb-2 block">
            <Label htmlFor="endTime" value="END HOUR" />
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
    </div>
</div>

               <div className="mb-2 block">
                   <Label htmlFor="endTime" value="Découpage" />
               </div>
               <TextInput
                   id="slotDuration"
                   value={slotDuration}
                   onChange={(event) => setSlotDuration(event.target.value)}
                   type="integer"
                   required
               />
           </>
            
            : (  <></>  )
            }
            {
            }

<div className="w-full mt-4">
    {boat && boat.id ? (
        <Button color='red' type='submit' disabled={isLoading}>
            {isLoading ? "Chargement..." : "Modifier"}
        </Button>
    ) : (
        <Button color='red' type='submit' disabled={isLoading}>
            {isLoading ? "Chargement..." : "Ajouter"}
        </Button>
    )}
</div>

        </form>
    )
}
