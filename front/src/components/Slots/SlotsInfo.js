import React, { useContext, useEffect } from 'react'
import { faEnvelope, faUser, faPhone, faFlask } from '@fortawesome/free-solid-svg-icons';
import DataCard from '../DataCard/DataCard';
import { SlotsContext } from '../../contexts/slotsContext';

export default function SlotsInfos(slots) {
    const { formatDate } = useContext(SlotsContext);

    return (
        <>
            <DataCard title="address" value={slots.slots?.startBookingDate} icon={faUser} />
            <DataCard title="End Date" value={formatDate(slots.slots?.endBookingDate)} icon={faPhone} />
            <DataCard title="Start Date" value={formatDate(slots.slots?.boatId)} icon={faPhone} />
        </>
    )
}