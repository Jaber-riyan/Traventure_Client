import React from 'react';
import useAuth from '../UseAuth/UseAuth';
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseUser = () => {
    const { user } = useAuth()
    const axiosInstanceSecure = UseAxiosSecure()



    const { data: userData = {}, refetch: userRefetch } = useQuery({
        queryKey: [user?.email, "user"],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get(`/user/${user?.email}`)
            return data.data
        }
    })

    return { userData, userRefetch }
};

export default UseUser;