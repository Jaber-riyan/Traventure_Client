import React from 'react';
import AssignedTourCard from '../../../Dashboard/Admin/AssignedTour/AssignedTourCard/AssignedTourCard';
import Loading from '../../../Shared/Loading/Loading';
import UsePackages from '../../../../Hooks/UsePackages/UsePackages';

const OurPackages = () => {
    const { packages, packagesLoading } = UsePackages()
    // console.log(packages);

    if (packagesLoading) return <Loading></Loading>
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1'>
            {
                packages?.length && packages.map((tourPackage, index) => <AssignedTourCard key={tourPackage._id} tourPackage={tourPackage}></AssignedTourCard>)
            }
        </div>
    );
};

export default OurPackages;