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
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                toast.success('Vous êtes Connecté !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false);
                navigate("/");
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Username ou mot de passe incorrect", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <div className="flex justify-center bg-hero-pattern absolute top-0 left-0 w-screen h-screen bg-cover bg-bottom bg-no-repeat pt-10">
            <ToastContainer />
            <Card className="h-fit w-[90%] sm:w-[80%] md:w-[60%] bg-opacity-70">
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
                    <Button type="submit" color="blue" disabled={isLoading}>{isLoading ? 'Connexion...' : 'Connexion'}</Button>
                </form>
            </Card>
        </div>
    )

}


