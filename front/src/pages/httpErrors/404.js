import React from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from 'flowbite-react';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center w-full mt-56'>
      <h1 className='text-[#45839D] text-8xl font-semibold'>404</h1>
      <h2 className='text-2xl font-semibold text-[#45839D]'>Oops! Page non trouvée.</h2>
      <p className='text-gray-500 text-center'>
        Nous ne pouvons pas trouver la page que vous cherchez.
        Il se pourrait qu'elle ait été supprimée ou que l'URL ait été mal saisie.
      </p>
      <Button className='bg-[#45839D] mt-6'>
        <Link to="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
