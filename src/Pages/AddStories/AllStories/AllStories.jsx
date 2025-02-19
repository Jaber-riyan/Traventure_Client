import React from 'react';
import UseStories from '../../../Hooks/UseStories/UseStories';
import Loading from '../../Shared/Loading/Loading';
import StoryCard from '../StoryCard/StoryCard';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const AllStories = () => {
    const { stories, storiesRefetch, storiesLoading } = UseStories()


    if (storiesLoading) return <Loading></Loading>

    return (
        <div className='md:min-h-screen mt-10 mb-16'>
            <Helmet><title>Stories | Traventure</title></Helmet>
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Shared <span className="text-orange-600 capitalize"> Stories </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    stories?.length > 0 && stories.map(story => <StoryCard key={story?._id} story={story}></StoryCard>)
                }
            </div>
            {
                stories?.length < 0 ? <div className='flex justify-center items-center min-h-screen'>
                    <h2 className='font-bold text-4xl text-red-600'>No Added Story :(</h2>
                </div>
                :
                <h3 className='text-3xl dark:text-white font-semibold'>No Shared Story</h3>
            }
        </div>
    );
};

export default AllStories;