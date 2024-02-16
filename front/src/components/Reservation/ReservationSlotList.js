import React, { useEffect, useState, useContext, useCallback } from 'react';
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
    Button,
} from '@material-ui/core';
import SlotsList from "../Slots/SlotsList";
import moment from 'moment';
import 'moment/locale/fr';
import { UserContext } from '../../contexts/userContext'

const ReservationSlotList = () => {
    const { slotsList, getSlotsList, getOneSlots, slots } = useContext(SlotsContext);
    const { reservationList, getReservationList, addReservation } = React.useContext(ReservationContext);
    const { id: idBoat } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, getUser } = useContext(UserContext);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        getSlotsList();
    }, []);

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getReservationList();
    }, []);

    const Appointment = ({
                             children,
                             style,
                             data,
                             ...restProps
                         }) => {

        const { reservationList } = useContext(ReservationContext);
        const isReserved = reservationList.some(reservation => `/api/slots/${reservation.slots.id}` === `/api/slots/${data.id}`);

        const appointmentData = {
            id: data.id,
            isReserved: isReserved,
        };

        return (
            <Appointments.Appointment
                {...restProps}
                data={appointmentData}
                style={{
                    ...style,
                    backgroundColor: isReserved ? '#ccc' : '#FFC107',
                    borderRadius: '8px',
                }}
            >
                {children}
            </Appointments.Appointment>
        );
    };

    const MyAppointmentTooltip = ({ children, appointmentData, ...restProps }) => {
        const { addReservation } = useContext(ReservationContext);
        const { id: idBoat } = useParams();
        const { user, getUser, getRoleLabel, highestRole } = useContext(UserContext);
        const handleClick = () => {
            getUser()
            if(user) {
                addReservation(idBoat, appointmentData.id, user.id);
            }
        };

        const isReserved = appointmentData.isReserved;

        return (
            <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
                <div style={{ backgroundColor: isReserved ? '#ccc' : 'transparent' }}>
                    {children}
                </div>
                {!isReserved && <button onClick={handleClick}>RÃ©server</button>}
            </AppointmentTooltip.Content>
        );
    };



    const isSlotReserved = (slotId) => {
        return reservationList.some(reservation => reservation.slots === `/api/boat/${slotId}`);
    };

    const reservations = slotsList?.flatMap(function (slot) {
        const dailyReservations = [];
        const slotBoat = slot.boat.id;
        const slotId = slot.id;

        if (`/api/boat/${slotBoat}` === `/api/boat/${idBoat}`) {
            const startDate = new Date(slot.startBookingDate);
            const endDate = new Date(slot.endBookingDate);
            const startTime = new Date(slot.startTime);
            const endTime = new Date(slot.endTime);
            const finalStartDate = moment(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()));
            const finalEndDate = moment(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()));
            const slotId = slot.id;

            let reservationFound = false;
            if (reservationList && reservationList.length > 0) {
                reservationList.forEach(reservation => {
                    if (reservation.slots && reservation.slots === `/api/slots/${slotId}`) {
                        dailyReservations.push({
                            title: 'reserved' + slotId,
                            startDate: finalStartDate,
                            endDate: finalEndDate,
                            id: slotId,
                            location: 'Room 1',
                        });
                        reservationFound = true;
                    }
                });
            }

            if (!reservationFound) {
                dailyReservations.push({
                    title: 'rien' + slotId,
                    startDate: finalStartDate,
                    endDate: finalEndDate,
                    id: slotId,
                    location: 'Room 1',
                });
            }
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
            {(user && slotsList.length > 0) && (slotsList[0].boat?.establishment?.createdby?.id === user.id) ? (
                <Button onClick={() => setIsModalOpen(true)}>CRENEAUX HORAIRES</Button>
            ) : (<></>)}
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
                <Appointments
                    appointmentComponent={Appointment}
                />
                <AllDayPanel />
                <AppointmentTooltip
                    contentComponent={MyAppointmentTooltip}
                />
            </Scheduler>
        </div>
    );
};


export default ReservationSlotList;