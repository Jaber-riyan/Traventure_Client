import React from 'react';
import useAuth from '../../../../Hooks/UseAuth/UseAuth';
import UseUser from '../../../../Hooks/UseUser/UseUser';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ManageProfileTourGuide = () => {
    const { user } = useAuth();
    const { userData } = UseUser();
    return (
        <div>
            <Helmet><title>Profile | Traventure</title></Helmet>
            <section>
                {/* section title  */}
                <SectionTitle heading={"Tourist Information"} subHeading={""}></SectionTitle>
            </section>
            <div className='md:w-[50%] mx-auto bg-[#fe487f6c] rounded-xl p-10 mb-10'>
                {/* admin photo  */}
                <div className='flex justify-center mb-7'>
                    <img referrerPolicy="no-referrer" draggable={false} onContextMenu={(e) => e.preventDefault()} className='w-48 h-48 rounded-full border-4 border-blue-500 object-cover' src={user?.photoURL} alt="admin image" />
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
                <div className='flex justify-center gap-2'>
                    <Link to={`/dashboard/profile/edit`}>
                        <button className='bg-blue-500 px-7 py-3 hover:bg-white transition-all duration-500 hover:text-black rounded-xl text-white font-bold'>Edit</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ManageProfileTourGuide;