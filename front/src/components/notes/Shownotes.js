import React, { useEffect, useState } from 'react';
import sendRequest from "../../services/axiosRequestFunction";
import { Rating } from 'flowbite-react'; 

const BoatRatingsSummary = ({ boatId }) => {
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
            const averages = filteredNotes.reduce((acc, note) => {
              acc.proprete += note.proprete;
              acc.confort += note.confort;
              acc.performance += note.performance;
              acc.equipement += note.equipement;
              return acc;
            }, { proprete: 0, confort: 0, performance: 0, equipement: 0 });

            const numNotes = filteredNotes.length;
            if (numNotes > 0) {
              setRatings({
                proprete: averages.proprete / numNotes,
                confort: averages.confort / numNotes,
                performance: averages.performance / numNotes,
                equipement: averages.equipement / numNotes,
              });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des notes :", error);
        }
    };

    fetchNotes();
  }, [boatId]); 

  const renderRating = (ratingValue) => (
    <Rating>
      {[...Array(5)].map((_, index) => (
        <Rating.Star key={index} filled={index < ratingValue} />
      ))}
    </Rating>
  );

  return (
    <div>
      <h2>Résumé des notes pour le bateau {boatId}</h2>
      <div>Propreté: {renderRating(ratings.proprete)}</div>
      <div>Confort: {renderRating(ratings.confort)}</div>
      <div>Performance: {renderRating(ratings.performance)}</div>
      <div>Équipement: {renderRating(ratings.equipement)}</div>
    </div>
  );
};

export default BoatRatingsSummary;
