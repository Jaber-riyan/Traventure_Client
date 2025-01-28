import React from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import Loading from '../Shared/Loading/Loading';
import UseStories from '../../Hooks/UseStories/UseStories';
import StoryCard from '../AddStories/StoryCard/StoryCard';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import { useQuery } from '@tanstack/react-query';

const Community = () => {

    const axiosInstanceNormal = UseAxiosNormal()

    const { data: stories = [], refetch: storiesRefetch, isLoading: storiesLoading } = useQuery({
        queryKey: ["storiesAll"],
        queryFn: async () => {
            const { data } = await axiosInstanceNormal.get(`/stories-all`)
            return data.data
        }
    })


    if (storiesLoading) return <Loading></Loading>

    return (
        <div className='md:min-h-screen mt-20 mb-16 p-5'>
            <section>
                <SectionTitle heading={"community"} subHeading={""}></SectionTitle>
            </section>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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
    );
};

export default Community;