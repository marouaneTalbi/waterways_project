import React, { useEffect, useState } from 'react'
import WaterWaysLogo from '../../assets/svg/logo.svg'
import { jwtDecode } from "jwt-decode";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { isTokenExpired, checkIfRequestExists } from '../../services/axiosRequestFunction';
import NotificationIcon from './notif';

export default function Header() {
    const [userRole, setUserRole] = useState(null);
    const [userProvider, setUserProvider] = useState(null);
    const token = localStorage.getItem('token');
    const [isValidToken, setIsValidToken] = useState(isTokenExpired());
    const [hasPendingRequest, setHasPendingRequest] = useState(false);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.roles[0])
            const provider =  decoded.roles.find(role => role === 'ROLE_PROVIDER')
            setUserProvider(provider)
        }
    }, [token, userRole]);
    
    useEffect(() => {
        const checkRequestStatus = async () => {
          const exists = await checkIfRequestExists(); 
          setHasPendingRequest(exists);
        };
    
        if (userRole && !isValidToken) {
          checkRequestStatus();
        }
      }, [userRole, isValidToken]);


    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <img src={WaterWaysLogo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">WaterWays</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                <Dropdown.Header>
                    <span className="block text-sm">Bonnie Green</span>
                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
            {
                    !userRole || isValidToken && (
                        <>
                            <Navbar.Link href="/Login">Login</Navbar.Link>
                            <Navbar.Link href="/Register">Register</Navbar.Link>
                        </>
                    )
                }
                {
                    userRole === 'ROLE_ADMIN' && !isValidToken && (
                        <>
                        <Navbar.Link href="/admin">Admin</Navbar.Link>
                        <Navbar.Link href="/Kabisrequests">Requests</Navbar.Link>
                        </>
                    )
                }
                {
                    userProvider === 'ROLE_PROVIDER' && !isValidToken && (
                        <Navbar.Link href="/provider">Provider</Navbar.Link>
                    )
                }
                {
                    userRole && !isValidToken && (
                        <>
                            <Navbar.Link href="/">Accueil</Navbar.Link>
                            <Navbar.Link href="/search">Rechercher</Navbar.Link>
                            {
                            hasPendingRequest ?
                            <Navbar.Link href="/myrequest">Suivre ma demande</Navbar.Link> :
                            <Navbar.Link href="/requestProvider">Request Provider</Navbar.Link>
                            }
                            <NotificationIcon />
                        </>
                    )
                }
            </Navbar.Collapse>
        </Navbar>
    )
}
