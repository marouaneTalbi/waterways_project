import React from 'react'
import BoatProvider from '../../contexts/boatContext'
import BoatPublic from '../../components/Boat/BoatPublic'

export default function boat() {
    return (
        <BoatProvider>
            <BoatPublic />
        </BoatProvider>
    )
}
