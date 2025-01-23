import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';

const SocialLogin = () => {
    const { handleRegister, setUser, user, googleRegister } = useAuth();
    const navigate = useNavigate();
    const axiosInstanceNormal = UseAxiosNormal();

    const googleSignUp = () => {
        googleRegister()
            .then(async (res) => {
                // console.log(res.user);
                const user = res.user;
                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    lastLoginTime: user.metadata.lastSignInTime,
                }
                const { data } = await axiosInstanceNormal.post('/users',  userInfo );
                // console.log(data);
                Swal.fire({
                    title: 'Successfully Login!',
                    icon: 'success'
                })

                navigate('/');
            })
            .catch(error => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                toast.error(formattedError);
            })
    }
    return (
        <div className='flex justify-center'>
            <FcGoogle className='cursor-pointer' onClick={googleSignUp} size={40} />
        </div>
    );
};

export default SocialLogin;