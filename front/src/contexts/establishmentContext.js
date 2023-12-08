import React, { useState, createContext } from 'react';
import establishmentModel from './models/establishmentModel';

export const EstablishmentContext = createContext(null);

const EstablishmentProvider = ({ children }) => {
    const [establishmentList, setEstablishmentList] = useState([]);
    const [establishment, setEstablishment] = useState(null);

    const getEstablishmentList = async () => {
        return establishmentModel.getList().then(response => {
            setEstablishmentList(response);
        }).catch(error => {
            console.log(error)
        })
    }

    const getEstablishmentId = (establishment) => {
        const parts = establishment.split('/');
        return parts[parts.length - 1];
    }

    const getEtablismentName = (establishment) => {
        if(!establishment) return;
        const establishmentId = getEstablishmentId(establishment)

        if(establishmentList) {
            const currentEstablishment = establishmentList.find(establishment => establishment.id == establishmentId);
            return currentEstablishment?.name;
        }
    }

    return (
        <EstablishmentContext.Provider value={{ getEstablishmentList, establishment, setEstablishment, establishmentList, getEtablismentName }}>
            {children}
        </EstablishmentContext.Provider>
    );
}

export default EstablishmentProvider;

