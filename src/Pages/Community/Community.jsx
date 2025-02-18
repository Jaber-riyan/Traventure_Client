import React from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import Loading from '../Shared/Loading/Loading';
import UseStories from '../../Hooks/UseStories/UseStories';
import StoryCard from '../AddStories/StoryCard/StoryCard';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import { useQuery } from '@tanstack/react-query';
import {Helmet} from 'react-helmet-async'

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
        <div className='md:min-h-screen pt-24 pb-16 p-5 bg-gray-100 dark:bg-gray-900'>
            <Helmet><title>Community | Traventure</title></Helmet>
            <section>
                <SectionTitle heading={"community"} subHeading={""}></SectionTitle>
            </section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    stories?.length > 0 && stories.map(story => <StoryCard key={story?._id} story={story}></StoryCard>)
                }
            </div>
            {
                stories?.length < 0 && <div className='flex justify-center items-center min-h-screen'>
                    <h2 className='font-bold text-4xl text-red-600 dark:text-red-400'>No Added Story :(</h2>
                </div>
            }
        </div>
    );
};

export default Community;
