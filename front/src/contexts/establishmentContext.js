import React, { useState, createContext, useEffect } from 'react';
import establishmentModel from './models/establishmentModel';
import EstablishmentApi from './models/establishmentModel';
import { getUserRole } from '../services/axiosRequestFunction';

export const EstablishmentContext = createContext(null);

const EstablishmentProvider = ({ children }) => {
    const [establishmentList, setEstablishmentList] = useState([]);
    const [establishment, setEstablishment] = useState(null);
    const [establishments, setEstablishments] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const currentUser = getUserRole();
    const isProvider = currentUser && currentUser.roles.find(role => role === 'ROLE_PROVIDER');


    useEffect(() => {
        EstablishmentApi.getList().then(setEstablishments)
    }, []);

    const getEstablishmentItem = (establishment) => {
        setEstablishment(establishment);
        setName(establishment.name);
        setAddress(establishment.address);
        setStartDate(establishment.startDate);
        setEndDate(establishment.endDate);
    }

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

    const addEstablishment = async ({name, address, startDate, endDate, user}) => {
        if (isProvider) {
            return EstablishmentApi.add({name, address, startDate, endDate, user}).then(response => {
                console.log(response)
            })
        } else {
            throw new Error('You are not a provider');  
        }
    }

    const editEstablishment = async ({name, address, startDate, endDate}, id) => {
        if (isProvider) {
            return EstablishmentApi.edit({name, address, startDate, endDate}, id).then(response => {
                console.log(response)
            })
        } else {
            throw new Error('You are not a provider');  
        }
    }

    const getEstablishment = async (establishmentId) => {
        if (isProvider) {
           return EstablishmentApi.getOne(establishmentId).then(response => {
                return response;
            })
        } else {
            throw new Error('You are not a provider');  
        }
    }

    const getCurrentEstablishment = async () => {
        const url = window.location.href;
        const urlSplit = url.split('/');
        const establishmentId = urlSplit[urlSplit.length - 1];
        const establishment = await getEstablishment(establishmentId);
        
        return establishment;
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A'; 
    
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) + 
               ' ' + 
               date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <EstablishmentContext.Provider value={{editEstablishment, getEstablishmentItem, getEstablishmentList, establishment, setEstablishment, establishmentList, getEtablismentName, name, setName, address, setAddress, endDate, setEndDate, startDate, setStartDate, establishments, setEstablishments, addEstablishment, getEstablishment, getCurrentEstablishment, formatDate}}>
            {children}
        </EstablishmentContext.Provider>
    );
}

export default EstablishmentProvider;

