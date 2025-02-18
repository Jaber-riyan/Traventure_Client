import React from 'react';
import AssignedTourCard from '../../../Dashboard/Admin/AssignedTour/AssignedTourCard/AssignedTourCard';
import Loading from '../../../Shared/Loading/Loading';
import UsePackages from '../../../../Hooks/UsePackages/UsePackages';

const OurPackages = () => {
    const { packages, packagesLoading } = UsePackages();

    if (packagesLoading) return <Loading />;

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center place-items-center'>
            {packages?.length &&
                packages.map((tourPackage) => (
                    <AssignedTourCard key={tourPackage._id} tourPackage={tourPackage} />
                ))}
        </div>
    );
};

export default OurPackages;
