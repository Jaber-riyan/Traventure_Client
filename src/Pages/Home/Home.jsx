import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div>
            <section className='bg-gray-50 mb-10'>
                <Banner></Banner>
            </section>
        </div>
    );
};

export default Home;