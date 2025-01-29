import React from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import ManageCandidatesCard from './ManageCandidatesCard/ManageCandidatesCard';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import UseCandidates from '../../../../Hooks/UseCandidates/UseCandidates';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';

const ManageCandidates = () => {
    const axiosInstanceSecure = UseAxiosSecure()
    const { requestedCandidates, requestedCandidatesLoading, requestedCandidatesRefetch } = UseCandidates()


    if (requestedCandidatesLoading) return <Loading></Loading>

    const handleAccepted = async (userRequest) => {
        // console.log(userRequest);
        Swal.fire({
            title: "Do you want to make this user as a Tour Guide?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.patch(`/tour/guide/accepted`, userRequest);
                console.log(data);
                if (data?.status) {
                    Swal.fire({
                        title: `${userRequest?.name} now is an Tour guide`,
                        icon: 'success',
                    })
                    requestedCandidatesRefetch()
                }
                else {
                    Swal.fire({
                        title: `${data?.message}`,
                        icon: 'info',
                    })
                }
            }
            // else if (result.isDenied) {
            //     Swal.fire("Work is not perform", "", "info");
            // }
        });
    }


    const handleRejected = async (id) => {
        // console.log(userRequest);
        Swal.fire({
            title: "Do you want to delete Tour Guide Request?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.delete(`/tour/guide/rejected/${id}`);
                console.log(data);
                if (data?.status) {
                    Swal.fire({
                        title: `${data?.message}`,
                        icon: 'success',
                    })
                    requestedCandidatesRefetch()
                }
                else {
                    Swal.fire({
                        title: `${data?.message}`,
                        icon: 'info',
                    })
                }
            }
            // else if (result.isDenied) {
            //     Swal.fire("Work is not perform", "", "info");
            // }
        });
    }



    return (
        <div className='mb-44 mt-7'>
            <Helmet><title>Candidates | Traventure</title></Helmet>
            <section className='mb-5'>
                <SectionTitle heading={"MANAGE CANDIDATES"} subHeading={"How Many Request?"}></SectionTitle>
            </section>
            <div className='px-12 py-10 bg-white'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total Request: {requestedCandidates.length}</h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className='sticky top-0'>
                                <tr className="bg-[#D1A054] text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">EMAIL</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ROLE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ACCEPTED</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">REJECTED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requestedCandidates.length > 0 ? requestedCandidates.map((requestUser, index) => {
                                        return <ManageCandidatesCard key={requestUser?._id} requestUser={requestUser} handleAccepted={handleAccepted} handleRejected={handleRejected} index={index}></ManageCandidatesCard>

                                    }) :

                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No Request</h2></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                }
                                {/* <ManageCandidatesCard requestUser={{ name: "Jaber Ahmed Riyan", role: "tourGuide", email: "jaber@gmail.com" }}></ManageCandidatesCard> */}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ManageCandidates;