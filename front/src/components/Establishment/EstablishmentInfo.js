import React, { useContext, useEffect } from 'react'
import { faEnvelope, faUser, faPhone, faFlask } from '@fortawesome/free-solid-svg-icons';
import DataCard from '../DataCard/DataCard';
import { EstablishmentContext } from '../../contexts/establishmentContext';

export default function EstablishmentInfos(establishment) {
    const { formatDate } = useContext(EstablishmentContext);

    return (
        <>
            <DataCard title="name" value={establishment.establishment?.name} icon={faEnvelope} />
            <DataCard title="address" value={establishment.establishment?.address} icon={faUser} />
            <DataCard title="End Date" value={formatDate(establishment.establishment?.endDate)} icon={faPhone} />
            <DataCard title="Start Date" value={formatDate(establishment.establishment?.startDate)} icon={faPhone} />
        </>
    )
}
