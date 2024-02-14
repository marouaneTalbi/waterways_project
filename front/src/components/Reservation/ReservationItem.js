import React, { useContext, useEffect, useState, useCallback } from 'react';
import ConfirmModal from '../Modal/ConfirmModal';
import { ReservationContext } from "../../contexts/reservationContext";
import { UserContext } from "../../contexts/userContext";

const ReservationsItem = React.memo(({ reservation}) => {
    const { deleteReservation, getBoatFromReservation, getSlotsFromReservation, slots, boat } = useContext(ReservationContext);
    const { getUser, user } = useContext(UserContext);
    const [slotsDetails, setSlotsDetails] = useState({});
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const fetchData = async () => {
        if(reservation) {
            try {
                const boatId = reservation.boat.split('/').pop();
                const getSlots = reservation.id;
                getBoatFromReservation(boatId);
                getSlotsFromReservation(reservation.id);
                setSlotsDetails(slots);
                console.log(slotsDetails);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };


    useEffect(() => {
        fetchData();
    }, [reservation, boat]);

    if (!reservation || !boat) {
        return null; // or render a loading indicator
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
                {user && user.firstname && user.lastname && `${user.firstname} ${user.lastname}`}
            </li>
            <li>{boat.name}</li>
                <li>
                    {slotsDetails.startBookingDate && slotsDetails.endBookingDate && `${new Date(slotsDetails.startBookingDate).toLocaleDateString()} - ${new Date(slotsDetails.endBookingDate).toLocaleDateString()}`}
                    {slots.startTime && slots.endTime && `${new Date(slots.startTime).getHours()}:${new Date(slots.startTime).getMinutes()} - ${new Date(slots.endTime).getHours()}:${new Date(slots.endTime).getMinutes()}`}
                </li>
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
})


export default ReservationsItem;