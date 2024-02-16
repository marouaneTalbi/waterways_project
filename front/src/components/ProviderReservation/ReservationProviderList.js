import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../contexts/reservationContext';
import ReservationProviderItem from './ReservationProviderItem';
import {UserContext} from "../../contexts/userContext";
import {Table} from "flowbite-react";

export default function ReservationProviderList() {
    const { getSlotsFromReservation, reservationSlotsList} = useContext(ReservationContext);
    const [loading, setLoading] = useState(true);
    const { user, getUser, getRoleLabel, highestRole } = useContext(UserContext);

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if(user) {
            getSlotsFromReservation(user.id)
        }
    }, [user, reservationSlotsList])


    /*if (loading) {
        return <div>Loading...</div>;
    }*/

    return (
        <>
            <span className='text-gray-500 text-sm mb-4'>
                {
                    reservationSlotsList && reservationSlotsList.length > 0 ? reservationSlotsList.length : 0
                }
                {
                    reservationSlotsList && reservationSlotsList.length > 1 ? " BOATS FOUNDED" : " BOAT FOUNDED"
                }
            </span>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>NAME</Table.HeadCell>
                            <Table.HeadCell>ESTABLISHMENT</Table.HeadCell>
                            <Table.HeadCell>MODEL</Table.HeadCell>
                            <Table.HeadCell>PLACES</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">ACTION</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y overflow-y-scroll w-full" style={{height: '50px'}}>
                            {
                                reservationSlotsList && reservationSlotsList.map((reservation) => (
                                    <ReservationProviderItem key={reservation.reservation} reservation={reservation} />
                                ))
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}
