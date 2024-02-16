import React, { useState, useEffect } from 'react';
import sendRequest from "../../services/axiosRequestFunction";
import { ListGroup } from 'flowbite-react';

export const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await sendRequest('/api/notifications', 'GET');
                setNotifications(response); 
            } catch (error) {
                console.error("Erreur lors de la récupération des notifications :", error);
            }
        };
    
        fetchNotifications();
    }, []);

    return (
        <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-5">Vos Notifications</h1>
    <div className="divide-y divide-gray-200">
        {notifications.map((notification, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{notification.title}</h2>
                    <span className="text-sm text-gray-500">
                        {notification.created_at ? new Date(notification.created_at).toLocaleDateString('fr-FR') : ''}
                    </span>
                </div>
                <p className="mt-2 text-gray-600">{notification.message}</p>
            </div>
        ))}
    </div>
</div>

    );
};

export default NotificationsPage;
