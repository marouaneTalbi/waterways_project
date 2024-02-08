import React, { useEffect, useState, useContext } from 'react';
import {
    Scheduler,
    WeekView,
    Appointments,
    AllDayPanel,
    DateNavigator,
    Toolbar,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { SlotsContext } from '../../contexts/slotsContext';
import { ReservationContext } from "../../contexts/reservationContext";
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
import moment from 'moment';
import 'moment/locale/fr';

const MyAppointmentTooltip = ({ children, appointmentData, ...restProps }) => {
    const { addReservation } = useContext(ReservationContext);
    const { id: idBoat } = useParams();
    const handleClick = () => {
        addReservation(idBoat, appointmentData.id, 1);
    };

    return (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <>
                <button  onClick={handleClick}>Réserver</button>
            </>
            <div>
                {children}
            </div>
        </AppointmentTooltip.Content>
    );
};

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
            const finalStartDate = moment(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()));
            const finalEndDate = moment(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()));
            const slotId = slot.id;

            dailyReservations.push({
                title: 'rien' + slotId,
                startDate: finalStartDate,
                endDate: finalEndDate,
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
                <Appointments/>
                <AllDayPanel />
                <AppointmentTooltip
                    contentComponent={MyAppointmentTooltip}
                />
            </Scheduler>
        </div>
    );
};

export default ReservationSlotList;
