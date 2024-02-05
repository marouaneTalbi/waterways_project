import React from 'react';
import ReservationSlotList from '../components/Reservation/ReservationSlotList';
import SlotsProvider from "../contexts/slotsContext";
import SlotsItem from "../components/Slots/SlotsItem";

const ReservationPage = () => {
    return (
        <div>
            <h1>Reservation Page</h1>
            <SlotsProvider>
                <ReservationSlotList />
                <SlotsItem></SlotsItem>
            </SlotsProvider>
        </div>
    );
};

export default ReservationPage;
