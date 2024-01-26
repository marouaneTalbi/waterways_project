import React, { useEffect } from 'react';
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

const currentDate = new Date();

const ReservationSlotList = () => {
    const { slotsList, getSlotsList } = React.useContext(SlotsContext);
    const { id: idBoat } = useParams();

    useEffect(() => {
        // Appeler la fonction getSlotsList pour récupérer les données
        getSlotsList();
    }, []);

    const reservations = slotsList?.flatMap(function (slot) {
        const dailyReservations = [];
        const slotBoat = slot.boat;
        console.log('laaaa')
        console.log(slotBoat === `/api/boats/${idBoat}`);
        if (slotBoat === `/api/boats/${idBoat}`) {
            const startDate = new Date(slot.startBookingDate);
            const endDate = new Date (slot.endBookingDate);
            const startTime = new Date (slot.startTime);
            const endTime = new Date (slot.endTime);
            const slotId = slot.id;

            dailyReservations.push({
                title: 'rien' + slotId,
                startDate: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()),
                endDate: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()),
                id: slotId,
                location: 'Room 1',
            });
        }
        console.log(dailyReservations)
        return dailyReservations;
    }) || [];

    console.log(reservations)

    return (
        <div>
            <Scheduler
                data={reservations}
                height={660}
            >
                <ViewState
                    defaultCurrentDate={currentDate}
                />
                <WeekView
                    startDayHour={6}
                    endDayHour={23}
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
