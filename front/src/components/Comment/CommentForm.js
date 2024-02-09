import React, { useState } from 'react';
import sendRequest from "../../services/axiosRequestFunction";

const AddCommentForm = ({ boatId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(`/api/comments`, 'POST', {
        comment:comment,
        createdby: '/api/users/4',
        boat:'/api/boat/'+ boatId,
        createdAt: new Date(),
      });
      console.log('Commentaire ajouté avec succès!');
      setComment(''); 
    } catch (error) {
      console.error('Erreur lors de l’ajout du commentaire :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Commentaire:</label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Ajouter Commentaire</button>
    </form>
  );
};

export default AddCommentForm;
