import React, {useEffect, useState} from "react";
import axios from "axios";
import sendRequest, {isProvider}  from "../../services/axiosRequestFunction";
import GenericModal from '../GenericModal/GenericModal';
import {Button, Label, Select, TextInput} from "flowbite-react";
import {getUserRole} from "../../services/axiosRequestFunction";


export default function Boats(props) {
    const [boats, setBoats] = useState([]);
    const [allEstablishments, setEstablishments] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [modele, setModele] = useState('');
    const [size, setSize] = useState('');
    const [capacity, setCapacity] = useState('');
    const [establishment, setEstablishment] = useState('');
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
                    capacity :Number(capacity),
                    establishment: `/api/establishments/${establishment}`
                },
                true
            ).then((response) => {
                console.log(response)
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
        addBoat()
        event.preventDefault();
        handleCloseModal();
    };

    return (
        <div className="mt-8 mx-4">
            <GenericModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Modifier mes informations"
            >
                <>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="modele" value="Modele" />
                    </div>
                    <TextInput
                        id="modele"
                        value={modele}
                        onChange={(e) => setModele(e.target.value)}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="size" value="Size" />
                    </div>
                    <TextInput
                        id="size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        type="integer"
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="capacity" value="Capacity" />
                    </div>
                    <TextInput
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        type="integer"
                        required
                    />
                    <div className="mb-2 block">
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
                                Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Modele
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Size
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Capacity
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Establishment
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