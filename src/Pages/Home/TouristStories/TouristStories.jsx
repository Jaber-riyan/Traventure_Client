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
            const { data } = await axiosInstanceNormal.get(`/stories-all`);
            return data.data;
        }
    });

    return (
        <div className="py-10 transition-all duration-300">
            <div className="mb-6">
                <h2 className="text-4xl font-bold text-center text-zinc-800 dark:text-zinc-200 cinzel-font underline mb-8">
                    Tourist Shared Stories
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {stories?.length > 0 ? (
                        stories.map(story => <StoryCard key={story?._id} story={story} />)
                    ) : (
                        <div className="col-span-full flex justify-center items-center min-h-[200px]">
                            <h2 className="font-bold text-3xl text-red-600">No Added Story 😔</h2>
                        </div>
                    )}
                </div>
            </div>

            {/* Explore More Stories Button */}
            <div className="flex justify-center mt-6">
                <Link 
                    to="/community" 
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                    Explore More Stories →
                </Link>
            </div>
        </div>
    );
};

export default TouristStories;
