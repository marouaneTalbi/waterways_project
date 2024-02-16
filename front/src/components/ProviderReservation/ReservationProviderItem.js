import React, {useContext, useEffect, useState} from 'react';
import ConfirmModal from '../Modal/ConfirmModal';
import { ReservationContext } from "../../contexts/reservationContext";
import {Button, Table} from 'flowbite-react';
import { UserContext } from '../../contexts/userContext'
import {Link} from "react-router-dom";

export default function ReservationProviderItem({ reservation }) {
    const {deleteReservation} = useContext(ReservationContext);

    //console.log(reservation);

    return (
        <>
            {reservation.slots ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {reservation.slots.boat.name}
                </Table.Cell>
                <Table.Cell>{reservation.slots.boat.establishment.name}</Table.Cell>
                <Table.Cell className='sm:table-cell hidden'>{reservation.slots.startBookingDate}</Table.Cell>
                <Table.Cell className='sm:table-cell hidden'>{reservation.slots.price}</Table.Cell>
                <Table.Cell>
                    <Link to={`/provider/boat/${reservation.slots.boat.id}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        GERER
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to={`/provider/boat/${reservation.slots.boat.id}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        ANNULER
                    </Link>
                </Table.Cell>
            </Table.Row>
                ):null}
        </>
    )
}
