import React, {useContext, useEffect} from 'react'
import { ReservationContext } from '../../contexts/reservationContext';
import { Table } from 'flowbite-react';
import ReservationItem from './ReservationItem'
import {BoatContext} from "../../contexts/boatContext";
import {SlotsContext} from "../../contexts/slotsContext";


export default function ReservationList() {
    const { reservationList, getReservationList } = React.useContext(ReservationContext);
    const { getBoatList, boatList } = useContext(BoatContext);
    //const { slotsList, getSlotsList } = React.useContext(SlotsContext);

    useEffect(() => {
        getReservationList();
        console.log(reservationList)
    }, [getReservationList, reservationList])

    return (
        <>
        <span className='text-gray-500 text-sm mb-4'>
                {
                    reservationList && reservationList.length > 0 ? reservationList.length : 0
                }
            {
                reservationList && reservationList.length > 1 ? " horaires trouvé" : " horaires trouvé"
            }
            </span>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    {
                        reservationList && reservationList.map((reservation) => (
                            <ReservationItem key={reservation.id} reservation={reservation} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
