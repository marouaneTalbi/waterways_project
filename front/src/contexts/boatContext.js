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
            return axios.post('http://localhost:8888/api/addboat', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(
                response => {
                    console.log(response.data)
                    setBoatList(prevBoats => [...prevBoats, response.data]);
                    setLastBoat(response.data.id);
                    return response.data.id;
                }).catch(error => {
                    console.log(error);
                });


        }
    };

    const setLastBoat = async (idBoat) => {
        lastBoat = idBoat;
        console.log("setLastBoat");
        console.log(lastBoat);
    }

    const getLastBoat = async () => {
        return lastBoat;
    }

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
        <BoatContext.Provider value={{ getBoatList, boatList, boat, setBoat, addBoat, lastBoat, getLastBoat, searchBoat, results }}>
            {children}
        </BoatContext.Provider>
    );
}

export default BoatProvider;
