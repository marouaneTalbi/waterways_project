import React, { useState } from 'react';
import sendRequest from "../../services/axiosRequestFunction";

const AddNoteForm = ({ boats }) => {
  const [note, setNote] = useState({
    proprete: parseInt(''),
    confort: parseInt(''),
    performance: parseInt(''),
    equipement: parseInt(''),
    boat: '/api/boat/4',
    createdby: '/api/users/4',
  });

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     // const formData = new FormData();
     // formData.append('file', file);  
      const response = await sendRequest('/api/notes', 'POST', note);
      if (response.ok) {
        console.log('Note ajoutée avec succès');
      } else {
        console.error('Une erreur est survenue lors de l\'ajout de la note');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la note', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une note</h2>
      {['proprete', 'confort', 'performance', 'equipement'].map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <input
            type="number"
            name={field}
            value={note[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Ajouter Note</button>
    </form>
  );
};

export default AddNoteForm;
