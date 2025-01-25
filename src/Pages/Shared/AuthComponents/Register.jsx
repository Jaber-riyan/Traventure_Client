import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut, updateProfile } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';
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

    // redirect if user already logged in
    // useEffect(() => {
    //     if (user && location.pathname.includes('register')) {
    //         toast.info("You Logged in ");
    //         navigate('/login');
    //     }
    // }, [user, navigate, location.pathname]);

    const handleSubmitRegister = async (data) => {
        // e.preventDefault();
        // console.log(data);
        const name = data?.['name'];
        const photo = data?.['photo'][0];
        const email = data?.['email'];
        const password = data?.['password'];
        console.log({ name, photo, email, password });
        const { data: imageURL } = await axiosInstanceNormal.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, { image: photo }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // console.table({ name, photo, email, password, image: imageURL?.data?.url });
        // return

        if (password.length < 6) {
            toast.error("Password Should Be 6 Character.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password Must have an Uppercase Letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password Must have an Lowercase Letter");
            return;
        }

        handleRegister(email, password)
            .then(async (result) => {
                console.log(result.user);
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: imageURL?.data?.url
                })
                const userInfo = {
                    name,
                    email,
                    lastLoginTime: result.user.metadata.lastSignInTime,
                }
                const { data } = await axiosInstanceNormal.post('/users', userInfo);
                if (data.data.insertedId || data.status === false) {
                    console.log(data);
                    signOut(auth).then(result => { });
                    Swal.fire({
                        title: 'Successfully Created an account!',
                        icon: 'success'
                    })
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
            })
    }



    return (
        <div className="bg-[url('https://i.ibb.co.com/C5YrLhL/authentication.png')] md:p-20 p-10">
            <div className="flex lg:flex-row-reverse flex-col-reverse gap-10 items-center rounded-lg justify-center p-8 shadow-2xl">
                <Helmet>
                    <title>Register | Traventure</title>
                </Helmet>
                <img className='animate__animated animate__bounceInRight' src="https://i.ibb.co.com/9cwJPtr/authentication2.png" onContextMenu={e => e.preventDefault()} draggable={false} alt="" />
                <div className="w-full max-w-md py-20 px-8 space-y-6 animate__animated animate__bounceInLeft">
                    <h2 className="text-3xl font-bold text-center text-[#000]">Register</h2>

                    <form onSubmit={handleSubmit(handleSubmitRegister)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="name">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] focus:border-gray-400"
                            />
                        </div>
                        {errors.name && <span className="text-red-500">This field is required</span>}

                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="photo">
                                Photo URL
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="photo"
                                {...register("photo", { required: true })}
                                className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white"
                            />
                            {errors.photo && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] focus:border-gray-400"
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                {...register("password", { required: true })}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 mt-1 border rounded-md outline-none bg-[#ffffffce] focus:border-gray-400"
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                checked={acceptedTerms}
                                onChange={() => setAcceptedTerms(!acceptedTerms)}
                                className="w-4 h-4 mr-2 text-gray-800 border-gray-300 rounded focus:ring-0"
                            />
                            <label htmlFor="terms" className="text-sm text-[#000]">
                                Accept <span className="font-bold text-[#000]">Terms & Conditions</span>
                            </label>
                        </div>
                        <button
                            disabled={!acceptedTerms}
                            className={`w-full py-2 mt-4 text-white rounded-md ${acceptedTerms ? 'bg-[#D1A054] hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Register
                        </button>
                    </form>
                    <div className="divider"></div>
                    <SocialLogin></SocialLogin>

                    <p className="mt-4 text-center text-sm text-[#000]">
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