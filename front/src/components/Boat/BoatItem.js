import React from 'react'
import { Table } from 'flowbite-react'

export default function BoatItem({ boat }) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {boat.name}
            </Table.Cell>
            <Table.Cell>{boat.establishment.name}</Table.Cell>
            <Table.Cell>{boat.modele}</Table.Cell>
            <Table.Cell>{boat.capacity}</Table.Cell>
            <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    GERER
                </a>
            </Table.Cell>
        </Table.Row>
    )
}
