'use client';
import React, {useEffect, useContext} from "react";
import CommentProvider from "../../contexts/commentContext";
import BoatProvider from "../../contexts/boatContext";
import { UserContext } from "../../contexts/userContext";
import Loader from "../../components/Loader/Loader";
import { Table } from 'flowbite-react';
import CommentsDashboardList from '../../components/Comment/CommentDashboardList';

export default function UserAdmin() {
    const { getUsers, users } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, []);

    return (
        // <>
        //     <CommentProvider>
        //         <BoatProvider>
        //             {/* <CommentsDashboardList /> */}
        //         </BoatProvider>
        //     </CommentProvider>
        
        // </>
        <div className="grid md:grid-cols-4 grid-cols-1 md:grid-rows-4 grid-rows-8 gap-4 w-full h-[1900px] md:h-auto">
            <div className="col-span-2 row-span-2 bg-white rounded border-2 border-gray-100 p-4">
                <div className="overflow-x-auto mt-4">
                <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                EMAIL
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                LASTNAME
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                FIRSTNAME
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                USER
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                VERIFY
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users == null ? (
                                <Loader />
                            ) : (
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{user.lastname || 'N/A'}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{user.firstname || 'N/A'}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${user.isVerified ? "bg-green-200" : "bg-red-200"}`}>
                                                <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${user.isVerified ? "bg-green-200" : "bg-red-200"}`}></span>
                                                <span className="relative">{user.isVerified ? "Vérifié" : "Non vérifié"}</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-span-2 row-span-2 col-start-3 bg-white rounded border-2 border-gray-100 p-4">
              <div className="overflow-x-auto">
                <CommentProvider>
                  <BoatProvider>
                     <CommentsDashboardList />
                 </BoatProvider>
              </CommentProvider>
              </div>
            </div>
            <div className="col-span-2 row-span-2 row-start-3 bg-white rounded border-2 border-gray-100 p-4">
                {/* RESERVATION LIST */}
            </div>
            <div className="col-span-2 row-span-2 col-start-3 row-start-3-4 bg-white rounded border-2 border-gray-100 p-4">
                {/* I DON'T KNOW */}
            </div>
        </div>
    );



}