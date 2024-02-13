import React, { useContext } from 'react'
import BoatCard from './BoatCard';
import { BoatContext } from '../../contexts/boatContext';
import { UserContext } from '../../contexts/userContext';

export default function BoatCardList() {
    const { results } = useContext(BoatContext);
    const { userResults } = useContext(UserContext);

    return (
        <ul className='flex flex-col gap-6 overflow-y-scroll mt-5'>
            {
                results && results.map((boat, index) => {
                    return <BoatCard key={index} boat={boat} />
                })
            }
            {
                userResults && userResults.map((boat, index) => {
                    return <BoatCard key={index} boat={boat} />
                })
            }
        </ul>
    )
}
