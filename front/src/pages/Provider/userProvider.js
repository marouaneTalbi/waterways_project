import React, {useEffect, useState} from "react";
import axios from "axios";
import sendRequest from "../../services/axiosRequestFunction";
import GenericModal from '../../components/GenericModal/GenericModal';
import {Button, Label, TextInput} from "flowbite-react";
import {getUserRole} from "../../services/axiosRequestFunction";


export default function UserProvider() {
    const [providers, setProviders] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const currentUser = getUserRole();


   useEffect(() => {
        sendRequest(
            '/api/establishments',
            'get',
            {},
            true
        ).then((response) => {
            setProviders(response);
            console.log(response)
        })

    }, []);



    const addProvider = () => {
        const role = currentUser.roles.find(role => role === 'ROLE_PROVIDER');
        if(role) {
            sendRequest(
                '/api/addestablishment',
                'post',
                {
                    name,
                    address,
                    startDate,
                    endDate,
                    user:currentUser.username
                    
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
        addProvider()

        event.preventDefault();
        console.log({ name, address, startDate, endDate });
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
                        <Label htmlFor="address" value="Address" />
                    </div>
                    <TextInput
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="start date" value="Start date" />
                    </div>
                    <TextInput
                        id="start date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        type="time"
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="end date" value="End date" />
                    </div>
                    <TextInput
                        id="end date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        type="time"
                        required
                    />

                    <div className="w-full mt-4">
                        <Button color='red' onClick={handleSubmit}>Ajouter</Button>
                    </div>
                </>
            </GenericModal>

            <div className="min-w-full leading-normal">
                <h2>Establishment</h2>
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
                            Address
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Start Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            End Date
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {providers.map((provider, index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {provider.name}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{provider.address || 'N/A'}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {provider.endDate ? new Date(provider.endDate).toLocaleString() : 'N/A'}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {provider.startDate ? new Date(provider.startDate).toLocaleString() : 'N/A'}
                                </p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div>
    );



}