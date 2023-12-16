import React, { useContext } from 'react'
import BoatCard from './BoatCard';
import { BoatContext } from '../../contexts/boatContext';

export default function BoatCardList() {
    const { results } = useContext(BoatContext);

    return (
        <ul className='flex flex-col gap-6'>
            {
                results && results.map((boat, index) => {
                    return <BoatCard key={index} boat={boat} />
                })
            }
        </ul>
    )
}
