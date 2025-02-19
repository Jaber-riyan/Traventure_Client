import React from 'react';
import useAuth from '../../../../Hooks/UseAuth/UseAuth';
import UseUser from '../../../../Hooks/UseUser/UseUser';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { BsGlobe, BsTelephoneFill } from "react-icons/bs";
import { MdLocationPin, MdEmail } from "react-icons/md";
import UseAdmin from '../../../../Hooks/UseAdmin/UseAdmin';

const ManageProfileTourGuide = () => {
    const { user } = useAuth();
    const { userData } = UseUser();
    const { role } = UseAdmin()

    return (
        <div>
            <Helmet><title>Profile | Traventure</title></Helmet>
            <div className="text-center py-8 mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Information of <span className="text-orange-600 capitalize"> {role} </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>


            <div className={` min-h-screen`}>
                <div className=" mx-auto -mt-16 p-6 flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    {/* Profile Image */}
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 mx-auto md:mx-0">
                        <img referrerPolicy="no-referrer" draggable={false} onContextMenu={(e) => e.preventDefault()} className='w-48 h-48 rounded-full border-4 border-blue-500 object-cover' src={user?.photoURL} alt="admin image" />
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 mt-6 md:mt-0 md:ml-6 dark:text-white">
                        {/* edit button for editing profile  */}
                        <div className='flex gap-3'>
                            <h1 className="text-3xl font-bold">{userData?.name}</h1>
                            <Link to={`/dashboard/profile/edit`}>
                                <button className='bg-blue-500 px-7 py-2 hover:bg-white transition-all duration-500 hover:text-black rounded-xl text-white font-bold'>Edit</button>
                            </Link>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">{role}</p>

                        <div className="flex items-center space-x-4 mt-2">
                            <span className="text-gray-500 dark:text-gray-400 flex items-center"><MdLocationPin className="mr-1" /> Hamburg, Germany</span>
                        </div>

                        <div className="flex space-x-6 mt-4">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">15k</h2>
                                <p className="text-gray-500 dark:text-gray-400">Followers</p>
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">241</h2>
                                <p className="text-gray-500 dark:text-gray-400">Following</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact & Social Links */}
                <div className="mx-auto mt-6 p-6 bg-white dark:text-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold border-b pb-2">Contact Info</h2>
                    <div className="mt-4 space-y-2">
                        <p className="flex items-center"><MdEmail className="mr-2" /> {userData?.email}</p>
                        <p className="flex items-center"><BsGlobe className="mr-2" /> https://jaber-riyan-portfolio.netlify.app</p>
                        <p className="flex items-center"><MdLocationPin className="mr-2" /> City, Country</p>
                        <p className="flex items-center"><BsTelephoneFill className="mr-2" /> +1 (222) 111 - 57840</p>
                    </div>

                    <h2 className="text-2xl font-semibold border-b pb-2 mt-6">Social Media</h2>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-blue-600 dark:text-blue-400"><FaGithub size={28} /></a>
                        <a href="#" className="text-blue-500 dark:text-blue-300"><FaTwitter size={28} /></a>
                        <a href="#" className="text-blue-700 dark:text-blue-500"><FaLinkedin size={28} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProfileTourGuide;