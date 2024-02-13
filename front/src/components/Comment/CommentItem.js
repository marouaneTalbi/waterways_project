import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/userContext'

export default function CommentItem({ comment={} }) {
    const { getUserById } = useContext(UserContext);
    const [user, setUser] = useState('');
    const userId = comment.createdby.split('/').pop();
    useEffect(() => {
        getUserById(userId)
            .then(userData => {
                setUser(userData); 
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
            });
    }, [userId]);

    return (
        <div className='bg-white rounded-lg p-4 flex flex-col gap-4'>
            <div className='flex flex-row gap-4 items-center'>
                <img className='rounded-lg w-12 h-12' alt='user-picture' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />
                <div className='flex flex-col text-left justify-between'>
                    <span className='font-semibold'>{user.firstname} {user.lastname}</span>
                    <time className='text-sm text-gray-400'>{comment.date}</time>
                </div>
            </div>
            <p className='text-gray-500'>{comment.comment}</p>
        </div>
    );
}
