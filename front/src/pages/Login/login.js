import React, { useState } from "react";
import sendRequest from "../../services/axiosRequestFunction";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

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
        ).then((response) => {
            console.log(response)
            localStorage.setItem('token', response.token);
            localStorage.setItem('refresh_token', response.refresh_token);
            navigate('/');
        })
    };

    return (
        <div className="bg-light-blue-100 p-4 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="email">Emailllll</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
                <a href="/mdpResetEmail" onClick={() => navigate(('/mdpResetEmail'))}>Mot de passe oublié</a>
                <button  type="submit" className="bg-red-500 text-black p-2 rounded hover:bg-red-600">
                    Se connecter
                </button>

            </form>
        </div>
    )

}


