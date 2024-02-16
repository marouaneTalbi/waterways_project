import React, { createContext, useContext, useState } from 'react';
import sendRequest from '../services/axiosRequestFunction';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(localStorage.getItem('user'))

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
                    setUser(response);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    localStorage.setItem('user', JSON.stringify(response));
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
