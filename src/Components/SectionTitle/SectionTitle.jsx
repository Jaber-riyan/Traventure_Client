import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className='text-center'>
            {subHeading.length !== 0 && <h2 className='text-[#D99904] text-xl italic'>---{subHeading}---</h2>}
            <div className="divider w-[25%] mx-auto"></div>
            <h2 className='font-semibold text-3xl uppercase'>{heading}</h2>
            <div className="divider w-[25%] mx-auto"></div>
        </div>
    );
};

export default SectionTitle;