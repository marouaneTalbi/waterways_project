import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NoteCard({icon, title, percentage}) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-2'>
                <FontAwesomeIcon icon={icon} color="black" size='xl' />
                <span className='text-xl font-normal'>{title}</span>
            </div>
            <div className='flex flex-col items-center'>
                <span className='text-dark-orange text-3xl font-semibold'>{percentage}%</span>
                <p className='text-gray-400 text-center'>des gens sont satisfait</p>
            </div>
        </div>
    )
}