import React, { useState, createContext } from 'react';
import noteApi from './models/noteModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NoteContext = createContext(null);

const NoteProvider = ({ children }) => {
    const [ratings, setRatings] = useState({
        proprete: null,
        confort: null,
        performance: null,
        equipement: null,
    });

    const getBoatNotes = async (boatId) => {
        return noteApi.getNotesList().then(response => {
            const filteredNotes = response.filter(note => note.boat === `/api/boat/${boatId}`);
            const averages = filteredNotes.reduce((acc, note) => {
                acc.proprete += note.proprete;
                acc.confort += note.confort;
                acc.performance += note.performance;
                acc.equipement += note.equipement;
                return acc;
            }, { proprete: 0, confort: 0, performance: 0, equipement: 0 });

            const numNotes = filteredNotes.length;

            if (numNotes > 0) {
                setRatings({
                    proprete: averages.proprete / numNotes,
                    confort: averages.confort / numNotes,
                    performance: averages.performance / numNotes,
                    equipement: averages.equipement / numNotes,
                });
            }
        }).catch(error => {
            console.error(error)
        })
    }

    function getPercentage(ratings) {
        console.log(ratings);
        const maxRating = 5;
        const percent = (ratings / maxRating) * 100;
        return percent.toFixed(2);
    }

    function getBoatSumNote(ratings) {
        const numCategories = Object.keys(ratings).length;
        const sum = ratings.proprete + ratings.confort + ratings.performance + ratings.equipement;
        return sum / numCategories;
    }

    return (
        <NoteContext.Provider value={{ getBoatNotes, ratings, getBoatSumNote, getPercentage }}>
            <ToastContainer />
            {children}
        </NoteContext.Provider>
    );
}

export default NoteProvider;
