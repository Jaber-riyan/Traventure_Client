import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../UseAuth/UseAuth';


const axiosInstanceSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    withCredentials: true
})
const UseAxiosSecure = () => {

    const navigate = useNavigate();
    const { handleLogout } = useAuth()

    useEffect(() => {

        // request interceptor to add authorization header for every secure call to teh api
        axiosInstanceSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken")
            // console.log(token);
            // console.log('request stopped by interceptors', token)
            if (token) {
                config.headers.authorization = token;
            }
            else {
                console.warn('No token found in localStorage!');
            }
            return config;
        }, (error) => {
            // Do something with request error
            return Promise.reject(error);
        });

        axiosInstanceSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log("error from interceptor : ", error);
            if (error.status === 401 || error.status === 403) {

                // logout functionality 
                handleLogout()
                    .then(res => {
                        Swal.fire({
                            title: "Logout Successfully",
                            icon: 'success'
                        })
                        navigate('/login');
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
            return Promise.reject(error);
        })
    }, [handleLogout, navigate])

    return axiosInstanceSecure;
};

export default UseAxiosSecure;