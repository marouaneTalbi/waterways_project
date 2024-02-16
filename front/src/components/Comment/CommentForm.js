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
  const [isLoading, setIsLoading] = useState(false);


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
    setIsLoading(true); 
    e.preventDefault();
    setCommentData(prevData => ({ ...prevData, comment: '' }));
    try {
        await addComment(commentData);
    } finally {
        setIsLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className='flex flex-col mt-auto'>
      <div className="mb-2 block">
        <Label htmlFor="comment" value="YOUR COMMENT"/>
      </div>
      <Textarea id='comment' value={commentData.comment} onChange={handleChange} rows={4} className="resize-none" placeholder="YOUR COMMENT" required />
        <Button className='w-full mt-2' color='blue' type='submit' disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'SEND'}
        </Button>
    </form>
  );
};

export default AddCommentForm;
