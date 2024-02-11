import React from 'react'
import BoatProvider from '../../contexts/boatContext'
import BoatInfo from '../../components/Boat/BoatInfo'
import CommentProvider from '../../contexts/commentContext'

export default function boatPage() {
    return (
        <BoatProvider>
            <CommentProvider>
                <BoatInfo />
            </CommentProvider>
        </BoatProvider>
    )
}
