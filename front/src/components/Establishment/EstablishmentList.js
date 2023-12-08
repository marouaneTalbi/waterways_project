import React, { useContext } from 'react'
import { EstablishmentContext } from '../../contexts/establishmentContext';
import { Button } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EstablishmentList() {
    const {establishments} = useContext(EstablishmentContext);
    const navigate = useNavigate();
    const navigateToEstablishment = (establishment) => {
        navigate(`/establishment-page/${establishment.id}`);
    }

    return (
        <>
            {establishments &&
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
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {establishments.map((establishment, index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {establishment.name}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{establishment.address || 'N/A'}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {establishment.endDate ? new Date(establishment.endDate).toLocaleString() : 'N/A'}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {establishment.startDate ? new Date(establishment.startDate).toLocaleString() : 'N/A'}
                                </p>
                            </td>

                            <td className="flex px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <Button color="black" onClick={() => navigateToEstablishment(establishment)}>
                                    Gerer
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </>
    )
}