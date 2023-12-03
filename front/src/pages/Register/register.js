import React, { useState } from 'react';
import axios from "axios";
import sendRequest from "../../services/axiosRequestFunction";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest(
      '/api/users',
      'post',
      {
        email: email,
        plainPassword: password,
        firstname: firstname,
        lastname: lastname
      },
      false
    ).then(response =>
        navigate("/Login"))
      .catch(error => console.error("Erreur lors de l'inscription:", error));
  };

  return (
    <div>
      <h2>Page d'inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </div>
        <div>
          <label>Prenom :</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </div>
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
