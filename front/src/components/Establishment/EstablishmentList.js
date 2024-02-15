import React, { useContext } from 'react'
import { EstablishmentContext } from '../../contexts/establishmentContext';
import { Button } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'flowbite-react';
import EstablishmentListItem from './EstablishmentListItem';
import { TranslationContext } from '../../contexts/translationContext';

export default function EstablishmentList() {
    const {establishments} = useContext(EstablishmentContext);
    const { translations  } = useContext(TranslationContext);

    const navigate = useNavigate();

    return (
        <>
        <span className='text-gray-500 text-sm mb-4'>
            {
                establishments && establishments.length > 0 ? establishments.length : 0
            }
            {
                establishments && establishments.length > 1 ? ' ' + translations.establishments_found: ' '+translations.establishment_found
            }
        </span>

        <div className="overflow-x-auto">
             <div className='mt-4 h-[200px]'>
                 <Table hoverable>
                     <Table.Head>
                         <Table.HeadCell>{translations.name}</Table.HeadCell>
                         <Table.HeadCell>{translations.address}</Table.HeadCell>
                         <Table.HeadCell>{translations.city}</Table.HeadCell>
                         <Table.HeadCell> {translations.start_date}</Table.HeadCell>
                         <Table.HeadCell> {translations.end_date}</Table.HeadCell>
                         <Table.HeadCell>
                             <span className="sr-only">{translations.action}</span>
                         </Table.HeadCell>
                     </Table.Head>
                     <Table.Body className="divide-y overflow-y-scroll w-full" style={{height: '50px'}}>
                         {
                             establishments && establishments.map((establishment) => (
                                 <EstablishmentListItem key={establishment.id} establishment={establishment} />
                             ))
                         }
                     </Table.Body>
                 </Table>
             </div>
         </div>
        </>
    )
}