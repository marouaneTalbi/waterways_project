import React, { useContext, useState } from 'react';
import { Table } from 'flowbite-react'
import { SlotsContext } from "../../contexts/slotsContext";
import reservations from '../Reservation/ReservationSlotList';
import {useParams} from "react-router-dom";
import Modal from 'react-modal';
import ConfirmModal from '../Modal/ConfirmModal';
export default function SlotsItem({ slots }) {
    const { deleteSlot } = useContext(SlotsContext);
    const { id: idBoat } = useParams();
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    if (!slots || !slots.boat || slots.boat !== `/api/boats/${idBoat}`) {
        return null;
    }

    const handleDelete = () => {
        setConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteSlot(slots.id);
        setConfirmModalOpen(false);
    };

    const handleCancelDelete = () => {
        setConfirmModalOpen(false);
    };

    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {slots.id}
            </Table.Cell>
            <Table.Cell>{slots.startBookingDate}</Table.Cell>
            <Table.Cell>{slots.endBookingDate}</Table.Cell>
            <Table.Cell>{slots.startTime}</Table.Cell>
            <Table.Cell>{slots.endTime}</Table.Cell>
            <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    GERER
                </a>
                <button onClick={handleDelete} className="font-medium text-red-600 hover:underline dark:text-red-500">
                    Supprimer
                </button>
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onRequestClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    message="Êtes-vous sûr de vouloir supprimer cet horaire ?"
                />
            </Table.Cell>
        </Table.Row>
    )
}
