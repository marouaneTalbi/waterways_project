import React, {useEffect, useState} from "react";
import axios from "axios";
import sendRequest, {isProvider}  from "../../services/axiosRequestFunction";
import GenericModal from '../GenericModal/GenericModal';
import {Button, Label, Select, TextInput} from "flowbite-react";
import {getUserRole} from "../../services/axiosRequestFunction";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';

export default function Boats(progps) {
    const [boats, setBoats] = useState([]);
    const [allEstablishments, setEstablishments] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [modele, setModele] = useState('');
    const [size, setSize] = useState('');
    const [capacity, setCapacity] = useState('');
    const [establishment, setEstablishment] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [minTime, setMinTime] = useState('');
    const currentUser = getUserRole();
    const isProvider = currentUser.roles.find(role => role === 'ROLE_PROVIDER');

    useEffect(() => {
        sendRequest('/api/boats','get',{},true).then(setBoats)
        sendRequest('/api/establishments','get',{},true).then(setEstablishments)
    }, []);

    const getEstablishmentId = (establishment) => {
        const parts = establishment.split('/');
        return parts[parts.length - 1];
    }

    const getEtablismentName = (establishment) => {
        if(!establishment) return;
        const establishmentId = getEstablishmentId(establishment)

        if(allEstablishments) {
            const currentEstablishment = allEstablishments.find(establishment => establishment.id == establishmentId);
            return currentEstablishment?.name;
        }
    }

    const addBoat = () => {
        if(isProvider) {
            sendRequest(
                '/api/addboat',
                'post',
                {
                    name,
                    modele,
                    size: Number(size),
                    capacity : Number(capacity),
                    minTime: Number(minTime),
                    establishment: `/api/establishments/${establishment}`
                },
                true
            ).then((response) => {
                const boatId = response.data.id;
                console.log("passe ici");
                console.log(startDate);
                console.log(endDate);
                /*sendRequest(
                    '/api/slots',
                    'post',
                    {
                        startBookingDate: startDate,
                        endBookingDate: endDate,
                        idBoat: Number(boatId)
                    },
                    true
                ).then((response) => {
                    const BoatId = response.data.id;

                    console.log(response)
                })
                console.log(response)*/
            })
        }
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = (event) => {
        addBoat();
        event.preventDefault();
        handleCloseModal();
    };

    return (
        <div className="mt-8 mx-4">
            <GenericModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Ajouter un nouveau bateau"
            >
                <>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Nom" />
                    </div>
                    <TextInput
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="modele" value="Modèle" />
                    </div>
                    <TextInput
                        id="modele"
                        value={modele}
                        onChange={(e) => setModele(e.target.value)}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="size" value="Taille" />
                    </div>
                    <TextInput
                        id="size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        type="integer"
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="capacity" value="Capacité" />
                    </div>
                    <TextInput
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        type="integer"
                        required
                    />

                    <div className="mt-5 block">
                        <Label htmlFor="timeNumber" value="Temps minimum de réservation" />
                    </div>

                    <TextInput
                        id="minTime"
                        value={minTime}
                        onChange={(e) => setMinTime(e.target.value)}
                        type="integer"
                        required
                    />

                    <h3 className="flex items-center justify-center mt-10">Date de disponibilité</h3>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="dateAvailable" value="date de début" />
                        </div>
                        <DatePicker
                            showTimeSelect
                            minTime={new Date(0, 0, 0, 5, 0)}
                            maxTime={new Date(0, 0, 0, 23, 0)}
                            timeFormat="HH:mm"
                            dateFormat="dd/MM/yyyy HH:mm"
                            locale={fr}
                            selectsStart
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            startDate={startDate}
                        />

                        <div className="mb-2 block">
                            <Label htmlFor="dateAvailable" value="date de fin" />
                        </div>
                        <DatePicker
                            showTimeSelect
                            minTime={new Date(0, 0, 0, 5, 0)}
                            maxTime={new Date(0, 0, 0, 23, 0)}
                            timeFormat="HH:mm"
                            dateFormat="dd/MM/yyyy HH:mm"
                            selectsEnd
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            endDate={endDate}
                            startDate={startDate}
                            minDate={startDate}
                        />
                    </div>

                    <div className="mt-10 block">
                        <Label htmlFor="Establishment" value="establishment" />
                    </div>

                    <Select
                        id="establishment"
                        value={establishment}
                        onChange={(e) => setEstablishment(e.target.value)}
                        required
                    >
                        {allEstablishments.map(establishment => (
                            <option key={establishment.id} value={establishment.id}>
                                {establishment.name}
                            </option>
                        ))}
                    </Select>

                    <div className="w-full mt-4">
                        <Button color='red' onClick={handleSubmit}>Ajouter</Button>
                    </div>
                </>
            </GenericModal>
            <div className="min-w-full leading-normal">
                <h2>Boats</h2>
                <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>Ajouter</button>
            </div>
            {
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nom
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Modèle
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                taille
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Capacité
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Temps de réservation minimum
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                établissement
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {boats.map((boat, index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {boat.name}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{boat.modele || 'N/A'}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {boat.size}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {boat.capacity}
                                </p>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {(boat.minTime)}
                                </p>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {getEtablismentName(boat.establishment)}
                                </p>
                            </td>
                            <td className="flex px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <Button color="black">
                                    Gerer
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div>
    );
}