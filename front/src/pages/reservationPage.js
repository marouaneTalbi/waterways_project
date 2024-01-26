import React from 'react';
import ReservationSlotList from '../components/Reservation/ReservationSlotList';
import SlotsProvider from "../contexts/slotsContext";

const ReservationPage = () => {
    return (
        <div>
            <h1>Reservation Page</h1>
            <SlotsProvider>
                <ReservationSlotList />
            </SlotsProvider>
        </div>
    );
};

export default ReservationPage;
