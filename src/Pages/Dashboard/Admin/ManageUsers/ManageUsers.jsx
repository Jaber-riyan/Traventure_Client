import React from 'react';
import Swal from 'sweetalert2';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ManageUsersCard from './ManageUsersCard/ManageUsersCard';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import UseAxiosNormal from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const navigate = useNavigate();

    const { refetch: refetchUsers, data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosInstanceSecure.get('/users');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="mb-10 dark:bg-gray-900 dark:text-gray-200 transition duration-300">
            <Helmet>
                <title>All Users | Traventure</title>
            </Helmet>
            
            {/* Section Title */}
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Manage <span className="text-orange-600 capitalize"> Users </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>

            {/* User Management Table */}
            <div className="px-12 py-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="cinzel-font flex justify-between mb-10 items-center">
                    <h2 className="text-[#151515] dark:text-gray-100 font-bold text-2xl">
                        Total Users: {users?.data?.length}
                    </h2>
                </div>

                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className="sticky top-0">
                                <tr className="bg-[#D1A054] dark:bg-gray-700 text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">EMAIL</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">LAST LOGIN</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">ROLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.data?.length > 0 ? (
                                    users?.data?.map((user, index) => (
                                        <ManageUsersCard key={user?._id} item={user} index={index} />
                                    ))
                                ) : (
                                    <tr className="text-3xl font-bold text-center text-red-600 dark:text-red-400">
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <h2 className="p-6">No User</h2>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
