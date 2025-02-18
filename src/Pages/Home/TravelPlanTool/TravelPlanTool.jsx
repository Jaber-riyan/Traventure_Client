import React from 'react';

const TravelPlanTool = () => {
    return (
        <div>
            <div className='mb-16'>
                <h2 className='md:text-5xl text-3xl font-bold text-[#4e4b66] dark:text-gray-200 text-center capitalize md:w-[70%] mx-auto'>Use our assortment of travel plan tools</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='border-[#E4DAFF] dark:border-gray-700 border-2 px-7 py-10 rounded-2xl text-center bg-white dark:bg-gray-800 flex flex-col h-full'>
                    <div className='flex justify-center mb-2'>
                        <img src="https://i.ibb.co.com/hs9rFYM/Time.png" alt="" />
                    </div>
                    <p className='mb-2 text-gray-700 dark:text-gray-300 flex-grow'>Choosing some trip dates depends on factors like weather, destination, and availability of accommodations.</p>
                    <button className='px-5 uppercase py-2 border-2 border-[#9747ff] dark:border-purple-400 text-[1rem] font-bold rounded-3xl hover:bg-[#9747ff] dark:hover:bg-purple-500 hover:text-white transition-all duration-700 dark:text-gray-300'>Learn More</button>
                </div>
                <div className='border-[#E4DAFF] dark:border-gray-700 border-2 px-7 py-10 rounded-2xl text-center bg-white dark:bg-gray-800 flex flex-col h-full'>
                    <div className='flex justify-center mb-6'>
                        <img src="https://i.ibb.co.com/QP4SJFw/Plane-and-Money.png" alt="" />
                    </div>
                    <h1 className='text-[18px] font-bold mb-2 text-gray-900 dark:text-gray-200'>Pay For Your Flights</h1>
                    <p className='mb-2 text-gray-700 dark:text-gray-300 flex-grow'>Choosing some trip dates depends on factors like weather, destination, and availability of accommodations.</p>
                    <button className='px-5 uppercase py-2 border-2 border-[#9747ff] dark:border-purple-400 text-[1rem] font-bold rounded-3xl hover:bg-[#9747ff] dark:hover:bg-purple-500 hover:text-white transition-all duration-700 dark:text-gray-300'>Learn More</button>
                </div>
                <div className='border-[#E4DAFF] dark:border-gray-700 border-2 px-7 py-10 rounded-2xl text-center bg-white dark:bg-gray-800 flex flex-col h-full'>
                    <div className='flex justify-center mb-6'>
                        <img src="https://i.ibb.co.com/9ybM7Kx/Money.png" alt="" />
                    </div>
                    <h1 className='text-[18px] font-bold mb-2 text-gray-900 dark:text-gray-200'>Plan Your Finances</h1>
                    <p className='mb-2 text-gray-700 dark:text-gray-300 flex-grow'>Choosing some trip dates depends on factors like weather, destination, and availability of accommodations.</p>
                    <button className='px-5 uppercase py-2 border-2 border-[#9747ff] dark:border-purple-400 text-[1rem] font-bold rounded-3xl hover:bg-[#9747ff] dark:hover:bg-purple-500 hover:text-white transition-all duration-700 dark:text-gray-300'>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default TravelPlanTool;
