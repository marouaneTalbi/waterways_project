import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../contexts/authContext";
import { Button, Card, Label, TextInput } from 'flowbite-react';

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
        <div className="flex justify-center w-full">
            <ToastContainer />
            <Card className="h-fit w-[95%] sm:w-[90%] md:w-[80%]">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <h3 className="font-semibold text-2xl">Se connecter</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Votre email" />
                        </div>
                        <TextInput id="email" type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Votre mot de passe" />
                        </div>
                        <TextInput id="password" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {/* <a href="/mdpResetEmail" onClick={() => navigate(('/mdpResetEmail'))}>Mot de passe oublié</a> */}
                    <Button type="submit" color="blue">Connexion</Button>
                </form>
            </Card>
        </div>
    )

}


