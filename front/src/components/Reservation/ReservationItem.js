import React, {useContext, useEffect, useState} from 'react';
import { Table } from 'flowbite-react'
import { ReservationContext } from "../../contexts/reservationContext";
import { BoatContext } from "../../contexts/boatContext";
import reservations from '../Reservation/ReservationList';
import {useParams} from "react-router-dom";
import Modal from 'react-modal';
import ConfirmModal from '../Modal/ConfirmModal';
export default function ReservationsItem({ reservation }) {
    const { deleteReservation, getBoatFromReservation, getSlotsFromReservation, boat, slots } = useContext(ReservationContext);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);


    useEffect(() => {
        const boatId = reservation.boat.split('/').pop();
        const consumerId = reservation.consumer.split('/').pop();
        const slotsId = reservation.slots.split('/').pop();

        getBoatFromReservation(boatId);
        getSlotsFromReservation(slotsId);

    }, [getBoatFromReservation, getSlotsFromReservation]);

    /*if (!reservation || !reservation.boat || reservation.boat !== `/api/boat/${idBoat}`) {
        return null;
    }*/

    if (!reservation) {
        return null;
    }

    const handleDelete = () => {
        setConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteReservation(reservation.id);
        setConfirmModalOpen(false);
    };

    const handleCancelDelete = () => {
        setConfirmModalOpen(false);
    };

    return (
        <ul className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <li className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {reservation.id}
            </li>
            <li className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {reservation.id}
            </li>
            <li>{boat.name}</li>
            <li>{reservation.consumer}</li>
            <li>{slots.startTime}</li>
            <li>{slots.endTime}</li>
            <li>{reservation.date}</li>
            <li>
                <button onClick={handleDelete} className="font-medium text-red-600 hover:underline dark:text-red-500">
                    Annuler
                </button>
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onRequestClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    message="Êtes-vous sûr de vouloir supprimer cette réservation ?"
                />
            </li>
        </ul>
    )
}
