import React from 'react';
import UseTourGuide from '../../../Hooks/UseTourGuide/UseTourGuide';
import TourGuideCard from './TourGuideCard/TourGuideCard';
import Loading from '../../Shared/Loading/Loading';

const TourGuides = () => {
    const { tourGuides, tourGuidesRefetch, tourGuidesLoading } = UseTourGuide()
    console.log(tourGuides);
    if (tourGuidesLoading) return <Loading></Loading>
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {
                tourGuides && tourGuides.map((guide) => <TourGuideCard key={guide?._id} guide={guide}></TourGuideCard>)
            }
        </div>
    );
};

export default TourGuides;