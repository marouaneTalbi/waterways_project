import React, { useState } from "react";
import axios from "axios";
import sendRequest from "../../services/axiosRequestFunction";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
        sendRequest(
            '/auth',
            'post',
            {
                email: email,
                password: password,
            },
             false
        ).then((response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('refresh_token', response.refresh_token);
            navigate('/');
        })
    };

    return (
        <div className="bg-red-400 flex flex-row">
            <form onSubmit={handleSubmit} className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                <label>Email</label>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <label>Mot de passe</label>
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
}


