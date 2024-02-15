import React from 'react'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom';

export default function landingPage() {
    return (
        <section className="bg-hero-pattern absolute top-0 left-0 w-screen h-screen bg-cover bg-bottom bg-no-repeat">
            <div className='md:mt-40 md:ml-40 md:w-[700px] w-[80%] sm:mt-20 sm:ml-20 ml-10 mt-10'>
                <h1 className='text-white text-7xl font-black mb-6'>Découvrez Votre Prochaine Aventure Nautique</h1>
                <p className='text-gray-300 text-2xl font-normal mb-6'>Que vous vouliez prendre le large ou mettre votre bateau à la disposition d'autres passionnés, Réservez WaterWays est la solution !</p>
                <Button color='gray'><Link to="/search">Réserver votre bateau</Link></Button>
            </div>
        </section>
    )
}