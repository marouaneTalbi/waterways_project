import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../contexts/reservationContext';
import ReservationItem from './ReservationItem';
import { BoatContext } from "../../contexts/boatContext";

export default function ReservationList() {
    const { reservationList, getReservationList, getSlotsFromReservation, reservationSlotsList} = useContext(ReservationContext);
    const { getBoatList } = useContext(BoatContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSlotsFromReservation(1);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <span className='text-gray-500 text-sm mb-4'>
                {reservationSlotsList && reservationSlotsList.length > 0 ? reservationSlotsList.length : 0}
                {reservationSlotsList && reservationSlotsList.length > 1 ? " horaires trouvés" : " horaire trouvé"}
            </span>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    {reservationSlotsList && reservationSlotsList.map((reservation, index) => (
                        <ReservationItem key={index} reservation={reservation} />
                    ))}
                </div>
            </div>
        </>
    );
}
