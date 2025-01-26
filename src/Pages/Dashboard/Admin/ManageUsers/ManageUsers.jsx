import React from 'react';
import Swal from 'sweetalert2';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ManageUsersCard from './ManageUsersCard/ManageUsersCard';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import UseAxiosNormal from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import Loading from '../../../Shared/Loading/Loading';

const ManageUsers = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const navigate = useNavigate();


    const { refetch: refetchUsers, data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosInstanceSecure.get('/users');
            // console.log(res.data);
            return res.data;
        }
    })

    if(isLoading) return <Loading></Loading>


    return (
        <div className='mb-10'>
            <section className='mb-5'>
                <SectionTitle heading={"MANAGE ALL USERS"} subHeading={"How Many"}></SectionTitle>
            </section>
            <div className='px-12 py-10 bg-white'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total Users: {users?.data?.length}</h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className='sticky top-0'>
                                <tr className="bg-[#D1A054] text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">EMAIL</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">LAST LOGIN</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">ROLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.data?.length > 0 ? users?.data?.map((user, index) => {
                                        return <ManageUsersCard key={user?._id} item={user} index={index}></ManageUsersCard>

                                    }) :

                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No User</h2></td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;