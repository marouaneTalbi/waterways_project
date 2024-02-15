import React, { useContext, useEffect } from 'react';
import { ReservationContext } from '../../contexts/reservationContext';
import ReservationItem from './ReservationItem';

export default function ReservationList() {
    const { reservationList, getReservationList } = useContext(ReservationContext);

    useEffect(() => {
        getReservationList();
    }, []);


    return (
        <>
            <span className='text-gray-500 text-sm mb-4 w-full'>
                {
                    reservationList && (
                        reservationList.length ? `${reservationList.length} réservations trouvées` : `${reservationList.length} réservation trouvée`
                    )
                }
                {/* {uniqueReservationIds.size} {uniqueReservationIds.size > 1 ? 'réservations trouvées' : 'réservation trouvée'} */}
            </span>
            <div className="overflow-x-auto w-full h-[325px]">
                <div className='w-full flex flex-col gap-4'>
                    {
                        reservationList && reservationList.map((reservation) => {
                            return <ReservationItem key={reservation.id} reservation={reservation} />
                        })
                    }
                </div>
            </div>
        </>
    );
}
