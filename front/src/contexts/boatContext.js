import React, { useState, createContext } from 'react';
import boatModel from './models/boatModel';
import sendRequest, {getUserRole} from '../services/axiosRequestFunction';
import axios from 'axios';

export const BoatContext = createContext(null);

const BoatProvider = ({ children }) => {
    const [boatList, setBoatList] = useState([]);
    const [boat, setBoat] = useState({});
    const currentUser = getUserRole();
    const isProvider = currentUser && currentUser.roles.find(role => role === 'ROLE_PROVIDER');
    const [results, setResults] = useState([]);
    let lastBoat = null;

    const addBoat = async (formdata) => {
        if (isProvider) {
            return boatModel.add(formdata)
            .then(
                response => {
                    setBoatList(prevBoats => [...prevBoats, response]);
                    setLastBoat(response.id);
                    return response.id;
                }).catch(error => {
                    console.log(error);
            });
        }
    };

    const setLastBoat = async (idBoat) => {
        lastBoat = idBoat;
    }

    const getLastBoat = async () => {
        return lastBoat;
    }

    const getBoatList = async () => {
        return boatModel.getList().then(response => {

            console.log(response)
            setBoatList(response);
        }).catch(error => {
            console.log(error)
        })
    }

    const searchBoat = async (payload) => {
        return boatModel.search(payload).then(response => {
            setResults(response);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <BoatContext.Provider value={{ getBoatList, boatList, boat, setBoat, addBoat, lastBoat, getLastBoat, searchBoat, results }}>
            {children}
        </BoatContext.Provider>
    );
}

export default BoatProvider;
