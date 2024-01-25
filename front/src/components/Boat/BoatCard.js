import React from 'react'
import { Button } from 'flowbite-react'
import { HiStar } from 'react-icons/hi'

export default function BoatCard({ boat }) {
    return (
        <div className='flex flex-row gap-4'>
            <img alt='boat-image' src='https://coursnautique.com/wp-content/uploads/2022/02/Les-diff%C3%A9rentes-parties-dun-bateau-scaled.jpeg' className='bg-red-500 w-[280px] h-[180px] rounded-md' />
            <div className='flex-1 py-2 flex flex-col justify-between'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center'>
                        <HiStar className='text-yellow-400' />
                        <span className='text-gray-500 font-medium text-sm'>4.7 (210)</span>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div>
                            <h2 className='text-gray-900 text-xl font-medium'>{boat.name} {boat.modele}</h2>
                            <span className='text-gray-500'>{boat.establishment.address} - {boat.establishment.city}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-dark-orange text-2xl font-medium'>€500</span>
                            <span className='text-gray-400'>l'heure</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <span className='text-gray-400'>Martine Delacroix</span>
                    <Button className='bg-light-orange text-dark-orange'>Réserver</Button>
                </div>
            </div>
        </div>
    )
}
