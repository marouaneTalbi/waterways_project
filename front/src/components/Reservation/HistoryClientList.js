import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../contexts/reservationContext';
import ReservationItem from './ReservationItem';
import {UserContext} from "../../contexts/userContext";


export default function ReservationList() {
    const { getSlotsFromHistory, historySlotsList} = useContext(ReservationContext);
    const [loading, setLoading] = useState(true);
    const { user, getUser, getRoleLabel, highestRole } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSlotsFromHistory(user.id);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <span className='text-gray-500 text-sm mb-4'>
                {historySlotsList && historySlotsList.length > 0 ? historySlotsList.length : 0}
                {historySlotsList && historySlotsList.length > 1 ? " horaires trouvés" : " horaire trouvé"}
            </span>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    {historySlotsList && historySlotsList.map((reservation, index) => (
                        <ReservationItem key={index} reservation={reservation} />
                    ))}
                </div>
            </div>
        </>
    );
}
