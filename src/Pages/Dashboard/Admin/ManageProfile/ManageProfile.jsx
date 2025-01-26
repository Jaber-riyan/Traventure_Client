import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../../Hooks/UseAuth/UseAuth';
import { MdLocalShipping } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';
import { AiOutlineProduct } from "react-icons/ai";
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { Link } from 'react-router-dom';
import UseUser from '../../../../Hooks/UseUser/UseUser';




const ManageProfile = () => {
    const { user } = useAuth();
    const { userData } = UseUser();



    return (
        <div className='mt-10'>
            <section>
                {/* section title  */}
                <SectionTitle heading={"Admin States"} subHeading={""}></SectionTitle>
            </section>
            {/* admin states  */}
            <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-5'>
                {/* Revenue Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <GiWallet color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>10000</h2>
                        <p className='text-white text-xl'>Total Payment</p>
                    </div>
                </div>

                {/* Customers Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <FaUsers color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>3</h2>
                        <p className='text-white text-xl'>Total Tour Guides</p>
                    </div>
                </div>

                {/* Products Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <AiOutlineProduct color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>6</h2>
                        <p className='text-white text-xl'>Packages</p>
                    </div>
                </div>

                {/* Orders Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <MdLocalShipping color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>7</h2>
                        <p className='text-white text-xl'>Total Clients</p>
                    </div>
                </div>

                {/* Stories Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <MdLocalShipping color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>10</h2>
                        <p className='text-white text-xl'>Total Stories</p>
                    </div>
                </div>
            </section>

            {/* admin information  */}
            <section>
                {/* section title  */}
                <SectionTitle heading={"Admin Information"} subHeading={""}></SectionTitle>
            </section>
            <div className='md:w-[50%] mx-auto bg-[#fe487f6c] rounded-xl p-10 mb-10'>
                {/* admin photo  */}
                <div className='flex justify-center mb-7'>
                    <img draggable={false} onContextMenu={(e) => e.preventDefault()} className='w-48 h-48 rounded-full border-4 border-blue-500' src={user?.photoURL} alt="admin image" />
                </div>
                {/* name and email section  */}
                <div className='md:flex justify-between mb-3'>
                    <h2 className='font-bold cinzel-font'>Name: {userData?.name} </h2>
                    <h3 className='font-bold cinzel-font'>Email: {userData?.email}</h3>
                </div>
                {/* role and last seen section  */}
                <div className='md:flex justify-between mb-5'>
                    <h2 className='font-bold cinzel-font'>Role: {userData?.role}</h2>
                    <h2 className='font-bold cinzel-font'>last Seen: {userData?.lastLoginTime}</h2>
                </div>
                {/* edit button for editing profile  */}
                <div className='flex justify-center'>
                    <Link to={`/dashboard/admin/profile/edit`}>
                        <button className='bg-blue-500 px-7 py-3 hover:bg-white transition-all duration-500 hover:text-black rounded-xl text-white font-bold'>Edit</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;