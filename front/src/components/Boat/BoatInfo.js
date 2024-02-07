import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BoatContext } from '../../contexts/boatContext'

export default function BoatInfo() {
    const { id } = useParams()
    const { getBoat, boat } = useContext(BoatContext);

    useEffect(() => {
        getBoat(id)
    }, [id])

    return (
        <div className="grid md:grid-cols-4 grid-cols-2 md:grid-rows-4 grid-rows-6 gap-4 w-full">
            <div className="col-span-2 row-span-2 bg-red-500">1</div>
            <div className="md:col-start-3 md:row-start-1 row-start-3 bg-green-500">2</div>
            <div className="md:col-start-4 md:row-start-1 row-start-3 bg-blue-500">3</div>
            <div className="col-span-2 md:col-start-3 md:row-start-2 row-start-4 bg-yellow-500">4</div>
            <div className="col-span-2 row-span-2 md:row-start-3 row-start-5 bg-purple-500">5</div>
        </div>



// {/* <div className="grid grid-cols-2 grid-rows-6 gap-4">
//     <div className="col-span-2 row-span-2">1</div>
//     <div className="row-start-3">2</div>
//     <div className="row-start-3">3</div>
//     <div className="col-span-2 row-start-4">4</div>
//     <div className="col-span-2 row-span-2 row-start-5">5</div>
// </div> */}
    )
}
