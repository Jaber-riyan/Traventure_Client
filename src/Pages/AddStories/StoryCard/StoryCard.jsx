import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useLocation, useParams } from 'react-router-dom';


const StoryCard = ({ story }) => {
    const { description, email, images, title } = story
    console.log(story);
    const location = useLocation()
    console.log(location.pathname);

    return (
        <div className='bg-gray-400 px-2 py-2 rounded-xl'>
            <Carousel className="rounded-lg" autoPlay={true} interval={2000} infiniteLoop={true}>
                {
                    images && images.map((image, index) => <div className='h-80' key={index}>
                        <img className='rounded-xl' src={image} alt="Image 1" />
                        <p className='legend btn font-bold'>{title}</p>
                        <p className='text-white font-bold'>{description}</p>
                    </div>)
                }
            </Carousel>
            {
                location.pathname !== "/community" &&
                <>
                    <button className='btn btn-error text-white mr-2'>
                        Delete
                    </button>
                    <button className='btn btn-primary text-white'>
                        Share
                    </button>
                </>
            }
        </div>
    );
};

export default StoryCard;