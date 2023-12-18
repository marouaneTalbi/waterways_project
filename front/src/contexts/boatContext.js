import React, { useState, createContext } from 'react';
import boatModel from './models/boatModel';
import sendRequest, {getUserRole} from '../services/axiosRequestFunction';

export const BoatContext = createContext(null);

const BoatProvider = ({ children }) => {
    const [boatList, setBoatList] = useState([]);
    const [boat, setBoat] = useState({});
    const currentUser = getUserRole();
    const isProvider = currentUser && currentUser.roles.find(role => role === 'ROLE_PROVIDER');
    const [results, setResults] = useState([]);


    const addBoat = async () => {
        if (isProvider) {
            // A REFACTO
            const modifiedEstablishment = `/api/establishments/${boat.establishment}`;
    
            // A REFACTO
            const modifiedBoat = { ...boat, establishment: modifiedEstablishment };
    
            return boatModel.add(modifiedBoat).then(response => {
                setBoatList(prevBoats => [...prevBoats, response]);
                console.log(boatList);
            }).catch(error => {
                console.log(error);
            });
        }
    };
    

    const getBoatList = async () => {
        return boatModel.getList().then(response => {
            setBoatList(response);
        }).catch(error => {
            console.log(error)
        })
    }

    const searchBoat = async (payload) => {
        return boatModel.search(payload).then(response => {
            setResults(response);
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <BoatContext.Provider value={{ getBoatList, boatList, boat, setBoat, addBoat, searchBoat, results }}>
            {children}
        </BoatContext.Provider>
    );
}

export default BoatProvider;
