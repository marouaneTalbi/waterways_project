import React from 'react';
import { Link } from 'react-router-dom'; 

const NotFoundPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', marginBottom: '40px' }}>500</h1>
      <h2>Oops! Erreur, veuillez ressayer plus tard.</h2>
      <p style={{ marginTop: '20px', fontSize: '18px', lineHeight: '1.6' }}>
        Nous rencontrons un probleme technique.
      </p>
      <Link to="/" style={{ display: 'inline-block', marginTop: '30px', padding: '10px 20px', backgroundColor: '#007bff', color: '#ffffff', borderRadius: '5px', textDecoration: 'none' }}>
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;