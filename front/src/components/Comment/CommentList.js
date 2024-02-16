import React, { useEffect, useContext } from 'react';
import CommentItem from './CommentItem';
import { CommentContext } from '../../contexts/commentContext';
import Loader from '../Loader/Loader';

const CommentsList = ({ boatId }) => {
    const { boatComments, getBoatComments } = useContext(CommentContext)

    useEffect(() => {
        getBoatComments(boatId)
    }, [])

    return (
        <div className='flex flex-col gap-4 h-[590px] overflow-y-scroll overflow-x-hidden'>
            {
                boatComments == null ? (
                    <Loader />
                ) : (
                    boatComments.map((comment, index) => {
                        return (<CommentItem key={comment.id} comment={comment} />)
                    })
                )
            }
        </div>
    );
}

export default CommentsList;