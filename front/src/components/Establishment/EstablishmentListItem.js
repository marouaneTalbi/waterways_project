import React, { useContext } from 'react'
import { Table } from 'flowbite-react'
import { useNavigate } from 'react-router';
import { EstablishmentContext } from '../../contexts/establishmentContext';

export default function EstablishmentListItem({ establishment }) {
    const {formatDate} = useContext(EstablishmentContext);


    const navigate = useNavigate();
    const navigateToEstablishment = (establishment) => {
        navigate(`/establishment-page/${establishment.id}`);
    }

    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {establishment.name}
            </Table.Cell>
            <Table.Cell>{establishment.address}</Table.Cell>
            <Table.Cell className='sm:table-cell hidden'>{establishment.city}</Table.Cell>
            <Table.Cell className='sm:table-cell hidden'>{formatDate(establishment.startDate)}</Table.Cell>
            <Table.Cell className='sm:table-cell hidden'>{formatDate(establishment.endDate)}</Table.Cell>
            <Table.Cell>
                <a onClick={() => navigateToEstablishment(establishment)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    GERER
                </a>
            </Table.Cell>
        </Table.Row>
    )
}
