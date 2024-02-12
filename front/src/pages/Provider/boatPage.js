import React from 'react'
import BoatProvider from '../../contexts/boatContext'
import BoatInfo from '../../components/Boat/BoatInfo'
import CommentProvider from '../../contexts/commentContext'
import NoteProvider from '../../contexts/noteContext'

export default function boatPage() {
    return (
        <BoatProvider>
            <NoteProvider>
                <CommentProvider>
                    <BoatInfo />
                </CommentProvider>
            </NoteProvider>
        </BoatProvider>
    )
}
