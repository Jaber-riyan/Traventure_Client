import React from 'react';
import UsePackages from '../../Hooks/UsePackages/UsePackages';
import Loading from '../Shared/Loading/Loading';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import AssignedTourCard from '../Dashboard/Admin/AssignedTour/AssignedTourCard/AssignedTourCard';

const Trips = () => {
    const { packages, packagesLoading } = UsePackages()
    console.log(packages);

    if (packagesLoading) return <Loading></Loading>

    return (
        <div className='bg-gray-100 dark:bg-gray-900'>
            <div className='pt-28 md:w-[87%] mx-auto w-[90%] pb-28'>
                <Helmet><title>Trips | Traventure</title></Helmet>
                <section>
                    <SectionTitle heading={"Our Tour packages"} subHeading={"Easy To Manage Tour"}></SectionTitle>
                </section>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    {
                        packages?.length && packages.map((tourPackage, index) =>
                            <AssignedTourCard key={tourPackage._id} tourPackage={tourPackage}></AssignedTourCard>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Trips;
