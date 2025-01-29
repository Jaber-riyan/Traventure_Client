import React from 'react';
import UseAxiosNormal from '../UseAxiosSecureAndNormal/UseAxiosNormal';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../UseAuth/UseAuth';
import UseAdmin from '../UseAdmin/UseAdmin';

const UseStories = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const { user } = useAuth()
    const { role } = UseAdmin();

    const { data: stories = [], refetch: storiesRefetch, isLoading: storiesLoading } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            if (role === "admin") {
                const { data } = await axiosInstanceNormal.get(`/stories-all`)
                return data.data
            }
            const { data } = await axiosInstanceNormal.get(`/stories/${user?.email}`)
            return data.data
        }
    })

    return { stories, storiesRefetch, storiesLoading }
};

export default UseStories;