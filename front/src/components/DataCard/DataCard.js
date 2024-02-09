import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../Loader/Loader';

export default function DataCard({ title, value, icon }) {
    return (
        <div className="flex flex-row gap-2 w-56">
            <div className="rounded-lg bg-gray-300 p-3 h-12 w-12 flex justify-center items-center">
                <FontAwesomeIcon icon={icon} color="gray" size='xl' />
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 font-medium uppercase">{title}</span>
                {value ? (
                    <span className="text-base text-black">{value}</span>
                ): (
                    <Loader />
                )}
            </div>
        </div>
    )
}
