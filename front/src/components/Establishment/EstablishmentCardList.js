import React, { useContext } from 'react'
import { EstablishmentContext } from '../../contexts/establishmentContext';
import BoatCard from '../Boat/BoatCard';

export default function EstablishmentCardList() {

    const { establishmentResults } = useContext(EstablishmentContext);

    return (
        <ul className='flex flex-col gap-6 overflow-y-scroll mt-5 h-[700px]'>
        {
            establishmentResults && establishmentResults.map((establishment, index) => {
                return (
                    <>
                        <div>
                            <h4 className='text-xl font-semibold'>{establishment.name}</h4>
                            <span className='text-gray-500'>{establishment.city} {establishment.address}</span>
                        </div>
                        {
                            establishment.boats.map((boat, index) => {
                                return <BoatCard key={index} boat={boat} />
                            })
                        }
                    </>
                )
            })
        }
    </ul>
    )
}