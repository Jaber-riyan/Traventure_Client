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
        <div className='mx-auto w-[90%] mb-16'>
            <Helmet><title>Assigned Tours | Traventure</title></Helmet>
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Assigned <span className="text-orange-600 capitalize"> Tour </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1'>
                {
                    packages?.length && packages.map((tourPackage, index) => <AssignedTourCard key={tourPackage._id} tourPackage={tourPackage}></AssignedTourCard>)
                }
            </div>
        </div>
    );
};

export default AssignedTour;