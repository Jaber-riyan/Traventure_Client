import React from 'react';
import UseAxiosNormal from '../UseAxiosSecureAndNormal/UseAxiosNormal';
import { useQuery } from '@tanstack/react-query';

const UseTourGuide = () => {

    const axiosInstanceNormal = UseAxiosNormal()

    const { data: tourGuides = [], refetch: tourGuidesRefetch, isLoading: tourGuidesLoading } = useQuery({
        queryKey: ["tourGuides"],
        queryFn: async () => {
            const { data } = await axiosInstanceNormal.get('/tour-guides')
            return data.data
        }
    })

    return { tourGuides, tourGuidesRefetch, tourGuidesLoading }
};

export default UseTourGuide;