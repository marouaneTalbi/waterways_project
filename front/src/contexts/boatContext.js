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
    let lastBoat = null;

    const addBoat = async () => {
        if (isProvider) {
            // A REFACTO
            console.log("et de 1");
            const modifiedEstablishment = `/api/establishments/${boat.establishment}`;
            console.log(modifiedEstablishment);
            // A REFACTO
            const modifiedBoat = { ...boat, establishment: modifiedEstablishment };

            return boatModel.add(modifiedBoat).then(response => {
                setBoatList(prevBoats => [...prevBoats, response]);
                setLastBoat(response.id);
                return response.id;
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const getBoat = async (id) => {
        return boatModel.get(id).then(response => {
            setBoat(response);
        }).catch(error => {
            console.error(error);
        })
    }

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
        <BoatContext.Provider value={{ getBoatList, boatList, boat, setBoat, addBoat, lastBoat, getLastBoat, searchBoat, results, getBoat }}>
            {children}
        </BoatContext.Provider>
    );
}

export default BoatProvider;
