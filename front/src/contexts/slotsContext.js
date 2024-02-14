import React, { useState, createContext, useEffect } from 'react';
import slotsModel from './models/slotsModel';
import { getUserRole, isProvider } from '../services/axiosRequestFunction';
import slotsApi from "./models/slotsModel";
import { isSameDay } from 'date-fns';


export const SlotsContext = createContext(null);

const SlotsProvider = ({ children }) => {
    const [slotsList, setSlotsList] = useState([]);
    const [slots, setSlots] = useState({});
    const currentUser = getUserRole();
    const isProvider = currentUser.roles.find(role => role === 'ROLE_PROVIDER');


    const addSlots = async (idBoat, startTime, endTime) => {
        if (isProvider) {
            const getBoat = `/api/boat/${idBoat}`;
            const modifiedSlots = { ...slots, boat: getBoat, startTime, endTime };

            return slotsModel.add(modifiedSlots).then(response => {
                setSlotsList(prevBoats => [...prevBoats, response]);
            }).catch(error => {
                console.log(error);
            });
        }
    };


    const addMultipleSlots = async (boatId, startTime, endTime, startBookingDate, endBookingDate, duration) => {
        let startDate = new Date(startBookingDate);
        const endDate = new Date(endBookingDate);

        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);

        if (!isSameDay(new Date(startBookingDate), new Date(endBookingDate))) {
            while (startDate <= endDate) {
                const currentDate = startDate.toISOString().split('T')[0];
                const startDateTime = currentDate + ' ' + startTime;
                const endDateTime = currentDate + ' ' + endTime;
                slots.startBookingDate = startDate;
                slots.endBookingDate = startDate;
                const slotsToAdd = [];

                if (duration && duration >= 10) {
                    let currentSlotStart = new Date(currentDate + ' ' + startTime);
                    const slotEndTime = new Date(currentDate + ' ' + endTime);

                    while (currentSlotStart < slotEndTime) {
                        const currentSlotEnd = new Date(currentSlotStart.getTime() + duration * 60000);
                        slotsToAdd.push({ start: currentSlotStart, end: currentSlotEnd });
                        currentSlotStart = currentSlotEnd;
                    }
                }else{
                    await addSlots(boatId, startDateTime, endDateTime);
                }

                if(slotsToAdd.length > 0) {
                    for (const slot of slotsToAdd) {
                        await addSlots(boatId, slot.start, slot.end);
                    }
                }
                startDate.setDate(startDate.getDate() + 1);
            }
        } else {
            let currentDate = startDate.toISOString().split('T')[0];
            const startDateTime = currentDate + ' ' + startTime;
            const endDateTime = currentDate + ' ' + endTime;
            slots.startBookingDate = startDate;
            slots.endBookingDate = endDate;
            await addSlots(boatId, startDateTime, endDateTime);
        }
    };

    const deleteSlot = async (id) => {
        try {
            await slotsApi.delete(id);
            await getSlotsList();
        } catch (error) {
            console.error("Error deleting slot", error);
        }
    };


    /*const getSlotsFromBoat = async (idBoat) => {
        if (isProvider) {
            const getBoat = `/api/boats/${idBoat}`;
            const modifiedSlots = { ...slots, boat: getBoat};
            return slotsModel.getOneByBoat(idBoat).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }
    };*/


    const getSlotsList = async () => {
        return slotsApi.getList().then(response => {
            setSlotsList(response);
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <SlotsContext.Provider value={{ getSlotsList, slotsList, slots, setSlots, addSlots, addMultipleSlots, deleteSlot }}>
            {children}
        </SlotsContext.Provider>
    );
}

export default SlotsProvider;
