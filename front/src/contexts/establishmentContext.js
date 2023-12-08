import React, { useState, createContext, useEffect } from 'react';
import EstablishmentApi from './models/establishmentModel';
import { isProvider } from '../services/axiosRequestFunction';

export const EstablishmentContext = createContext(null);

const EstablishmentProvider = ({ children }) => {
    const [establishments, setEstablishments] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        EstablishmentApi.getAll().then(setEstablishments)
    }, []);

    const addEstablishment = async ({name, address, startDate, endDate, user}) => {
        if (isProvider) {
            return EstablishmentApi.add({name, address, startDate, endDate, user}).then(response => {
                console.log(response)
            })
        } else {
            throw new Error('You are not a provider');  
        }
    }

    const getEstablishment = async (establishmentId) => {
        console.log(isProvider, establishmentId)
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
        <EstablishmentContext.Provider value={{name, setName, address, setAddress, endDate, setEndDate, startDate, setStartDate, establishments, setEstablishments, addEstablishment, getEstablishment, getCurrentEstablishment, formatDate}}>
            {children}
        </EstablishmentContext.Provider>
    );
}

export default EstablishmentProvider;