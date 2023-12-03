import React, { useState } from "react";
import axios from "axios";
import sendRequest from "../../services/axiosRequestFunction";
import { useNavigate } from 'react-router-dom';

export default function MdpRestEmail() {
    const [email, setemail] = useState("");
    const [showResetPasswordMessage, setShowResetPasswordMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendRequest(
            '/api/mdpresetemail',
            'post',
            {
                email: email,
            },
            false
        ).then((response) => {
            setShowResetPasswordMessage(true)
        })

    };

    return (
        <div>
            {showResetPasswordMessage == false ? (
                <div className="bg-light-blue-100 p-4 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                className="p-2 border rounded"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-black p-2 rounded hover:bg-blue-600">
                            Envoyer
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-light-blue-100 p-4 rounded-lg shadow-md">
                    <h1>Un email vous a été envoyé</h1>
                </div>
            )}
        </div>
    );

}


