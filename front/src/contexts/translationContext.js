import { useState, useEffect, useContext, createContext, useCallback } from 'react';
import sendRequest from '../services/axiosRequestFunction';
import { UserContext } from '../contexts/userContext'

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr');
    const [translations, setTranslations] = useState();

    useEffect(() => {
       if(!translations){
        sendRequest(`/translations?lang=${language}`, 'get', {}, true)
        .then((data) => {
            setTranslations(data);
        }).catch((error) => {
            console.log(error);
        });
       }
    }, [language]);

    const fetchTranslations = async () => {
        sendRequest(`/translations?lang=${language}`, 'get', {}, true)
        .then((data) => {
            setTranslations(data);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <TranslationContext.Provider value={{ translations, setLanguage, fetchTranslations }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslations must be used within a TranslationProvider');
    }
    return context;
};
