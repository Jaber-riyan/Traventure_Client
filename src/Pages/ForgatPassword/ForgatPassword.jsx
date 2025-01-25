import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import auth from '../../Firebase/Firebase.config';
import Swal from 'sweetalert2';



const ForgatPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const handleResetPassword = async (data) => {
        if (data.email.length == 0) {
            toast.error("Please Provide Your Email Address!");
            return
        }
        try {
            await sendPasswordResetEmail(auth, data?.email)
            Swal.fire({
                title: "Password reset email sent to your email, Check it out",
                icon: "success"
            })
            window.open("https://mail.google.com/", "_blank")
            navigate('/login')
        }
        catch (error) {
            const errorCode = error.code.split("auth/")[1];
            const formattedError = errorCode
                ?.split("-")
                ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
                ?.join(" ");
            toast.error(formattedError);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-[#151b31]">
            <Helmet><title>Forgat Password | Traventure</title></Helmet>
            <div className="w-full max-w-lg p-8 shadow-lg rounded-lg bg-[#05295c] animate__animated animate__zoomIn">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Forgot Password</h1>
                <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <div className="flex items-center">
                            <FiMail className="text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                {...register("email")}
                                className="w-full px-4 py-2 ml-2 border rounded-lg outline-none bg-gray-100 focus:border-gray-400"
                            />
                        </div>
                    </div>
                    {/* Reset Password Button */}
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 shadow-md flex justify-center items-center"
                    >
                        Reset Password
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-white">
                    Remembered your password?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-red-500 hover:underline"
                    >
                        Login Here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgatPassword;