import React, { useEffect, useState, useContext } from 'react';
import sendRequest from "../../services/axiosRequestFunction";
import { UserContext } from '../../contexts/userContext';
import {  toast } from 'react-toastify';
import { Rating, Button } from 'flowbite-react';

const notify = (message, type) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  }
};

const AddNoteForm = ({ boatId }) => {
  const { user, getUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [note, setNote] = useState({
    proprete: 0,
    confort: 0,
    performance: 0,
    equipement: 0,
    boat: '/api/boat/'+ boatId,
    createdby: '', 
  });

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setNote(prevNote => ({
        ...prevNote,
        createdby: `/api/users/${user.id}`,
      }));
    }
  }, [user]); 


  const handleRatingChange = (filled, newValue) => {
    setNote(prevNote => ({
      ...prevNote,
      [filled]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
       await sendRequest('/api/notes', 'POST', note);
      notify(" add note success", 'success');
      setIsLoading(false); 
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la note', error);
      notify(" Error while adding note", 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      {Object.keys(note).filter(field => field !== 'boat' && field !== 'createdby').map(field => (
        <div key={field} className="flex flex-col items-center mb-4">
          <label className="mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <Rating>
            {[...Array(5)].map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleRatingChange(field, index + 1)}
                className="text-yellow-500" 
              >
                <Rating.Star filled={index < note[field]} />
              </button>
            ))}
          </Rating>
        </div>
      ))}
          <Button className='w-full mt-2' color='blue' type='submit' disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Ajouter une Note'}
        </Button>
    </form>
  );
};

export default AddNoteForm;
