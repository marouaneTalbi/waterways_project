import React, { useState, createContext } from 'react';
import commentApi from './models/commentModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CommentContext = createContext(null);

const CommentProvider = ({ children }) => {
    const [boatComments, setBoatComments] = useState([]);
    const [allComments, setComments] = useState(null);


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
        return commentApi.getList(boatId).then(response => {
            setBoatComments(response);
        }).catch(error => {
            toast.success(`Nous n'avons pas pu récupérer les commentaires`);
        })
    }

    const getAllComments = async () => {
        return commentApi.getAll().then(response => {
            setComments(response);
        }).catch(error => {
            toast.success(`Nous n'avons pas pu récupérer les commentaires`);
        })
    }

    const deleteComment = async (id) => {
        return commentApi.delete(id).then(response => {
            toast.success(`Commentaire supprimé`);
            setComments(prevComments => prevComments.filter(comment => comment.id !== id));
        }).catch(error => {
            toast.error(`Nous n'avons pas pu récupérer les commentaires`);
        })
    }

    return (
        <CommentContext.Provider value={{deleteComment, addComment, boatComments, getBoatComments, getAllComments, allComments }}>
            <ToastContainer />
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;
