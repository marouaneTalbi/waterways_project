import React from 'react'
import BoatProvider from '../../contexts/boatContext'
import BoatInfo from '../../components/Boat/BoatInfo'

export default function boatPage() {
    return (
        <BoatProvider>
            <BoatInfo />
        </BoatProvider>
    )
}
