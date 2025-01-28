import React from 'react';
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UsePackages = () => {
    const axiosInstanceSecure = UseAxiosSecure()

    const { data: packages = [], refetch: packagesRefetch, isLoading: packagesLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure('/packages')
            return data.data
        }
    })

    return { packages, packagesRefetch, packagesLoading }
};

export default UsePackages;