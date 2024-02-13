import React from 'react'
import BoatProvider from '../../contexts/boatContext'
import BoatPublic from '../../components/Boat/BoatPublic'
import NoteProvider from '../../contexts/noteContext'

export default function boat() {
    return (

        <BoatProvider>
            <NoteProvider>
                <BoatPublic />
            </NoteProvider>
        </BoatProvider>
    )
}
