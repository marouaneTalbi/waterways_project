import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DataCard({ title, value, icon }) {
    return (
        <div className="flex flex-row gap-2 w-64">
            <div className="rounded-lg bg-gray-300 p-3">
                <FontAwesomeIcon icon={icon} color="gray" size='xl' />
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 font-medium uppercase">{title}</span>
                {value ? (
                    <span className="text-base text-black">{value}</span>
                ): (
                    <span className="text-base text-gray-400">Non renseigné</span>
                )}
            </div>
        </div>
    )
}
