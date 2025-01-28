import React from 'react';
import UseAxiosNormal from '../UseAxiosSecureAndNormal/UseAxiosNormal';
import { useQuery } from '@tanstack/react-query';

const UseTourGuide = () => {

    const axiosInstanceNormal = UseAxiosNormal()

    const { data: tourGuides = [], refetch: tourGuideRefetch, isLoading: tourGuideLoading } = useQuery({
        queryFn: async () => {
            const { data } = await axiosInstanceNormal.get('/tour-guide')
            return data.data
        }
    })

    return { tourGuides, tourGuideRefetch, tourGuideLoading }
};

export default UseTourGuide;