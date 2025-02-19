import React from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import ManageCandidatesCard from './ManageCandidatesCard/ManageCandidatesCard';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import UseCandidates from '../../../../Hooks/UseCandidates/UseCandidates';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';

const ManageCandidates = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const { requestedCandidates, requestedCandidatesLoading, requestedCandidatesRefetch } = UseCandidates();

    if (requestedCandidatesLoading) return <Loading></Loading>;

    const handleAccepted = async (userRequest) => {
        Swal.fire({
            title: "Do you want to make this user a Tour Guide?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.patch(`/tour/guide/accepted`, userRequest);
                if (data?.status) {
                    Swal.fire({
                        title: `${userRequest?.name} is now a Tour Guide`,
                        icon: 'success',
                    });
                    requestedCandidatesRefetch();
                } else {
                    Swal.fire({
                        title: `${data?.message}`,
                        icon: 'info',
                    });
                }
            }
        });
    };

    const handleRejected = async (id) => {
        Swal.fire({
            title: "Do you want to delete the Tour Guide request?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.delete(`/tour/guide/rejected/${id}`);
                if (data?.status) {
                    Swal.fire({
                        title: `${data?.message}`,
                        icon: 'success',
                    });
                    requestedCandidatesRefetch();
                } else {
                    Swal.fire({
                        title: `${data?.message}`,
                        icon: 'info',
                    });
                }
            }
        });
    };

    return (
        <div className='mb-44 mt-7'>
            <Helmet><title>Candidates | Traventure</title></Helmet>
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Manage <span className="text-orange-600 capitalize">Candidates </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>
            <div className='px-12 py-10 bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg shadow-md'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] dark:text-gray-200 font-bold text-2xl'>
                        Total Requests: {requestedCandidates.length}
                    </h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed border border-gray-300 dark:border-gray-700">
                            <thead className='sticky top-0 bg-[#D1A054] dark:bg-gray-800 text-white'>
                                <tr>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">EMAIL</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ROLE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ACCEPTED</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">REJECTED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestedCandidates.length > 0 ? (
                                    requestedCandidates.map((requestUser, index) => (
                                        <ManageCandidatesCard 
                                            key={requestUser?._id} 
                                            requestUser={requestUser} 
                                            handleAccepted={handleAccepted} 
                                            handleRejected={handleRejected} 
                                            index={index} 
                                        />
                                    ))
                                ) : (
                                    <tr className='text-3xl font-bold text-center text-red-600 dark:text-red-400'>
                                        <td></td>
                                        <td></td>
                                        <td><h2 className='p-6'>No Requests</h2></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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

export default ManageCandidates;
