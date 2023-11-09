import React, { useState } from "react";
import axios from "axios";


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8888/api/login ",
                {
                    username: username,
                    password: password,
                }
            );
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);
        } catch (error) {
            console.error("Une erreur s'est produite : ", error);
        }
    };

    return (
        <div className="bg-red-400 flex flex-row">
            <form onSubmit={handleSubmit} className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                <label>Email</label>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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


