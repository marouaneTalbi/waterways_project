import React, { useState, createContext } from 'react';
import commentApi from './models/commentModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CommentContext = createContext(null);

const CommentProvider = ({ children }) => {
    const [boatComments, setBoatComments] = useState(null);

    const addComment = async (commentData) => {
        return commentApi.add(commentData).then(response => {
            setBoatComments(prevComments => [...prevComments, response]);
            toast.success(`Votre commentaire a bien été enregistré`);
        }).catch(error => {
            console.error(error);
            toast.error(`Votre commentaire n'a pas été enregistré`);
        });
    };

    const getBoatComments = async (boatId) => {
        return commentApi.getList().then(response => {
            const filteredComments = response.filter(comment => comment.boat == '/api/boat/'+boatId);
            setBoatComments(filteredComments);
        }).catch(error => {
            toast.success(`Nous n'avons pas pu récupérer les commentaires`);
        })
    }

    return (
        <CommentContext.Provider value={{ addComment, boatComments, getBoatComments }}>
            <ToastContainer />
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;
