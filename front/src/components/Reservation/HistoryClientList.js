import React, { useContext, useEffect, useState } from 'react';
import { HistoryContext } from '../../contexts/historyContext';
import HistoryClientItem from './HistoryClientItem';
import {UserContext} from "../../contexts/userContext";


export default function ReservationList() {
    const { getSlotsFromHistory, historySlotsList} = useContext(HistoryContext);
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
                        <HistoryClientItem key={index} reservation={reservation} />
                    ))}
                </div>
            </div>
        </>
    );
}
