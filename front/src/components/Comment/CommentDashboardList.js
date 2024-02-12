import React, { useEffect, useContext, useState } from 'react';
import CommentItem from './CommentItem';
import { CommentContext } from '../../contexts/commentContext';
import Loader from '../Loader/Loader';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { BoatContext } from '../../contexts/boatContext';

const CommentsDashboardList = () => {
    const { getAllComments, allComments, deleteComment } = useContext(CommentContext)
    const { getUserById} = useContext(UserContext);
    const { getCurrentBoat } = useContext(BoatContext);
    const [users, setUsers] = useState({});
    const [boats, setBoats] = useState({});

    const deleteCurrentComment = (id) => {
        deleteComment(id).then((res) => {
            console.log(res)
            return res;
        })
    }

    useEffect(() => {
        getAllComments()
    }, [])

    useEffect(() => {
        if(allComments) {
            getAllComments().then(() => {
                const userIds = allComments.map(comment => comment.createdby.split('/').pop());
                const boatIds = allComments.map(comment => comment.boat.split('/').pop());
                const uniqueUserIds = [...new Set(userIds)];
                const uniqueBoatIds = [...new Set(boatIds)];
                uniqueUserIds.forEach(id => {
                    getUserById(id).then(user => {
                        setUsers(prevUsers => ({ ...prevUsers, [id]: user.firstname + ' ' + user.lastname }));
                    });
                });
                uniqueBoatIds.forEach(id => {
                    getCurrentBoat(id).then(boat => {
                        setBoats(prevBoats => ({ ...prevBoats, [id]: boat.name }));
                    });
                });
            });
        }
        
    }, [allComments]);

    return (
        <div className='flex flex-col gap-4 h-[590px] overflow-y-scroll overflow-x-hidden'>
            <div className="overflow-x-auto">
                <div className='mt-4 h-[200px]'>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Boat</Table.HeadCell>
                            <Table.HeadCell>Comment</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>User</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Supprimer</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y overflow-y-scroll w-full" style={{height: '50px'}}>
                        {
                            allComments && allComments.map((comment) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {comment && boats[comment.boat.split('/').pop()] || 'Chargement...'}
                                    </Table.Cell>
                                    <Table.Cell>{comment.comment}</Table.Cell>
                                    <Table.Cell>{comment.createdAt && new Date(comment.createdAt).toLocaleString()}</Table.Cell>
                                    <Table.Cell>{comment && users[comment.createdby.split('/').pop()] || 'Chargement...'}</Table.Cell>
                                    <Table.Cell>
                                        <div 
                                        // to={`//comments/${boat.id}`}
                                        onClick={()=>deleteCurrentComment(comment.id)} 
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Supprimer
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                        </Table.Body>
                    </Table>
                </div>
            </div> 
        </div>
    );
}

export default CommentsDashboardList;