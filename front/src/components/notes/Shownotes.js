import React, { useEffect, useState } from 'react';
import sendRequest from "../../services/axiosRequestFunction";
import { Rating } from 'flowbite-react'; 

const BoatRatingsSummary = ({ boatId }) => {
  const [globalRating, setGlobalRating] = useState(null);
  const [ratings, setRatings] = useState({
    proprete: 0,
    confort: 0,
    performance: 0,
    equipement: 0,
  });

  useEffect(() => {
    const fetchNotes = async () => {
        try {
            const notes = await sendRequest('/api/notes', 'GET');
            const filteredNotes = notes.filter(note => note.boat === `/api/boat/${boatId}`);
            console.log(filteredNotes)
            const averages = filteredNotes.reduce((acc, note) => {
              acc.proprete += note.proprete;
              acc.confort += note.confort;
              acc.performance += note.performance;
              acc.equipement += note.equipement;
              return acc;
            }, { proprete: 0, confort: 0, performance: 0, equipement: 0 });
            console.log(averages)
            const numNotes = filteredNotes.length;
            let totalGeneralAverage = 0;

            if (numNotes > 0) {
              setRatings({
                proprete: averages.proprete / numNotes,
                confort: averages.confort / numNotes,
                performance: averages.performance / numNotes,
                equipement: averages.equipement / numNotes,
              });
              const sum = filteredNotes.reduce((acc, note) => {
                return acc + note.proprete + note.confort + note.performance + note.equipement;
            }, 0);
            totalGeneralAverage = sum / (numNotes * 4);
            console.log(totalGeneralAverage)
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des notes :", error);
        }
    };

    fetchNotes();
  }, [boatId]); 

  return (
    <div>
      <hr />
      <h3 className='underline text-lg my-4'>Moyenne par catégories</h3>
      <div className='flex flex-row gap-2'>
        Propreté : 
        <div className='flex flex-row'>
          {ratings.proprete}
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" className="w-5 h-5 text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
      </div>
      <div className='flex flex-row gap-2'>
        Confort : 
        <div className='flex flex-row'>
          {ratings.confort}
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" className="w-5 h-5 text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
      </div>
      <div className='flex flex-row gap-2'>
        Performance :
        <div className='flex flex-row'>
          {ratings.performance}
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" className="w-5 h-5 text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
      </div>
      <div className='flex flex-row gap-2'>
        Équipement : 
        <div className='flex flex-row'>
          {ratings.equipement}
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" data-testid="flowbite-rating-star" className="w-5 h-5 text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BoatRatingsSummary;
