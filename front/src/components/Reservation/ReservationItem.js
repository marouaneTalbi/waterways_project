import React, { useContext, useEffect, useState, useCallback } from 'react';
import ConfirmModal from '../Modal/ConfirmModal';
import { ReservationContext } from "../../contexts/reservationContext";
import { UserContext } from "../../contexts/userContext";

const ReservationsItem = React.memo(({ reservation}) => {
    const { deleteReservation, getBoatFromReservation, getSlotsFromReservation, slotsList, boatList } = useContext(ReservationContext);
    const { getUser, user } = useContext(UserContext);
    const [slotsDetails, setSlotsDetails] = useState({});
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const fetchData = async () => {
        if(reservation) {
            try {
                const boatId = reservation.boat.split('/').pop();
                const getSlots = reservation.id;
                await getBoatFromReservation(boatId);
                await getSlotsFromReservation(reservation.id);
                console.log(boatList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };


    useEffect(() => {
        fetchData();
    }, [reservation]);

    if (!reservation || !boatList) {
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
            { slotsList.length && slotsList.map((slots, index) => (
                <div key={index}>
                    <li className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user && user.firstname && user.lastname && `${user.firstname} ${user.lastname}`}
                        index
                    </li>
                    <li>Nom du bateau : {boatList[index].name}</li>

                    <li>
                        {slots.startBookingDate && slots.endBookingDate && `Date : ${new Date(slots.startBookingDate).toLocaleDateString()}`}
                    </li>

                    <li>{slots.startTime && slots.endTime && `Horaires : ${new Date(slots.startTime).getHours()}:${new Date(slots.startTime).getMinutes()} - ${new Date(slots.endTime).getHours()}:${new Date(slots.endTime).getMinutes()}`}</li>

                    <li>Date de reservation : {new Date(reservation.reservationDate).toLocaleDateString()}</li> {/* Utilisez juste reservation.date ici */}

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
                </div>
            ))}
        </ul>
    )
})


export default ReservationsItem;