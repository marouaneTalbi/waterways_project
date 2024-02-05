import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../contexts/authContext";

export default function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await login(email, password);
            if (success) {
                toast.success('Vous êtes Connecté !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate("/");
            }
        } catch (error) {
            toast.error("Username ou mot de passe incorrect", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <div className="bg-light-blue-100 p-4 rounded-lg shadow-md">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
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


