import React from 'react';
import { Link } from 'react-router-dom';

const TouristStories = () => {
    return (
        <div>
            <div className='mb-6'>
                <h2 className='text-4xl font-bold text-center cinzel-font underline'>Tourist Shared Stories</h2>
            </div>
            <div className='flex justify-center'>
                <Link className='btn btn-primary text-[1rem] cinzel-font font-black'>All Stories</Link>
            </div>
        </div>
    );
};

export default TouristStories;