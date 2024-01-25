import React, { useContext, useEffect } from 'react'
import { faEnvelope, faUser, faPhone, faFlask } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts/userContext'
import DataCard from '../DataCard/DataCard';

export default function UserInfos() {
    const { user, getUser, getRoleLabel, highestRole } = useContext(UserContext);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <DataCard title="email" value={user?.email} icon={faEnvelope} />
            <DataCard title="nom / prenom" value={user?.fullName} icon={faUser} />
            <DataCard title="telephone" value={user?.phone} icon={faPhone} />
            <DataCard title="compte" value={getRoleLabel(highestRole)} icon={faFlask} />
        </>
    )
}
