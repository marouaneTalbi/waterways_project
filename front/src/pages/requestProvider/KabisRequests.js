import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'flowbite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import sendRequest from "../../services/axiosRequestFunction";
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
    const [usersInfo, setUsersInfo] = useState({});
    const [showInput, setShowInput] = useState(false);
    const [complementText, setComplementText] = useState('');
    const [activeRequestId, setActiveRequestId] = useState(null); 

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                //const response = await sendRequest('/api/kbis');
                const response = await axios.get(`http://localhost:8888/api/kbis`);
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
            const response = await axios.put(`http://localhost:8888/api/kbis/${id}`, { status: newStatus });
            setRequests(requests.map(request => 
                request.id === id ? { ...request, status: newStatus } : request
            ));
            notify('Status updates', 'success');
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);
            notify('updaate failed', 'error');
        }
    };
    const sendEmailToUser = (email) => {
        const subject = encodeURIComponent("Demande de complément pour votre demande");
        const body = encodeURIComponent("Bonjour,\n\nNous avons besoin de compléments d'information concernant votre demande. Veuillez nous fournir les informations suivantes :\n\n...");
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };
    

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>;
    }

    const handleSubmitComplement = async () => {
        try {
          //await sendComplementEmail(activeRequestId, complementText);
          const response = await sendRequest('/api/notifications', 'POST', {title:"Demande de complement", message:complementText});
        } catch (error) {
          console.error("Erreur lors de l'envoi du complément :", error);
          notify('Erreur lors de la demande de complément.', 'error');
        } finally {
          setShowInput(false); 
          setComplementText(''); 
          setActiveRequestId(null); 
        }
      };
      
    return (
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
                        <li key={request.id} className="mb-3 p-3 border rounded shadow-sm hover:shadow-md transition duration-300">
                            <label className="font-medium">
                                <p className="text-white bg-blue-500 hover:bg-blue-700 transition duration-200 rounded px-4 py-2 mr-2">Staut : {mapStatusToText(request.status)}</p>
                                <a href={`http://localhost:8888/uploads/kbis/${request.name}`} download>
                                    <FontAwesomeIcon icon={faFilePdf} /> Télécharger Kbis
                                </a>
                                <p>
                                {request.createdby.firstname} {request.createdby.lastname}
                                  {request.createdby.isVerified ? 
                                   <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> : 
                                   <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                                  }
                                </p></label>
                            {request.status === 0  && (
                                <div className="mt-2">
                                    <button onClick={() => handleStatusChange(request.id, 1)} className="text-white bg-green-500 hover:bg-green-700 transition duration-200 rounded px-4 py-2 mr-2">Valider</button>
                                    <button onClick={async () => {
                                      await handleStatusChange(request.id, 2);
                                      sendEmailToUser(request.createdby.email);
                                    }} className="text-white bg-yellow-500 hover:bg-yellow-700 transition duration-200 rounded px-4 py-2 mr-2">Demander un complément</button> 
                                    
                                    <button onClick={() => {
                                     setShowInput(true);
                                     setActiveRequestId(request.id);
                                     handleStatusChange(request.id, 2);
                                    }} className="text-white bg-yellow-500 hover:bg-yellow-700 transition duration-200 rounded px-4 py-2 mr-2">Demander un complément 2</button>
                                   
                                    <button onClick={() => handleStatusChange(request.id, 3)} className="text-white bg-red-500 hover:bg-red-700 transition duration-200 rounded px-4 py-2">Refuser</button>
                                </div>
                            )}
                            {request.status === 2 && (
                                <div className="mt-2">
                                    <button onClick={() => handleStatusChange(request.id, 1)} className="text-white bg-green-500 hover:bg-green-700 transition duration-200 rounded px-4 py-2 mr-2">Valider</button>
                                    <button onClick={() => handleStatusChange(request.id, 3)} className="text-white bg-red-500 hover:bg-red-700 transition duration-200 rounded px-4 py-2">Refuser</button>
                                </div>
                            )}
                            {showInput && activeRequestId === request.id && (
                <div>
                    <p>
                        Message du demande de complement
                    </p>
                   <textarea
                     type="text"
                     value={complementText}
                     onChange={(e) => setComplementText(e.target.value)}
                     className="border rounded p-2"
                   />
                   <button onClick={handleSubmitComplement} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Envoyer
                   </button>
                </div>
                )}
                        </li>
                        
                    ))}
                </ul>
                
            </div>
    );
};

export default KabisRequests;