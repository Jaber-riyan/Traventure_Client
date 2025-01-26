import React from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import ManageCandidatesCard from './ManageCandidatesCard/ManageCandidatesCard';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const ManageCandidates = () => {
    const axiosInstanceSecure = UseAxiosSecure()



    const handleMakeRole = async (user) => {
        Swal.fire({
            title: "Do you want to make this user Admin?",
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.patch(`/users/admin/${user?._id}`);
                if (data?.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: `${user?.name} is an Admin now`,
                        icon: 'success',
                    })
                    // refetchUsers()
                }
                else {
                    Swal.fire({
                        title: `${user?.name} is already Admin`,
                        icon: 'success',
                    })
                }
            }
            // else if (result.isDenied) {
            //     Swal.fire("Work is not perform", "", "info");
            // }
        });
    }
    return (
        <div className='mb-10 h-screen mt-7'>
            <section className='mb-5'>
                <SectionTitle heading={"MANAGE CANDIDATES"} subHeading={"How Many Request?"}></SectionTitle>
            </section>
            <div className='px-12 py-10 bg-white'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total Request: 0</h2>
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
                                {/* {
                                    users?.data?.length > 0 ? users?.data?.map((user, index) => {
                                        return <ManageCandidatesCard key={user?._id} item={user} index={index}></ManageCandidatesCard>

                                    }) :

                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No User</h2></td>
                                        </tr>
                                } */}
                                <ManageCandidatesCard requestUser={{name: "Jaber Ahmed Riyan", role:"tourGuide", email:"jaber@gmail.com"}}></ManageCandidatesCard>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ManageCandidates;