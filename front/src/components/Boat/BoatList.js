import React, { useEffect } from 'react'
import { BoatContext } from '../../contexts/boatContext';
import { Table } from 'flowbite-react';
import BoatItem from './BoatItem'

export default function BoatList({showList}) {
    const { boatList, getBoatList } = React.useContext(BoatContext);

    useEffect(() => {
        if(showList) {
            getBoatList();
        }
    }, [])

    return (
        <>
        <span className='text-gray-500 text-sm mb-4'>
                {
                    boatList && boatList.length > 0 ? boatList.length : 0
                }
                {
                    boatList && boatList.length > 1 ? " bateaux trouvés" : " bateau trouvé"
                }
            </span>
        <div className="overflow-x-auto">
            <div className='mt-4 h-[200px]'>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Nom</Table.HeadCell>
                        <Table.HeadCell>Etablissement</Table.HeadCell>
                        <Table.HeadCell>Modèle</Table.HeadCell>
                        <Table.HeadCell>Places</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">GERER</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y overflow-y-scroll w-full" style={{height: '50px'}}>
                        {
                            boatList && boatList.map((boat) => (
                                <BoatItem key={boat.id} boat={boat} />
                            ))
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
        </>
    )
}
