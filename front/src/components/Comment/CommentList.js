import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import sendRequest from "../../services/axiosRequestFunction";

const CommentsList = ({ boatId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const data = await sendRequest('/api/comments');
            const filteredComments = data.filter(comment => comment.boat == '/api/boat/'+boatId);
            setComments(filteredComments);
        };

        fetchComments();
    }, []);

    return (
        <div>
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentsList;