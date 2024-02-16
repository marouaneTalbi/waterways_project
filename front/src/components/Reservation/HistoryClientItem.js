import React, { useContext, useState } from 'react';
import ConfirmModal from '../Modal/ConfirmModal';
import { HistoryContext } from "../../contexts/historyContext";
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const HistoryClientItem = React.memo(({ reservation}) => {

    return (
        <>

                {reservation.slots ? (
                    <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {reservation.slots.boat?.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(reservation.slots?.startBookingDate).toLocaleDateString()}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {new Date(reservation.slots?.startTime).getHours() + 'h' + new Date(reservation.slots?.startTime).getMinutes()}
                        -
                        {new Date(reservation.slots?.endTime).getHours() + 'h' + new Date(reservation.slots?.endTime).getMinutes()}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reservation.slots.boat?.price + '€'}</td>
                    <td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight cursor-pointer`}>
                            <span className="relative"><Link to={`/boat/${reservation.slots.boat?.id}`}>re-commande</Link></span>
                        </span>
                    </td>
                    </tr>
                ) :null
                }           

        </>
    )
})


export default HistoryClientItem;