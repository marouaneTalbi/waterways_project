import React, { useEffect, useState } from 'react';
import {
    Scheduler,
    WeekView,
    Appointments,
    AllDayPanel,
    DateNavigator,
    Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { SlotsContext } from '../../contexts/slotsContext';
import { useParams } from 'react-router-dom';
import {
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
} from '@material-ui/core';
import SlotsList from "../Slots/SlotsList";

const ReservationSlotList = () => {
    const { slotsList, getSlotsList } = React.useContext(SlotsContext);
    const { id: idBoat } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        getSlotsList();
    }, []);

    const reservations = slotsList?.flatMap(function (slot) {
        const dailyReservations = [];
        const slotBoat = slot.boat;
        if (slotBoat === `/api/boats/${idBoat}`) {
            const startDate = new Date(slot.startBookingDate);
            const endDate = new Date(slot.endBookingDate);
            const startTime = new Date(slot.startTime);
            const endTime = new Date(slot.endTime);
            const slotId = slot.id;

            dailyReservations.push({
                title: 'rien' + slotId,
                startDate: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()),
                endDate: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()),
                id: slotId,
                location: 'Room 1',
            });
        }
        return dailyReservations;
    }) || [];

    const openModal = (reservation) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };

    const handleEdit = () => {
        console.log("Edition de la réservation", selectedReservation);
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        console.log("Suppression de la réservation", selectedReservation);
        setIsModalOpen(false);
    };

    let currentDate = new Date();

    return (
        <div>
            <Button onClick={() => setIsModalOpen(true)}>CRENEAUX HORAIRES</Button>

            {isModalOpen && (
                <div>
                    <SlotsList></SlotsList>
                </div>
            )}
            <Scheduler
                data={reservations}
                height={660}
                locale={'fr-FR'}
            >
                <ViewState
                    defaultCurrentDate={currentDate}
                    locale={'fr-FR'}
                />
                <WeekView
                    startDayHour={6}
                    endDayHour={23}
                    locale={'fr-FR'}
                />
                <Toolbar />
                <DateNavigator />
                <Appointments />
                <AllDayPanel />
            </Scheduler>
        </div>
    );
};

export default ReservationSlotList;
