import React, { useEffect } from 'react'
import { SlotsContext } from '../../contexts/slotsContext';
import { Table } from 'flowbite-react';
import SlotsItem from './SlotsItem'

export default function SlotsList() {
    const { slotsList, getSlotsList } = React.useContext(SlotsContext);

    useEffect(() => {
        getSlotsList();
    }, [])

    return (
        <>
        <span className='text-gray-500 text-sm mb-4'>
                {
                    slotsList && slotsList.length > 0 ? slotsList.length : 0
                }
            {
                slotsList && slotsList.length > 1 ? " horaires trouvé" : " horaires trouvé"
            }
            </span>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Bateau</Table.HeadCell>
                            <Table.HeadCell>Le</Table.HeadCell>
                            <Table.HeadCell>De</Table.HeadCell>
                            <Table.HeadCell>A</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">GERER</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y overflow-y-scroll w-full" style={{height: '50px'}}>
                            {
                                slotsList && slotsList.map((slot) => (
                                    <SlotsItem key={slot.id} slots={slot} />
                                ))
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}
