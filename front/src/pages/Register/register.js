import React, { useState } from 'react';
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/register ", // Remplacez par l'URL de votre endpoint de connexion
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data); // Affiche la réponse de l'API dans la console
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    }
  };

  return (
    <div>
      <h2>Page d'inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
