import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'flowbite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import sendRequest from "../../services/axiosRequestFunction";
import 'react-toastify/dist/ReactToastify.css';
import { TranslationContext } from '../../contexts/translationContext';


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
    const [showInput, setShowInput] = useState(false);
    const [complementText, setComplementText] = useState('');
    const [activeRequestId, setActiveRequestId] = useState(null); 
    const { translations  } = useContext(TranslationContext);


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await sendRequest('/api/kbis');
                setRequests(response);
            } catch (error) {
                console.error( translations.request_error, error);
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
                return translations.confirm;
            case 2:
                return translations.additional_info;
            case 3:
                return translations.refused_request;
            default:
                return translations.wating_valiation;
        }
    };
    const handleStatusChange = async (id, newStatus) => {
        try {
            await sendRequest(`/api/kbis/${id}`, 'PUT', { status: newStatus });
          
            setRequests(requests.map(request => 
                request.id === id ? { ...request, status: newStatus } : request
            ));
            notify(translations.status_success, 'success');
        } catch (error) {
            notify(translations.status_error, 'error');
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
          await sendRequest('/api/notifications', 'POST', {title:"Demande de complement", message:complementText});
        } catch (error) {
          console.error("Erreur lors de l'envoi du complément :", error);
          notify(translations.additional_info_error, 'error');
        } finally {
          setShowInput(false); 
          setComplementText(''); 
          setActiveRequestId(null); 
        }
      };
      
    return (
        <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{translations.list_provider_request}</h1>
                <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">{translations.filter_status}</label>
                  <select
                    id="statusFilter"
                    className="border rounded p-2"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">{translations.all}</option>
                    <option value="1">{translations.validated}</option>
                    <option value="2">{translations.aditional_compliment}</option>
                    <option value="3">{translations.refused}</option>
                    <option value="0">{translations.wating}</option>
                  </select>
                </div>
                <ul>
                 {filteredRequests.map(request => (
                        <li key={request.id} className="mb-3 p-3 border rounded shadow-sm hover:shadow-md transition duration-300">
                            <label className="font-medium">
                                <p className="text-white bg-blue-500 hover:bg-blue-700 transition duration-200 rounded px-4 py-2 mr-2">Staut : {mapStatusToText(request.status)}</p>
                                <a href={`http://localhost:8888/uploads/kbis/${request.name}`} download>
                                    <FontAwesomeIcon icon={faFilePdf} /> {translations.downlod_kbis}
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
                                    }} className="text-white bg-yellow-500 hover:bg-yellow-700 transition duration-200 rounded px-4 py-2 mr-2">{translations.compliment_request}</button> 
                                    
                                    <button onClick={() => {
                                     setShowInput(true);
                                     setActiveRequestId(request.id);
                                     handleStatusChange(request.id, 2);
                                    }} className="text-white bg-yellow-500 hover:bg-yellow-700 transition duration-200 rounded px-4 py-2 mr-2"> {translations.compliment_request} 2</button>
                                   
                                    <button onClick={() => handleStatusChange(request.id, 3)} className="text-white bg-red-500 hover:bg-red-700 transition duration-200 rounded px-4 py-2">{translations.refuse}</button>
                                </div>
                            )}
                            {request.status === 2 && (
                                <div className="mt-2">
                                    <button onClick={() => handleStatusChange(request.id, 1)} className="text-white bg-green-500 hover:bg-green-700 transition duration-200 rounded px-4 py-2 mr-2">{translations.accept}</button>
                                    <button onClick={() => handleStatusChange(request.id, 3)} className="text-white bg-red-500 hover:bg-red-700 transition duration-200 rounded px-4 py-2">{translations.refuse}</button>
                                </div>
                            )}
                            {showInput && activeRequestId === request.id && (
                <div>
                    <p>
                        {translations.aditional_compliment_message}
                    </p>
                   <textarea
                     type="text"
                     value={complementText}
                     onChange={(e) => setComplementText(e.target.value)}
                     className="border rounded p-2"
                   />
                   <button onClick={handleSubmitComplement} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {translations.send}
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