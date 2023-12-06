import React, {useEffect, useState} from "react";
import sendRequest from "../../services/axiosRequestFunction";


export default function UserAdmin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        sendRequest(
            '/api/users',
            'get',
            {},
            true
        ).then((response) => {
            setUsers(response);
        })
    }, []);

    return (
        <div className="mt-8 mx-4">
            {
                <table className="min-w-full leading-normal">
                    <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Last name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            First name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Created At
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Verified
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
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
                    ))}
                    </tbody>
                </table>
            }
        </div>
    );



}