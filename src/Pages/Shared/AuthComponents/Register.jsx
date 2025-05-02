import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut, updateProfile } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import auth from '../../../Firebase/Firebase.config';
import useAuth from '../../../Hooks/UseAuth/UseAuth';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import SocialLogin from '../../../Components/SocialLogin/SocialLogin';

const ImageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const Register = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstanceNormal = UseAxiosNormal();
    const { handleRegister, setUser, user, googleRegister } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleSubmitRegister = async (data) => {
        const name = data?.['name'];
        const photo = data?.['photo'][0];
        const email = data?.['email'];
        const password = data?.['password'];

        const { data: imageURL } = await axiosInstanceNormal.post(
            `https://api.imgbb.com/1/upload?key=${ImageHostingKey}`,
            { image: photo },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (password.length < 6) {
            toast.error("Password Should Be 6 Character.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password Must have an Uppercase Letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password Must have a Lowercase Letter");
            return;
        }

        handleRegister(email, password)
            .then(async (result) => {
                await updateProfile(auth.currentUser, {
                    displayName: name, photoURL: imageURL?.data?.url
                });

                const userInfo = {
                    name,
                    email,
                    lastLoginTime: result.user.metadata.lastSignInTime,
                };

                const { data } = await axiosInstanceNormal.post('/users', userInfo);
                if (data.data.insertedId || data.status === false) {
                    signOut(auth);
                    Swal.fire({
                        title: 'Successfully Created an account!',
                        icon: 'success'
                    });
                    navigate('/login');
                }
            })
            .catch(error => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    ?.split("-")
                    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    ?.join(" ");
                toast.error(formattedError);
            });
    };

    return (
        <div className="bg-[url('https://i.ibb.co.com/C5YrLhL/authentication.png')] dark:bg-none dark:bg-gray-900 md:p-20 p-10">
            <div className="flex lg:flex-row-reverse flex-col-reverse gap-10 items-center rounded-lg justify-center p-8 shadow-2xl bg-white dark:bg-gray-800">
                <Helmet>
                    <title>Register | Traventure</title>
                </Helmet>
                <img className='animate__animated animate__bounceInRight' src="https://i.ibb.co.com/9cwJPtr/authentication2.png" onContextMenu={e => e.preventDefault()} draggable={false} alt="" />
                <div className="w-full max-w-md py-20 px-8 space-y-6 animate__animated animate__bounceInLeft bg-white dark:shadow-none dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-[#000] dark:text-white">Register</h2>

                    <form onSubmit={handleSubmit(handleSubmitRegister)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#000] dark:text-white" htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] dark:bg-gray-700 text-black dark:text-white focus:border-gray-400"
                            />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000] dark:text-white" htmlFor="photo">Photo URL</label>
                            <input
                                type="file"
                                id="photo"
                                {...register("photo", { required: true })}
                                className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white dark:bg-gray-700"
                            />
                            {errors.photo && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000] dark:text-white" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: true })}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] dark:bg-gray-700 text-black dark:text-white focus:border-gray-400"
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000] dark:text-white" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", { required: true })}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] dark:bg-gray-700 text-black dark:text-white focus:border-gray-400"
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptedTerms}
                                onChange={() => setAcceptedTerms(!acceptedTerms)}
                                className="w-4 h-4 mr-2 text-gray-800 border-gray-300 rounded focus:ring-0"
                            />
                            <label htmlFor="terms" className="text-sm text-[#000] dark:text-white">
                                Accept <span className="font-bold">Terms & Conditions</span>
                            </label>
                        </div>

                        <button
                            disabled={!acceptedTerms}
                            className={`w-full py-2 mt-4 text-white rounded-md ${acceptedTerms ? 'bg-[#D1A054] hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            Register
                        </button>
                    </form>

                    <div className="divider"></div>
                    <SocialLogin />

                    <p className="mt-4 text-center text-sm text-[#000] dark:text-white">
                        Already Have An Account?{' '}
                        <Link to="/login" className="text-red-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
