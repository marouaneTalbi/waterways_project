import React, { useState, createContext } from 'react';
import boatModel from './models/boatModel';
import {getUserRole} from '../services/axiosRequestFunction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BoatContext = createContext(null);

const BoatProvider = ({ children }) => {
    const [boatList, setBoatList] = useState([]);
    const [boat, setBoat] = useState(null);
    const currentUser = getUserRole();
    const isProvider = currentUser && currentUser.roles.find(role => role === 'ROLE_PROVIDER');
    const [results, setResults] = useState([]);
    let lastBoat = null;
    const [favorites, setFavorites] = useState(null);
    const [showSlots, setShowslots ] = useState(true);
    const [showEstablishment, setShowEstablishment ] = useState(true);

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

    const getBoat = async (id) => {
        return boatModel.get(id).then(response => {
            setBoat(response);
        }).catch(error => {
            console.error(error);
        })
    }

    const getCurrentBoat = async (id) => {
        return boatModel.get(id).then(response => {
            return response
        }).catch(error => {
            console.error(error);
        })
    }

    const setLastBoat = async (idBoat) => {
        lastBoat = idBoat;
    }

    const getboatsOfEstablishment = async ($id) => {
        return boatModel.getMyBoatsOfEstablishment($id).then(response => {
            setBoatList(response);
            setShowslots(false);
            setShowEstablishment(false);
        }).catch(error => {
            console.log(error)
        })
    }

    const getLastBoat = async () => {
        return lastBoat;
    }

    const getBoatList = async (id) => {
        return boatModel.getList().then(response => {
            setBoatList(response);
            console.log(boatList);
        }).catch(error => {
            console.log(error)
        })
    }

    const getBoatListUser = async (id) => {
        return boatModel.getMyListBoats(id).then(response => {
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

    const editBoat = async (boat, id) => {
        if (isProvider) {
            return boatModel.edit(boat, id).then(response => {
                console.log(response)
            })
        } else {
            throw new Error('You are not a provider');  
        }
    }

    const addFavorite = async (boat) => {
        return boatModel.addFavorite(boat).then(response => {
            setFavorites(prevFavorites => [...prevFavorites, response]);
            toast.success(`Vous avez ajouté le bateau ${boat.name} en favoris`);
        }).catch(error => {
            toast.error('Erreur lors de l\'ajout en favoris')
            console.error(error)
        })
    }

    const getFavorite = async () => {
        return boatModel.getFavorite().then(response => {
            setFavorites(response);
        }).catch(error => {
            console.error(error);
        })
    }

    const removeFavorite = async (boat) => {
        return boatModel.deleteFavorite(boat).then(response => {
            setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== boat.id));
            toast.success(`Vous avez supprimé le bateau ${boat.name} des favoris`);
        }).catch(error => {
            toast.error('Erreur lors de la supression du favoris')
            console.error(error);
        })
    }

    return (
        <BoatContext.Provider value={{getCurrentBoat, showSlots, showEstablishment, getboatsOfEstablishment, getBoatList, getBoatListUser, boatList, boat, setBoat, addBoat, lastBoat, getLastBoat, searchBoat, results, getBoat, editBoat, addFavorite, favorites, getFavorite, removeFavorite }}>
            <ToastContainer />
            {children}
        </BoatContext.Provider>
    );
}

export default BoatProvider;
