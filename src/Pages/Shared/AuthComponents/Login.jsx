import React, { useEffect, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { FaClosedCaptioning } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/UseAuth/UseAuth';
import SocialLogin from '../../../Components/SocialLogin/SocialLogin';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';



const Login = () => {
    const { handleLogin, user, googleRegister } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const captchaRef = useRef(null);
    const [captchaMatch, setCaptchaMatch] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosInstanceNormal = UseAxiosNormal();


    useEffect(() => {
        loadCaptchaEnginge(7);
        setCaptchaMatch(false)
    }, [])


    // useEffect(() => {
    //     if (user) {
    //         toast.info("You Logged in ")
    //         navigate(location?.state || '/');
    //     }
    // }, [user, navigate, location]);


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = captchaRef.current.value;
        // console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            toast.success("Successfully validated captcha");
            setCaptchaMatch(true);
        }
        else {
            toast.error("Invalid captcha!");
            setCaptchaMatch(false);
        }
    }

    const handleSubmitLogin = (data) => {
        const email = data?.['email'];
        const password = data?.['password'];

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

        handleLogin(email, password)
            .then(async (res) => {
                // console.log(location);
                const user = res.user;
                const userInfo = {
                    name: user?.displayName,
                    email,
                    lastLoginTime: user.metadata.lastSignInTime,
                }
                const { data } = await axiosInstanceNormal.post('/users', userInfo);
                // console.log(data);
                if (data.data.insertedId || data.status === false) {
                    // console.log(data);
                    Swal.fire({
                        title: 'Successfully Login!',
                        icon: 'success'
                    })
                    navigate(location?.state || '/');
                }


            })
            .catch(error => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    ?.split("-")
                    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    ?.join(" ");
                toast.error(formattedError);
                navigate('/login');
            })
        // e.target.reset();

    }

    return (
        <div className="bg-[url('https://i.ibb.co.com/C5YrLhL/authentication.png')] md:p-20 p-10">
            <div className="flex lg:flex-row flex-col-reverse gap-10 items-center rounded-lg justify-center p-8 shadow-2xl">
                <Helmet>
                    <title>Login | Traventure
                    </title>
                </Helmet>
                <img src="https://i.ibb.co.com/9cwJPtr/authentication2.png" onContextMenu={e => e.preventDefault()} draggable={false} alt="" />
                <form onSubmit={handleSubmit(handleSubmitLogin)} className="w-full max-w-md py-20 px-8 space-y-6 animate__animated animate__zoomIn">
                    <h2 className="text-3xl font-bold text-center text-[#000]">Login</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="email">
                                Email address
                            </label>
                            <div className="flex items-center mt-1">
                                <FiMail className="w-5 h-5 text-black" />
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    {...register("email", { required: true })}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-2 ml-2 border rounded-lg outline-none bg-[#ffffffce] focus:border-gray-400"
                                />
                            </div>
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#000]" htmlFor="password">
                                Password
                            </label>
                            <div className="flex items-center mt-1">
                                <FiLock className="w-5 h-5 text-black" />
                                <input
                                    type="password"
                                    id="password"
                                    name='password'
                                    {...register("password", { required: true })}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 ml-2 border rounded-lg outline-none bg-[#ffffffce] focus:border-gray-400"
                                />
                            </div>
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-medium text-[#000] mb-2" htmlFor="captcha">
                                <FaClosedCaptioning className="w-5 h-5 text-black" />
                                <LoadCanvasTemplate></LoadCanvasTemplate>
                            </label>
                            <div className="flex items-center mt-1">
                                <FaClosedCaptioning className="w-5 h-5 text-black" />
                                <input
                                    type="text"
                                    id="captcha"
                                    ref={captchaRef}
                                    name='captcha'
                                    placeholder="Type the captcha"
                                    className="w-full px-4 py-2 ml-2 mr-2 border rounded-lg outline-none bg-[#ffffffce] focus:border-gray-400"
                                />
                                <button type='button' onClick={handleValidateCaptcha} className='btn btn-outline btn-xs font-bold bg-black text-white'>Validate</button>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-[#000]">
                        <Link className="underline text-[#000]">
                            Forgat Password?
                        </Link>

                    </p>


                    {/* <button disabled={!captchaMatch} className={`w-full py-2 mt-4 rounded-md  text-white ${!captchaMatch ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D1A054B3] hover:bg-[#d19f54f8]'}`}>
                        Login
                    </button> */}
                    <button className={`w-full py-2 mt-4 rounded-md  text-white bg-[#D1A054B3] hover:bg-[#d19f54f8]`}>
                        Login
                    </button>
                    <div className="divider"></div>
                    <SocialLogin></SocialLogin>

                    <p className="mt-4 text-center text-sm text-[#000]">
                        Don't Have An Account?{' '}
                        <Link to="/register" className="text-red-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;