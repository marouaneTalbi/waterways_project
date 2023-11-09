import React, { useState } from "react";
import axios from "axios";
import {apiCall} from "../../services/api";
import sendRequest from "../../services/axiosRequestFunction";


export default function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendRequest(
            '/auth',
            'post',
            {
                email: email,
                password: password,
            },
             false
        )
        localStorage.setItem('token', token);
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


