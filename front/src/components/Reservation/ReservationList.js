import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../contexts/reservationContext';
import ReservationItem from './ReservationItem';
import {UserContext} from "../../contexts/userContext";

export default function ReservationList() {
    const { getSlotsFromReservation, reservationSlotsList} = useContext(ReservationContext);
    const [loading, setLoading] = useState(true);
    const { user, getUser, getRoleLabel, highestRole } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSlotsFromReservation(user.id);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <span className='text-gray-500 text-sm mb-4'>
                {reservationSlotsList && reservationSlotsList.length > 0 ? reservationSlotsList.length : 0}
                {reservationSlotsList && reservationSlotsList.length > 1 ? " horaires trouvés" : " horaire trouvé"}
            </span> */}
            <div className="overflow-x-auto w-full">
                <div className='mt-4 h-[300px] flex flex-col gap-4'>
                    {reservationSlotsList && reservationSlotsList.map((reservation, index) => (
                        <ReservationItem key={index} reservation={reservation} />
                    ))}
                </div>
            </div>
        </>
    );
}
