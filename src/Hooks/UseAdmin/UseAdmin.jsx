import React from 'react';
import useAuth from '../UseAuth/UseAuth';
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const { user, loading } = useAuth();

    const { data: role = "", refetch: refetchRole, isPending: roleLoading } = useQuery({
        queryKey: [user?.email, "admin"],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get(`/users/admin/${user?.email}`);
            // console.log(data?.data);
            return data?.data;
        }
    })

    return { role, refetchRole, roleLoading };
};

export default UseAdmin;