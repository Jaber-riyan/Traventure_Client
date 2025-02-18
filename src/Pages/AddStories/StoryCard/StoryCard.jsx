import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';

const StoryCard = ({ story }) => {
    const { description, email, images, title } = story;
    const location = useLocation();

    return (
        <div className="bg-white dark:bg-zinc-900 shadow-md dark:shadow-gray-700 rounded-xl p-4 transition-all duration-300 hover:scale-105">
            {/* Image Carousel */}
            <Carousel 
                className="rounded-lg overflow-hidden" 
                autoPlay={true} 
                interval={2500} 
                infiniteLoop={true} 
                showThumbs={false}
                showStatus={false}
            >
                {
                    images && images.map((image, index) => (
                        <div key={index} className="relative h-64">
                            <img className="w-full h-64 object-cover rounded-xl" src={image} alt={`Story Image ${index + 1}`} />
                            <p className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold">{title}</p>
                        </div>
                    ))
                }
            </Carousel>

            {/* Story Details */}
            <div className="mt-4">
                <h3 className="text-lg font-bold dark:text-white">{title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>
            </div>
        </div>
    );
};

export default StoryCard;
