import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/login ", // Remplacez par l'URL de votre endpoint de connexion
        {
          username: username,
          password: password,
        }
      );
      // Gérez la réponse de l'API ici, par exemple en stockant le token dans le state de votre application
      console.log(response.data); // Affiche la réponse de l'API dans la console
    } catch (error) {
      // Gérez les erreurs potentielles ici
      console.error("Une erreur s'est produite : ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;
