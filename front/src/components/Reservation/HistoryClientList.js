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
                {/* {historySlotsList && historySlotsList.length > 0 ? historySlotsList.length : 0}
                {historySlotsList && historySlotsList.length > 1 ? " horaires trouvés" : " horaire trouvé"} */}
            </span>
            <div className="overflow-x-auto w-full">
                <div className='mt-4 h-[200px]'>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Bateau
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Heure
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Prix
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {historySlotsList && historySlotsList.map((reservation, index) => (
                                <HistoryClientItem key={index} reservation={reservation} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
