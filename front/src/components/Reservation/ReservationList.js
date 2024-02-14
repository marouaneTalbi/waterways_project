import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../contexts/reservationContext';
import ReservationItem from './ReservationItem';

export default function ReservationList() {
    const { reservationList, getReservationList } = useContext(ReservationContext);
    const [uniqueReservationIds, setUniqueReservationIds] = useState(new Set());

    useEffect(() => {
        getReservationList();
    }, []);

    useEffect(() => {
        const uniqueIds = new Set(reservationList.map(reservation => reservation.id));
        setUniqueReservationIds(uniqueIds);
    }, [reservationList]);

    return (
        <>
            <span className='text-gray-500 text-sm mb-4'>
                {uniqueReservationIds.size} {uniqueReservationIds.size > 1 ? 'réservations trouvées' : 'réservation trouvée'}
            </span>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    {Array.from(uniqueReservationIds).map(reservationId => {
                        const reservation = reservationList.find(reservation => reservation.id === reservationId);
                        return <ReservationItem key={reservationId} reservation={reservation} />;
                    })}
                </div>
            </div>
        </>
    );
}
