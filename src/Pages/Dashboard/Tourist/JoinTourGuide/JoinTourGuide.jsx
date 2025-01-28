import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaPhoneAlt, FaLink } from 'react-icons/fa';
import { MdTitle, MdWork } from 'react-icons/md';
import useAuth from '../../../../Hooks/UseAuth/UseAuth';
import UseUser from '../../../../Hooks/UseUser/UseUser';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';

const JoinTourGuide = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { user } = useAuth()
    const { userData, userRefetch } = UseUser()
    const axiosInstanceSecure = UseAxiosSecure()

    const onSubmit = async (data) => {
        // console.log("Form Data:", data);
        const submitInfo = {
            ...data,
            photo: user?.photoURL,
            name: user?.displayName,
            email: user?.email,
            userId: userData?._id,
            experience: parseInt((Math.random() * (8 - 2) + 2)),
            rating: (Math.random() * (5 - 3) + 3).toFixed(1)
        }
        console.log(submitInfo);
        const response = await axiosInstanceSecure.post('/tour/guide/request', submitInfo);
        console.log(response.data);
        if (response.data.data.insertedId) {
            toast.success("Application Submitted Successfully!");
            reset();
        }
        else toast.error("Something went wrong to requesting!")

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center text-orange-500">Become a Tour Guide</h2>
                <p className="text-center text-gray-600 mb-6">Share your passion for traveling and show others the wonders of our beautiful and diverse world.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Application Title */}
                        <div>
                            <label className="block font-medium">Application Title</label>
                            <div className="relative">
                                <MdTitle className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    {...register("applicationTitle", { required: "Application title is required" })}
                                    placeholder="Enter your application title"
                                    className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            {errors.applicationTitle && <p className="text-red-500 text-sm">{errors.applicationTitle.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block font-medium">Phone*</label>
                            <div className="relative">
                                <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="tel"
                                    {...register("phone", { required: "Phone number is required" })}
                                    placeholder="Enter your phone number"
                                    className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Designation */}
                        <div>
                            <label className="block font-medium">Designation</label>
                            <div className="relative">
                                <MdWork className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    {...register("designation", { required: "Designation is required" })}
                                    placeholder="Write your speciality"
                                    className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
                        </div>

                        {/* CV Link */}
                        <div>
                            <label className="block font-medium">CV Link</label>
                            <div className="relative">
                                <FaLink className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="url"
                                    {...register("cvLink", { required: "CV Link is required" })}
                                    placeholder="Paste your CV link here"
                                    className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            {errors.cvLink && <p className="text-red-500 text-sm">{errors.cvLink.message}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium">Why do you want to be a Tour Guide?</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Write a brief description"
                            rows="4"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinTourGuide;
