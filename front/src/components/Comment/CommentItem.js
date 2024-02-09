import React, { useState, useEffect } from 'react';
import sendRequest from "../../services/axiosRequestFunction";

export default function CommentItem({ comment={} }) {
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const fetchUserName = async () => {
            const userId = comment.createdby.split('/').pop();
            try {
                const userDetails = await sendRequest(`/api/users/${userId}`);
                setUserName(userDetails.firstname); 
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
            }
        };

        if (comment.createdby) {
            fetchUserName();
        }
    }, [comment.createdby]);

    return (
        <div className='bg-white rounded-lg p-4 flex flex-col gap-4'>
            <div className='flex flex-row gap-4 items-center'>
                <img className='rounded-lg w-12 h-12' alt='user-picture' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />
                <div className='flex flex-col text-left justify-between'>
                    <span className='font-semibold'>{userName}</span>
                    <time className='text-sm text-gray-400'>{comment.date}</time>
                </div>
            </div>
            <p className='text-gray-500'>{comment.comment}</p>
        </div>
    );
}
