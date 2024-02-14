import React from 'react'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function BoatItem({ boat }) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {boat.name}
            </Table.Cell>
            <Table.Cell>{boat.establishment.name}</Table.Cell>
            <Table.Cell className='sm:table-cell hidden'>{boat.modele}</Table.Cell>
            <Table.Cell className='sm:table-cell hidden'>{boat.capacity}</Table.Cell>
            <Table.Cell>
                <Link to={`/provider/boat/${boat.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    GERER
                </Link>
            </Table.Cell>
        </Table.Row>
    )
}
