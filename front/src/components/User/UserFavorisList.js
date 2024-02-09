import React, { useContext, useEffect } from 'react'
import { BoatContext } from '../../contexts/boatContext'
import UserFavorisItem from './UserFavorisItem'
import Loader from '../Loader/Loader'

export default function UserFavorisList() {

    const { getFavorite, favorites } = useContext(BoatContext)

    useEffect(() => {
        getFavorite()
    }, [])

    return (
        <div className='flex flex-col gap-4 mt-2'>
            {
                favorites == null ? (
                    <Loader />
                ) : (
                    favorites.map((favorite, index) => {
                        return (
                            <>
                                <UserFavorisItem key={index} favorite={favorite} />
                                <hr className='mx-6' />
                            </>
                        )
                    })
                )
            }
        </div>
    )
}