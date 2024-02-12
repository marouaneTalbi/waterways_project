import React, { useEffect, useState, useContext } from 'react';
import { Textarea, Button, Label } from 'flowbite-react';
import { UserContext } from '../../contexts/userContext'
import { CommentContext } from '../../contexts/commentContext';

const AddCommentForm = ({ boatId }) => {
  const [commentData, setCommentData] = useState({
    comment: '',
    createdby: '',
    boat: `/api/boat/${boatId}`,
    createdAt: new Date(),
  });

  const { addComment } = useContext(CommentContext);
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setCommentData(prevData => ({
        ...prevData,
        createdby: `/api/users/${user.id}`,
      }));
    }
  }, [user, getUser, boatId]); 

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      comment: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addComment(commentData);
    setCommentData(prevData => ({ ...prevData, comment: '' }));
    // try {
    //   await sendRequest(`/api/comments`, 'POST', commentData);
    //   notify('Commentaire ajoutée avec succès', 'success');
    //   setCommentData(prevData => ({ ...prevData, comment: '' }));
    // } catch (error) {
    //   console.error('Erreur lors de l’ajout du commentaire :', error);
    //   notify('Erreur lors de l\'envoi du commentaire', 'error');
    // }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col mt-auto'>
      <div className="mb-2 block">
        <Label htmlFor="comment" value="Ton commentaire" />
      </div>
      <Textarea id='comment' value={commentData.comment} onChange={handleChange} rows={4} className="resize-none" placeholder='Ton commentaire' required />
      <Button className='w-full mt-2' color='blue' type='submit'>Envoyer</Button>
    </form>
  );
};

export default AddCommentForm;
