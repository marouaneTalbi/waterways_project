'use client';
import React, { useState, createContext, useEffect, useContext } from 'react';
import establishmentModel from './models/establishmentModel';
import EstablishmentApi from './models/establishmentModel';
import { getUserRole } from '../services/axiosRequestFunction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './userContext';
import { useNavigate } from 'react-router-dom';

export const EstablishmentContext = createContext(null);

const EstablishmentProvider = ({ children }) => {
    const [establishmentList, setEstablishmentList] = useState([]);
    const [establishment, setEstablishment] = useState(null);
    const [establishments, setEstablishments] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [establishmentResults, setEstablishmentResults] = useState(null);
    const currentUser = getUserRole();
    const isProvider = currentUser && currentUser.roles.find(role => role === 'ROLE_PROVIDER');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            EstablishmentApi.getList(user.id).then(setEstablishments)
        }
    }, [user]);

    const getEstablishmentItem = (establishment) => {
        setEstablishment(establishment);
        setName(establishment.name);
        setAddress(establishment.address);
        setCity(establishment.city);
        setStartDate(establishment.startDate);
        setEndDate(establishment.endDate);
    }

    const getEstablishmentList = async () => {
        if(user) {
            return establishmentModel.getList(user.id).then(response => {
                setEstablishmentList(response);
            }).catch(error => {
                if(error.request.status === 403) {
                    navigate('/403')
                }
            })
        }
    }

    const getEstablishmentId = (establishment) => {
        const parts = establishment.split('/');
        return parts[parts.length - 1];
    }

    const getEtablismentName = (establishment) => {
        if(!establishment) return;
        const establishmentId = getEstablishmentId(establishment)

        if(establishmentList) {
            const currentEstablishment = establishmentList.find(establishment => establishment.id === establishmentId);
            return currentEstablishment?.name;
        }
    }

    const addEstablishment = async ({name, address, city, startDate, endDate, user}) => {
        if (isProvider) {
            return EstablishmentApi.add({name, address, city, startDate, endDate, user}).then(response => {
                setShowToast(true);
                setEstablishments(prevEstablishments => [...prevEstablishments, response]);
                toast.success('Etablissement ajouté');
            })
        } else {
            setShowToast(true);
            toast.error('Erreur lors de l\'ajout de l\'établissement')
            throw new Error('You are not a provider');  
        }
    }

    const editEstablishment = async ({name, address, city, startDate, endDate}, id) => {
        if (isProvider) {
            return EstablishmentApi.edit({name, address, city, startDate, endDate}, id).then(response => {
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

    const searchEstablishment = async (payload) => {
        return EstablishmentApi.search(payload).then(response => {
            setEstablishmentResults(response);
        }).catch(error => {
            console.log(error)
        })
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
        <EstablishmentContext.Provider value={{editEstablishment, getEstablishmentItem, getEstablishmentList, establishment, setEstablishment, establishmentList, getEtablismentName, name, setName, address, setAddress, city, setCity, endDate, setEndDate, startDate, setStartDate, establishments, setEstablishments, addEstablishment, getEstablishment, getCurrentEstablishment, formatDate, searchEstablishment, establishmentResults}}>
            {showToast && (
                <ToastContainer />
            )}
            {children}
        </EstablishmentContext.Provider>
    );
}

export default EstablishmentProvider;

