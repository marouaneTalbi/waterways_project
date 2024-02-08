import React from 'react';
import ReservationProvider from "../contexts/reservationContext";
import ReservationSlotList from '../components/Reservation/ReservationSlotList';
import SlotsProvider from "../contexts/slotsContext";
import SlotsItem from "../components/Slots/SlotsItem";

const ReservationPage = () => {
    return (
        <div>
            <h1>Reservation Page</h1>
            <SlotsProvider>
                <ReservationProvider>
                    <ReservationSlotList />
                    <SlotsItem></SlotsItem>
                </ReservationProvider>
            </SlotsProvider>
        </div>
    );
};

export default ReservationPage;
