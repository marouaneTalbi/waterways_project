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
import { TranslationContext } from '../../contexts/translationContext';


export default function BoatForm({ onCloseModal }) {
    const { boat, setBoat, addBoat, editBoat, showSlots} = useContext(BoatContext);
    const { establishmentList, getEstablishmentList, setEstablishment } = useContext(EstablishmentContext);
    const { setSlots, slots, addMultipleSlots} = useContext(SlotsContext);
    const [startTime, setStartTime] = useState(slots && slots.startTime ? slots.startTime : '');
    const [endTime, setEndTime] = useState(slots && slots.endTime ? slots.endTime : '');
    const { user } = useContext(UserContext);
    const [slotDuration, setSlotDuration] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { translations  } = useContext(TranslationContext);
  
    useEffect(() => {
        getEstablishmentList();
    }, [user]);

    const isDateValid = useMemo(() => {
        const isStartDateValid = !slots.startBookingDate || new Date(slots.startBookingDate) > new Date();
        const isEndDateValid = !slots.startBookingDate || !slots.endBookingDate || new Date(slots.startBookingDate) <= new Date(slots.endBookingDate);
        const isTimeValid = !startTime || !endTime || startTime < endTime;
        return isStartDateValid && isEndDateValid && isTimeValid;
    }, [slots.startBookingDate, slots.endBookingDate, startTime, endTime]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];
        
        if (file && validTypes.includes(file.type)) {
            setBoat((prevBoat) => ({ ...prevBoat, image: file }));
        } else {
            toast.error(translations.only_alow_files, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        if (file?.size > 1048576) { 
            toast.error(translations.file_havy, {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', boat.name);
        formData.append('modele', boat.modele);
        formData.append('size', boat.size);
        formData.append('capacity', boat.capacity);
        formData.append('minTime', boat.minTime);
        formData.append('city', boat.city);
        formData.append('address', boat.address);
        formData.append('image', boat.image);
        formData.append('description', boat.description);
        formData.append('price', boat.price);
        
        if (!isDateValid) {
            toast.error(translations.check_date_hour, {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        } 
        try {
            if(formData) {
                if(boat.id) {
                    formData.append('establishment', boat.establishment.id);
                    editBoat(formData, boat.id).then((res) => {
                        onCloseModal();
                    }).catch((error) => {
                        toast.error(translations.update_error_message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                
                } else {
                    formData.append('establishment', boat.establishment);
                    const idBoat = await addBoat(formData);

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
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <div className="mb-2 block">
                <Label htmlFor="name" value={translations.name} />
            </div>
            <TextInput
                id="name"
                value={boat && boat.name ? boat.name : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, name: event.target.value }))}
                required
            />

            <div className="mb-2 block">
                <Label htmlFor="address" value={translations.address} />
            </div>
            <TextInput
                id="address"
                value={boat && boat.address ? boat.address : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, address: event.target.value }))}
                required
            />

            <div className="mb-2 block">
                <Label htmlFor="city" value={translations.city} />
            </div>
            <TextInput
                id="city"
                value={boat && boat.city ? boat.city : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, city: event.target.value }))}
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="modele" value={translations.model}  />
            </div>
            <TextInput
                id="modele"
                value={boat && boat.modele ? boat.modele : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, modele: event.target.value }))}
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="size" value={translations.size} />
            </div>
            <TextInput
                id="size"
                value={boat && boat.size ? boat.size : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, size: Number(event.target.value) }))}
                type="integer"
                required
            />
            
            <div className="mb-2 block">
                <Label htmlFor="capacity" value={translations.capacity}  />
            </div>
            <TextInput
                id="capacity"
                value={boat && boat.capacity ? boat.capacity : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, capacity: Number(event.target.value) }))}
                type="integer"
                required
            />

            <div className="mt-5 block">
                <Label htmlFor="timeNumber" value={translations.min_time_book}  />
            </div>

            <TextInput
                id="minTime"
                value={boat && boat.minTime ? boat.minTime : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, minTime: Number(event.target.value) }))}
                type="integer"
                required
            />

            <div className="mb-2 block">
            <Label htmlFor="description" value={translations.description} />
            </div>
            <TextInput
                id="description"
                value={boat && boat.description ? boat.description : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, description: event.target.value }))}
                type="integer"
                required
            />

            <div className="mb-2 block">
            <Label htmlFor="price" value={translations.price} />
            </div>
            <TextInput
                id="price"
                value={boat && boat.price ? boat.price : ''}
                onChange={(event) => setBoat((prevBoat) => ({ ...prevBoat, price: event.target.value }))}
                type="integer"
                required
            />

            <div className="mb-2 block">
                <Label htmlFor="Image" value="image" />
            </div>
            <input 
                type="file" 
                onChange={(event) => handleImageChange(event)}
            />


            {
               (boat && !boat?.id )|| showSlots ? 
               
               <>
               <div className="mb-2 block">
                   <Label htmlFor="startBookingDate" value={translations.start_date} />
               </div>
               <DatePicker
                   locale={fr}
                   selected={slots && slots.startBookingDate ? slots.startBookingDate : ''}
                   onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, startBookingDate: date }))}
                   dateFormat="dd/MM/yyyy"
               />

               <div className="mb-2 block">
                   <Label htmlFor="endBookingDate" value={translations.end_date} />
               </div>
               <DatePicker
                   locale={fr}
                   selected={slots && slots.endBookingDate ? slots.endBookingDate : ''}
                   onChange={(date) => setSlots((prevSlots) => ({ ...prevSlots, endBookingDate: date }))}
                   dateFormat="dd/MM/yyyy"
               />

               <div className="mb-2 block">
                   <Label htmlFor="startTime" value={translations.end_hour}  />
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
                   <Label htmlFor="endTime" value={translations.end_hour}  />
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
                 (boat && boat?.id )? (
                    <></>
                ) : (
                    <>
                        <div className="mb-2 block">
                            <Label htmlFor="Establishment" value={translations.establishment}/>
                        </div>
                        <Select
                            id="establishment"
                            value={boat?.establishment || ''}
                            onChange={(event) => {
                                setEstablishment(event.target.value);
                                setBoat((prevBoat) => ({ ...prevBoat, establishment: event.target.value }));
                            }}
                            required
                        >
                            <h3 className="flex items-center justify-center mt-10">{translations.avaliable_date}</h3>
            
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="dateAvailable" value={translations.start_date}  />
                                </div>
            
                            </div>
            
                            <option value="" disabled>{translations.chose_establishment}</option>
                            {establishmentList.map((establishment) => (
                                <option key={establishment.id} value={establishment.id}>
                                    {establishment.name}
                                </option>
                            ))}
                        </Select>
                    </>
                )
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
