import React, { useState, useEffect } from 'react';
import sendRequest from "../../services/axiosRequestFunction";


export const NotificationIcon = () => {
    const [notificationCount, setNotificationCount] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await sendRequest('/api/notifications/count', 'GET');
                setNotificationCount(response.count); 
            } catch (error) {
                
                console.error("Erreur lors de la récupération du nombre de notifications :", error);
            }
        };
    
        fetchNotifications();
    }, []);

        return (
            <a href="/notifications">
               <div>
                <i className="notification-icon">🔔</i>
                {notificationCount > 0 && (
                    <span className="notification-count">{notificationCount}</span>
                )}
            </div> 
            </a>
            
        );
};

export default NotificationIcon;
