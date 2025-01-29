import React from 'react';
import { Link } from 'react-router-dom';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import { useQuery } from '@tanstack/react-query';
import StoryCard from '../../AddStories/StoryCard/StoryCard';

const TouristStories = () => {
    const axiosInstanceNormal = UseAxiosNormal();

    const { data: stories = [], refetch: storiesRefetch, isLoading: storiesLoading } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const { data } = await axiosInstanceNormal.get(`/stories-all`)
            return data.data
        }
    })
    return (
        <div>
            <div className='mb-6 mt-10'>
                <h2 className='text-4xl font-bold text-center cinzel-font underline'>Tourist Shared Stories</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        stories?.length > 0 && stories.map(story => <StoryCard key={story?._id} story={story}></StoryCard>)
                    }
                </div>
                {
                    stories?.length < 0 && <div className='flex justify-center items-center min-h-screen'>
                        <h2 className='font-bold text-4xl text-red-600'>No Added Story :(</h2>
                    </div>
                }
            </div>
            <div className='flex justify-center'>
                <Link to={"/community"} className='btn btn-primary text-[1rem] cinzel-font font-black'>All Stories</Link>
            </div>
        </div>
    );
};

export default TouristStories;