import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import UsePackages from '../../../../Hooks/UsePackages/UsePackages';
import Loading from '../../../Shared/Loading/Loading';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import AssignedTourCard from './AssignedTourCard/AssignedTourCard';

const AssignedTour = () => {

    const { packages, packagesRefetch, packagesLoading } = UsePackages()

    console.log(packages);
    if (packagesLoading) return <Loading></Loading>

    return (
        <div className='md:w-[80%] mx-auto w-[90%]'>
            <Helmet><title>Assigned Tours | Traventure</title></Helmet>
            <section>
                <SectionTitle heading={"Assigned Tours"} subHeading={""}></SectionTitle>
            </section>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                {
                    packages?.length && packages.map((tourPackage, index) => <AssignedTourCard key={tourPackage._id} tourPackage={tourPackage}></AssignedTourCard>)
                }
            </div>
        </div>
    );
};

export default AssignedTour;