import React, { useState, useEffect } from 'react';
import { Card, Timeline } from 'flowbite-react';
import sendRequest from "../../services/axiosRequestFunction";

const MyRequest = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sendRequest('/api/kbis/me', 'GET');
                setResponse(response); 
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
                setError(error);
            }
        };

        fetchData();
    }, []);
    const statusTexts = {
      "0": "En attente",
      "1": "Validé",
      "2": "Demande de complément",
      "3": "Refusé"
    };
  

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Suivi de ma Demande pour Devenir Prestataire</h1>
            <Card>
                {error ? (
                   <p>Vous n'avez aucune demande en cours.</p>
                ) :response ? (
                    <Timeline>
                        <Timeline.Item>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Title>Demande recu le {response.created_at.split('T')[0]}</Timeline.Title>
                                <Timeline.Body>
                                    Votre <a href={`${process.env.REACT_APP_SERVER}uploads/kbis/${response.name}`} download>Kbis</a> a été reçue.
                                </Timeline.Body>
                            </Timeline.Content>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Time>{response.created_at.split('T')[0]}</Timeline.Time>
                                <Timeline.Title>Votre demande est en cours de traitement</Timeline.Title>
                                <Timeline.Body>
                                    {response.createdby.firstname} {response.createdby.lastname} votre demande est actuellement en cours de traitement.
                                </Timeline.Body>
                            </Timeline.Content>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Title>Statut de votre demande</Timeline.Title>
                                <Timeline.Body>
                                   {statusTexts[response.status.toString()] || 'Statut inconnu'}                                </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
                    </Timeline>
                ) : (
                    <p>Chargement des données...</p>
                )}
            </Card>
        </div>
    );
};

export default MyRequest;
 