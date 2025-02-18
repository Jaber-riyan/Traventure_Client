import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner/Banner';
import TravelPlanTool from './TravelPlanTool/TravelPlanTool';
import Overview from './Overview/Overview';
import TourismTravelGuideSection from './TourismTravelGuideSection/TourismTravelGuideSection';
import TouristStories from './TouristStories/TouristStories';

const Home = () => {
    return (
        <div className="dark:bg-gray-900 dark:text-gray-200">
            <section className='bg-gray-50 dark:bg-gray-800 mb-10'>
                <Banner></Banner>
            </section>
            <section className='mb-14 md:w-[87%] mx-auto w-[90%]'>
                <TravelPlanTool></TravelPlanTool>
            </section>
            <section className='bg-slate-200 dark:bg-slate-800 py-16 mb-14'>
                <section className='md:w-[87%] mx-auto w-[90%]'>
                    <Overview></Overview>
                </section>
            </section>
            <section className='mb-14 md:w-[87%] mx-auto w-[90%]'>
                <TourismTravelGuideSection></TourismTravelGuideSection>
            </section>
            <section className='dark:bg-zinc-900 bg-gray-100 pb-14 '>
                <section className='md:w-[86%] mx-auto w-[90%] '>
                    <TouristStories></TouristStories>
                </section>
            </section>

        </div>
    );
};

export default Home;
