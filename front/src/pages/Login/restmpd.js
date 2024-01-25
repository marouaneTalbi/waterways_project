import React, { useState } from "react";
import sendRequest from "../../services/axiosRequestFunction";
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetMdp() {
    const [password, setPassword] = useState("");
    const [confirPassword, setConfirPassword] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password === confirPassword) {
            sendRequest(
                '/api/resetmdp',
                'post',
                {
                    password: password,
                    token:params.token
                },
                false
            ).then((response) => {
                navigate('/login');
                console.log(response)
            })
        }
    };

    return (
        <div>
            <div className="bg-light-blue-100 p-4 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
                    <div className="flex flex-col">
                        <label htmlFor="password">Confirmer le Mot de passe</label>
                        <input
                            id="confirPassword"
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={confirPassword}
                            onChange={(e) => setConfirPassword(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-black p-2 rounded hover:bg-blue-600">
                        Envoyer
                    </button>
                </form>
            </div>

        </div>
    );

}


