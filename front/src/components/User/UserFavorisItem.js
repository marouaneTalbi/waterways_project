import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BoatContext } from '../../contexts/boatContext'

export default function UserFavorisItem({ favorite }) {

    const { removeFavorite } = useContext(BoatContext)

    const removeBoatFromFavorite = () => {
        removeFavorite(favorite)
    }

    return (
        <div className='flex flex-row gap-4 w-full'>
            <img alt='boat-image' src='https://coursnautique.com/wp-content/uploads/2022/02/Les-diff%C3%A9rentes-parties-dun-bateau-scaled.jpeg' className='bg-red-500 w-[150px] object-cover h-[100px] rounded-md' />
            <div className='flex flex-col justify-between my-1 w-full'>
                <div>
                    <h3 className='font-normal text-lg'>{favorite?.name} {favorite.modele}</h3>
                    <span className='text-gray-400'>{favorite.address} {favorite.city}</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <Link to={`/boat/${favorite.id}`} className='font-semibold'>Voir</Link>
                    <button className='text-red-500 hover:underline' onClick={removeBoatFromFavorite}>Supprimer</button>
                </div>
            </div>
        </div>
    )
}
