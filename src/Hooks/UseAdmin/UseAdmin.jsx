import React from 'react';
import useAuth from '../UseAuth/UseAuth';
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const axiosInstanceSecure = UseAxiosSecure();
    const { user, loading } = useAuth();

    const { data: role = "", refetch: refetchRole, isPending: roleLoading } = useQuery({
        queryKey: ["admin", user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem('authToken'),
        queryFn: async () => {
            if (user?.email) {
                const { data } = await axiosInstanceSecure.get(`/users/role/${user.email}`);
                return data?.data;
            }
            return ""
        },
        onError: (error) => {
            console.error("Error fetching admin role:", error);
        }
    });

    return { role, refetchRole, roleLoading };
};

export default UseAdmin;
