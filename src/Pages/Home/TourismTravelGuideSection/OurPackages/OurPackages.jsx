import React from 'react';
import AssignedTourCard from '../../../Dashboard/Admin/AssignedTour/AssignedTourCard/AssignedTourCard';
import Loading from '../../../Shared/Loading/Loading';
import UsePackages from '../../../../Hooks/UsePackages/UsePackages';
import { Link } from 'react-router-dom';

const OurPackages = () => {
    const { packages, packagesLoading } = UsePackages();

    if (packagesLoading) return <Loading />;

    return (
        <>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center place-items-center'>
                {packages?.length &&
                    packages.slice(0,3).map((tourPackage) => (
                        <AssignedTourCard key={tourPackage._id} tourPackage={tourPackage} />
                    ))}
            </div>
            {/* Explore More Stories Button */}
            <div className="flex justify-center mt-6">
                <Link
                    to="/trips"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                    Explore More Packages →
                </Link>
            </div>
        </>
    );
};

export default OurPackages;
