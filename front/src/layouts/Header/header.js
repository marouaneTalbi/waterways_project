import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import WaterWaysLogo from '../../assets/svg/logo.svg'
import { jwtDecode } from "jwt-decode";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

export default function Header() {
    const [userRole, setUserRole] = useState(null);
    const [userProvider, setUserProvider] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.roles[0])
            const provider =  decoded.roles.find(role => role === 'ROLE_PROVIDER')
            setUserProvider(provider)
        }
    }, [token, userRole]);


    return (
        // <header>
        //     <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 fixed z-20 top-0 left-0 w-full">
        //         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        //             <Link to="/" className="flex items-center">
        //                 <img src={WaterWaysLogo} className="h-8 mr-3" alt="WaterWays Logo" />
        //                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WaterWays</span>
        //             </Link>
        //             <div className="flex items-center md:order-2">
        //                 <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        //                     <span className="sr-only">Open user menu</span>
        //                     <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user" />
        //                 </button>
                        
        //                 <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        //                     <div className="px-4 py-3">
        //                         <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
        //                         <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        //                     </div>
        //                     <ul className="py-2" aria-labelledby="user-menu-button">
        //                         <li>
        //                             <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
        //                         </li>
        //                         <li>
        //                             <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
        //                         </li>
        //                         <li>
        //                             <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //                 <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        //                     <span className="sr-only">Open main menu</span>
        //                     <svg className="w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        //                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        //                     </svg>
        //                 </button>
        //             </div>
        //             <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        //                 <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //                     {
        //                         userRole && (
        //                             <>
        //                                 <li>
        //                                     <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Accueil</Link>
        //                                 </li>
        //                                 <li>
        //                                     <Link to="/search" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Rechercher</Link>
        //                                 </li>


        //                             </>
        //                         )

        //                     }
        //                     {
        //                         userRole === 'ROLE_ADMIN' && (
        //                             <li>
        //                                 <Link to="/admin" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin</Link>
        //                             </li>
        //                         )
        //                     }

        //                     {!userRole && (
        //                             <>
        //                                 <li>
        //                                     <Link to="/Login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
        //                                 </li>
        //                                 <li>
        //                                     <Link to="/Register" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
        //                                 </li>
        //                             </>
        //                         )

        //                     }

        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </header>
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
                    !userRole && (
                        <>
                            <Navbar.Link href="/Login">Login</Navbar.Link>
                            <Navbar.Link href="/Register">Register</Navbar.Link>
                        </>
                    )
                }
                {
                    userRole == 'ROLE_ADMIN' && (
                        <Navbar.Link href="/admin">Admin</Navbar.Link>
                    )
                }
                {
                    userProvider == 'ROLE_PROVIDER' && (
                        <Navbar.Link href="/provider">Provider</Navbar.Link>
                    )
                }
                {
                    userRole && (
                        <>
                            <Navbar.Link href="/">Accueil</Navbar.Link>
                            <Navbar.Link href="/search">Rechercher</Navbar.Link>
                        </>
                    )
                }
            </Navbar.Collapse>
        </Navbar>
    )
}
