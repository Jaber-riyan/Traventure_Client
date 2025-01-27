import React from 'react';
import UsePackages from '../../Hooks/UsePackages/UsePackages';
import Loading from '../Shared/Loading/Loading';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import AssignedTourCard from '../Dashboard/Admin/AssignedTour/AssignedTourCard/AssignedTourCard';

const Trips = () => {
    const { packages, packagesLoading } = UsePackages()

    if (packagesLoading) return <Loading></Loading>
    return (
        <div className='mt-28 md:w-[80%] mx-auto w-[90%] mb-10'>
            <Helmet><title>Trips | Traventure</title></Helmet>
            <section >
                <SectionTitle heading={"Our Tour packages"} subHeading={"To Easy To go Tour"}></SectionTitle>
            </section>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                {
                    packages?.length && packages.map((tourPackage, index) => <AssignedTourCard key={tourPackage._id} tourPackage={tourPackage}></AssignedTourCard>)
                }
            </div>
        </div>
    );
};

export default Trips;