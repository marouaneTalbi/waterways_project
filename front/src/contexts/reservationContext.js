import React, { useState, createContext } from 'react';
import ReservationModel from './models/reservationModel';
import { getUserRole } from '../services/axiosRequestFunction';
import ReservationApi from "./models/reservationModel";

export const ReservationContext = createContext(null);

const ReservationProvider = ({ children }) => {
    const [reservationList, setReservationList] = useState([]);
    const [reservation, setReservation] = useState({});
    const [boatList, setBoat] = useState([]);
    const [reservationSlotsList, setReservationSlotsList] = useState([]);
    const currentUser = getUserRole();
    const isProvider = currentUser.roles.find(role => role === 'ROLE_PROVIDER');


    const addReservation = async (idBoat, idSlot, idUser) => {
        if (isProvider) {
            const getBoat = `/api/boat/${idBoat}`;
            const getSlot = `/api/slots/${idSlot}`;
            const getUser = `/api/users/${idUser}`;
            //const currentDate = new Date();
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
        }).catch(error => {
            console.log(error)
        })
    }

    const getBoatFromReservation = async (id) => {
        try {
            const response = await ReservationApi.getBoat(id);
            setBoat(prevBoatList => [...prevBoatList, response]);
        } catch (error) {
            console.error("Error fetching boat:", error);
        }
    }

    const getSlotsFromReservation = async (id) => {

        return ReservationApi.getSlots(id).then(response => {
            setReservationSlotsList(response);
            console.log(reservationSlotsList);
        }).catch(error => {
            console.log(error)
        })
    }

    const getHistoryReservation = async (id) => {
        try {
            const response = await ReservationApi.getHistory(id);
            setReservationSlotsList(prevSlotsList => [...prevSlotsList, response]);
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    }

    return (
        <ReservationContext.Provider value={{ getReservationList, reservationList, reservation, setReservation, addReservation, deleteReservation, getBoatFromReservation, getSlotsFromReservation, boatList, reservationSlotsList, getHistoryReservation, setReservationSlotsList }}>
            {children}
        </ReservationContext.Provider>
    );
}

export default ReservationProvider;
