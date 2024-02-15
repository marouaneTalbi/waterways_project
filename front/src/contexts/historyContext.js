import React, { useState, createContext } from 'react';
import ReservationModel from './models/reservationModel';
import { getUserRole } from '../services/axiosRequestFunction';
import ReservationApi from "./models/reservationModel";

export const HistoryContext = createContext(null);

const HistoryProvider = ({ children }) => {
    const [reservationList, setReservationList] = useState([]);
    const [reservation, setReservation] = useState({});
    const [boatList, setBoat] = useState([]);
    const [reservationSlotsList, setReservationSlotsList] = useState([]);
    const [historySlotsList, setHistorySlotsList] = useState([]);
    const currentUser = getUserRole();
    const isProvider = currentUser.roles.find(role => role === 'ROLE_PROVIDER');



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

    const getSlotsFromHistory = async (id) => {
        return ReservationApi.getHistory(id).then(response => {
            setHistorySlotsList(response);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <HistoryContext.Provider value={{ reservationList, reservation, setReservation, boatList, reservationSlotsList, historySlotsList, getSlotsFromHistory, setReservationSlotsList }}>
            {children}
        </HistoryContext.Provider>
    );
}

export default HistoryProvider;
