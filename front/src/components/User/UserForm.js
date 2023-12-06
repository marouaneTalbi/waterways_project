import React, { useContext } from 'react'
import { TextInput, Label, Button } from 'flowbite-react';
import { UserContext } from '../../contexts/userContext'

export default function UserForm({ onCloseModal }) {
    const { user, setUser, updateUser } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(user);
        onCloseModal();
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                user && (
                    <>
                        <div className="mb-2 block">
                            <Label htmlFor="nom" value="Nom" />
                        </div>
                        <TextInput
                            id="nom"
                            value={user.lastname}
                            onChange={(event) => setUser((prevUser) => ({ ...prevUser, lastname: event.target.value }))}
                            required
                        />

                        <div className="mb-2 block">
                            <Label htmlFor="prenom" value="Prenom" />
                        </div>
                        <TextInput
                            id="prenom"
                            value={user.firstname}
                            onChange={(event) => setUser((prevUser) => ({ ...prevUser, firstname: event.target.value }))}
                            required
                        />

                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            value={user.email}
                            onChange={(event) => setUser((prevUser) => ({ ...prevUser, email: event.target.value }))}
                            required
                        />

                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Telephone" />
                        </div>
                        <TextInput
                            id="phone"
                            value={user.phone}
                            type='number'
                            onChange={(event) => setUser((prevUser) => ({ ...prevUser, phone: event.target.value }))}
                        />
                        <div className="w-full">
                            <Button type='submit' color='red'>Modifier</Button>
                        </div> 
                    </>
                )
            }
        </form>
    )
}
