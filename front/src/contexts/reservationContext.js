import React, { useState, createContext, useEffect } from 'react';
import ReservationModel from './models/reservationModel';
import { getUserRole, isProvider } from '../services/axiosRequestFunction';
import ReservationApi from "./models/reservationModel";
import { isSameDay } from 'date-fns';


export const ReservationContext = createContext(null);

const ReservationProvider = ({ children }) => {
    const [ReservationList, setReservationList] = useState([]);
    const [Reservation, setReservation] = useState({});
    const currentUser = getUserRole();
    const isProvider = currentUser.roles.find(role => role === 'ROLE_PROVIDER');


    const addReservation = async (idBoat, idSlot, idUser) => {
        if (isProvider) {
            const getBoat = `/api/boats/${idBoat}`;
            const getSlot = `/api/slots/${idSlot}`;
            const getUser = `/api/users/${idUser}`;
            const currentDate = new Date();
            console.log(getBoat)
            console.log(getSlot)
            console.log(getUser)
            const modifiedReservation = { boat: getBoat, slots: getSlot, consumer: getUser, reservationDate: new Date()};

            return ReservationModel.add(modifiedReservation).then(response => {
                setReservationList(prevBoats => [...prevBoats, response]);
            }).catch(error => {
                console.log(error);
            });
        }
    };
    

    const deleteReservation = async (id) => {
        try {
            await ReservationApi.delete(id);
            await getReservationList();
        } catch (error) {
            console.error("Error deleting slot", error);
        }
    };


    /*const getReservationFromBoat = async (idBoat) => {
        if (isProvider) {
            const getBoat = `/api/boats/${idBoat}`;
            const modifiedReservation = { ...Reservation, boat: getBoat};
            return ReservationModel.getOneByBoat(idBoat).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }
    };*/


    const getReservationList = async () => {
        return ReservationApi.getList().then(response => {
            setReservationList(response);
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <ReservationContext.Provider value={{ getReservationList, ReservationList, Reservation, setReservation, addReservation, deleteReservation }}>
            {children}
        </ReservationContext.Provider>
    );
}

export default ReservationProvider;