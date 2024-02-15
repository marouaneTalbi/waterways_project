import React, { useEffect, useContext, useState } from 'react';
import { CommentContext } from '../../contexts/commentContext';
import { Table } from 'flowbite-react';
import { UserContext } from '../../contexts/userContext';
import { BoatContext } from '../../contexts/boatContext';

const CommentsDashboardList = () => {
    const { getAllComments, allComments, deleteComment } = useContext(CommentContext)
    const { getUserById} = useContext(UserContext);
    const { getCurrentBoat } = useContext(BoatContext);

    const [users, setUsers] = useState({});
    const [boats, setBoats] = useState({});

    const deleteCurrentComment = (id) => {
        deleteComment(id);
    }

    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <div className=''>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Bateau
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Commentaire
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Utilisateur
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allComments && allComments.map((comment) => (
                                <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {comment && comment.boat.name}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{comment.comment}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{comment.createdAt && new Date(comment.createdAt).toLocaleString()}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{comment.createdby.firstname}</td>
                                    <td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div 
                                        // to={`//comments/${boat.id}`}
                                        onClick={()=>deleteCurrentComment(comment.id)} 
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Supprimer
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div> 
        </div>
    );
}

export default CommentsDashboardList;