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
            <ListGroup>
                {notifications.map((notification, index) => (
                    <ListGroup.Item key={index}>
                        <div className="flex justify-between">
                            <span>{notification.title}</span>
                            <span>{notification.created_at ? new Date(notification.created_at).toLocaleDateString() : ''}</span>
                        </div>
                        <p>{notification.message}</p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default NotificationsPage;
