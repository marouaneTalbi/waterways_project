import React from 'react'

export default function CommentItem() {
    return (
        <div className='bg-white rounded-lg p-4 flex flex-col gap-4'>
            <div className='flex flex-row gap-4 items-center'>
                <img className='rounded-lg w-12 h-12' alt='user-picture' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />
                <div className='flex flex-col text-left justify-between'>
                    <span className='font-semibold'>Theo Bourdel</span>
                    <time className='text-sm text-gray-400'>11-12-2024</time>
                </div>
            </div>
            <p className='text-gray-500'> 
                Ceci est le content d'un commentaire, ceci est le content d'un commentaire, ceci est le content d'un commentaire, ceci est le content d'un commentaire
            </p>
        </div>
    )
}