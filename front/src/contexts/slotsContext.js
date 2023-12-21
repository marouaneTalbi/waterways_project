import React, { useState, createContext, useEffect } from 'react';
import slotsModel from './models/slotsModel';
import { getUserRole, isProvider } from '../services/axiosRequestFunction';
import slotsApi from "./models/slotsModel";
import boatModel from "./models/boatModel";


export const SlotsContext = createContext(null);

const SlotsProvider = ({ children }) => {
    const [slotsList, setSlotsList] = useState([]);
    const [slots, setSlots] = useState({});
    const currentUser = getUserRole();
    const isProvider = currentUser.roles.find(role => role === 'ROLE_PROVIDER');

    /*const addSlots = async ({idBoat, startBookingDate, endBookingDate}) => {
        if (isProvider) {
            return slotsApi.add({idBoat, startBookingDate, endBookingDate}).then(response => {
                console.log(response)
            })
        } else {
            throw new Error('You are not a provider');
        }
    }*/

    const addSlots = async (idBoat) => {
        if (isProvider) {
            // A REFACTO

            // A REFACTO
            const getBoat = `/api/boats/${idBoat}`;
            const modifiedSlots = { ...slots, boat: getBoat};
            return slotsModel.add(modifiedSlots).then(response => {
                setSlotsList(prevBoats => [...prevBoats, response]);
            }).catch(error => {
                console.log(error);
            });
        }
    };


    const getSlotsList = async () => {
        return slotsApi.getList().then(response => {
            setSlotsList(response);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <SlotsContext.Provider value={{ getSlotsList, slotsList, slots, setSlots, addSlots }}>
            {children}
        </SlotsContext.Provider>
    );
}

export default SlotsProvider;
