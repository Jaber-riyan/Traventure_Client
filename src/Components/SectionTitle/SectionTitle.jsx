import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className='text-center'>
            {subHeading.length !== 0 && <h2 className='text-[#D99904] text-xl italic'>---{subHeading}---</h2>}
            <h2 className='font-bold text-3xl uppercase dark:text-zinc-300 text-zinc-700 border-t-2 border-b-2 p-3 mb-10'>{heading}</h2>
        </div>
    );
};

export default SectionTitle;