import React, { useContext, useEffect } from 'react'
import { BoatContext } from '../../contexts/boatContext';
import { Table } from 'flowbite-react';
import BoatItem from './BoatItem'
import { UserContext } from '../../contexts/userContext';
import { TranslationContext } from '../../contexts/translationContext';

export default function BoatList({showList}) {
    const { user, getUser} = useContext(UserContext);
    const {boat, boatList, getBoatListUser } = React.useContext(BoatContext);
    const { translations  } = useContext(TranslationContext);

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if(user) {
            getBoatListUser(user.id)
        }
    }, [user, boat])

    return (
        <>
            <span className='text-gray-500 text-sm mb-4'>
                {
                    boatList && boatList.length > 0 ? boatList.length : 0
                }
                {
                    boatList && boatList.length > 1 ? " "+ translations.boats_found: " "+translations.boat_found
                }
            </span>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>{translations.name}</Table.HeadCell>
                            <Table.HeadCell>{translations.establishment}</Table.HeadCell>
                            <Table.HeadCell>{translations.model}</Table.HeadCell>
                            <Table.HeadCell>{translations.places}</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">{translations.action}</span>
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
