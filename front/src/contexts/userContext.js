import React, { useState, createContext } from 'react';
import userModel from './models/userModel';
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [highestRole, SethighestRole] = useState(null);
    const [userResults, setUserResults] = useState(null);
    const [satisfaction, setSatisfaction] = useState(null)

    const getUser = async () => {
        return userModel.get().then(res =>{
            const currentUser = res
            setUser({
                ...currentUser,
                fullName: `${currentUser.lastname} ${currentUser.firstname}`
            });
            SethighestRole(getHighestRole(currentUser.roles));
        })
    }

    const updateUser = async (userData) => {
        return userModel.update(user.id, userData).then(response => {
            setUser({
                ...response,
                fullName: `${response.lastname} ${response.firstname}`
            });
            SethighestRole(getHighestRole(response.roles));
        })
    }

    const getUserById = async (id) => {
        return userModel.getById(id)
    }

    const getHighestRole = (roles) => {
        const roleOrder = ["ROLE_ADMIN", "ROLE_PROVIDER", "ROLE_USER"];
        for (const role of roleOrder) {
            if (roles.includes(role)) {
                return role;
            }
        }
        return null;
    };

    const getRoleLabel = (role) => {
        switch (role) {
            case "ROLE_ADMIN":
                return "Administrateur";
            case "ROLE_USER":
                return "Client";
            case "ROLE_PROVIDER":
                return "Prestataire";
            default:
                return "";
        }
    };

    const searchUser = async (payload) => {
        return userModel.search(payload).then(response => {
            setUserResults(response);
        }).catch(error => {
            console.log(error)
        })
    }

    const getProviderSatisfaction = async (userId) => {
        return userModel.satisfaction(userId).then(response => {
            setSatisfaction(response)
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <UserContext.Provider value={{ user, setUser, getUser, updateUser, getRoleLabel, highestRole, getUserById, searchUser, userResults, getProviderSatisfaction, satisfaction }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
