import React from 'react';
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseCandidates = () => {
    const axiosInstanceSecure = UseAxiosSecure();

    const { data: requestedCandidates = [], refetch: requestedCandidatesRefetch, isLoading: requestedCandidatesLoading } = useQuery({
        queryKey: ["candidatesRequest"],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure('/tour/guide/requests')
            return data.data
        }
    })

    return { requestedCandidates, requestedCandidatesRefetch, requestedCandidatesLoading }
};

export default UseCandidates;