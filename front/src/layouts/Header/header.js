import React, { useContext, useEffect, useState } from 'react'
import WaterWaysLogo from '../../assets/svg/logo.svg'
import { jwtDecode } from "jwt-decode";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { isTokenExpired, checkIfRequestExists } from '../../services/axiosRequestFunction';
import NotificationIcon from './notif';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { UserContext } from '../../contexts/userContext';

export default function Header() {
    const [userRole, setUserRole] = useState(null);
    const [userProvider, setUserProvider] = useState(null);
    const [isValidToken, setIsValidToken] = useState(isTokenExpired());
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [hasPendingRequest, setHasPendingRequest] = useState(false);



    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.roles[0])
            const provider =  decoded.roles.find(role => role === 'ROLE_PROVIDER')
            setUserProvider(provider)
        }
    }, [token]);
    
    useEffect(() => {
        const checkRequestStatus = async () => {
          const exists = await checkIfRequestExists(); 
          setHasPendingRequest(exists);
        };
    
        if (userRole && !isValidToken) {
          checkRequestStatus();
        }
    }, [userRole, isValidToken]);

    const logout = () => {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        setUserRole(null);
        setIsValidToken(null);
        setUserProvider(null);
    }
    
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
                        <span className="mr-3 h-6 sm:h-9 text-xl" >🇫🇷</span>
                        <span className="mr-3 h-6 sm:h-9 text-xl" >🇬🇧</span>
                </Dropdown.Header>
                <Dropdown.Item href="/profile">PROFILE</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/notifications">Notifications&nbsp;<NotificationIcon /></Dropdown.Item>
                <Dropdown.Item onClick={logout}>LOGOUT</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
     
            <Navbar.Collapse>
            {
                    (!token ) && (

                        <>
                            <Navbar.Link href="/Login">LOGIN</Navbar.Link>
                            <Navbar.Link href="/Register">SIGN IN</Navbar.Link>
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
                        <Navbar.Link href="/provider"> PROVIDER</Navbar.Link>
                    )
                }
                {
                    userRole && !isValidToken && (
                        <>
                            <Navbar.Link href="/">MENU</Navbar.Link>
                            <Navbar.Link href="/search">SEARCH</Navbar.Link>
                            {
                            hasPendingRequest ?
                            <Navbar.Link href="/myrequest">Follow my request</Navbar.Link> :
                            <Navbar.Link href="/requestProvider">Request Provider</Navbar.Link>
                            }
                        </>
                    )
                }
            </Navbar.Collapse>
        </Navbar>
    )
}
