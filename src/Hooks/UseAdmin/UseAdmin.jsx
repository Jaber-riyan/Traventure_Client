import React from 'react';
import useAuth from '../UseAuth/UseAuth';
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const { user, loading } = useAuth();

    const { data: isAdmin, refetch: refetchAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "admin"],
        enabled: !loading,
        queryFn: async () => {
            if (user?.email) {
                const { data } = await axiosInstanceSecure.get(`/users/admin/${user?.email}`);
                // console.log(data?.data);
                return data?.data;
            }
            else {
                return false
            }
        }
    })

    return { isAdmin, refetchAdmin, isAdminLoading };
};

export default UseAdmin;