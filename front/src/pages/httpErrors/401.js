import React from 'react';
import { Link } from 'react-router-dom'; 

const NotFoundPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', marginBottom: '40px' }}>403</h1>
      <h2>Oops! Vous etes non autorisé a consulter cet page !</h2>
      <p style={{ marginTop: '20px', fontSize: '18px', lineHeight: '1.6' }}>
        Nous ne pouvons pas acceder la page que vous cherchez.
        Il se pourrait qu'elle ait été supprimée ou que l'URL ait été mal saisie.
      </p>
      <Link to="/" style={{ display: 'inline-block', marginTop: '30px', padding: '10px 20px', backgroundColor: '#007bff', color: '#ffffff', borderRadius: '5px', textDecoration: 'none' }}>
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;