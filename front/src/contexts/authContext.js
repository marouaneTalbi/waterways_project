import React, { createContext, useContext, useState } from 'react';
import sendRequest from '../services/axiosRequestFunction';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (email, password) => {
        try {
            return sendRequest(
                '/auth',
                'post',
                {
                    email: email,
                    password: password,
                },
                 false
            ).then((response) => {
                if(response) {
                    setToken(response.token)
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    return true;
                } else {
                    return false;
                }
            })
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <AuthContext.Provider value={{ token, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
