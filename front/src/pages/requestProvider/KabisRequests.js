import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'flowbite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };


const KabisRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('0');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8888/api/kabis');
                setRequests(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des demandes :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const filteredRequests = filterStatus
    ? requests.filter(request => request.status.toString() === filterStatus)
    : requests;

    function mapStatusToText(status) {
        switch (status) {
            case 1:
                return 'Validé';
            case 2:
                return 'Demander de complément';
            case 3:
                return 'Demande refusé';
            default:
                return 'En attente de validation';
        }
    };
    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:8888/api/kabis/${id}`, { status: newStatus });
            setRequests(requests.map(request => 
                request.id === id ? { ...request, status: newStatus } : request
            ));
            notify('Status updates', 'success');
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);
            notify('updaate failed', 'error');
        }
    };
    
     

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <><div className="container mx-auto p-4">
            <ToastContainer />
        </div>
        <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Liste des demandes pour devenir prestataire</h1>
                <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">Filtrer par statut:</label>
                  <select
                    id="statusFilter"
                    className="border rounded p-2"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">Tous</option>
                    <option value="1">Validé</option>
                    <option value="2">Demande de complément</option>
                    <option value="3">Refusé</option>
                    <option value="0">En attente</option>
                  </select>
                </div>
                <ul>
                 {filteredRequests.map(request => (
                   // {requests.map(request => (
                        <li key={request.id} className="mb-3 p-3 border rounded shadow-sm hover:shadow-md transition duration-300">
                            <p className="font-medium">
                                <p className="text-white bg-blue-500 hover:bg-blue-700 transition duration-200 rounded px-4 py-2 mr-2">Staut : {mapStatusToText(request.status)}</p>
                                <a href={`http://localhost:8888/public/uploads/kabis/${request.name}`} download>
                                    <FontAwesomeIcon icon={faFilePdf} /> Télécharger Kbis
                                </a>
                                <p>
                                {request.userFirstname} {request.userLastname} 
                                  {request.isVerified ? 
                                   <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> : 
                                   <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                                  }
                                </p></p>
                            {request.status === 0 && (
                                <div className="mt-2">
                                    <button onClick={() => handleStatusChange(request.id, 1)} className="text-white bg-green-500 hover:bg-green-700 transition duration-200 rounded px-4 py-2 mr-2">Valider</button>
                                    <button onClick={() => handleStatusChange(request.id, 2)} className="text-white bg-yellow-500 hover:bg-yellow-700 transition duration-200 rounded px-4 py-2 mr-2">Demander un complément</button>
                                    <button onClick={() => handleStatusChange(request.id, 3)} className="text-white bg-red-500 hover:bg-red-700 transition duration-200 rounded px-4 py-2">Refuser</button>
                                </div>
                            )}
                        </li>
                   // ))}
                    ))}
                </ul>
            </div></>
    );
};

export default KabisRequests;