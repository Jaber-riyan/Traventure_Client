import React from 'react';

const TravelPlanTool = () => {
    return (
        <div>
            <div className='mb-16'>
                <h2 className='md:text-5xl text-2xl font-bold text-[#4e4b66] text-center capitalize w-[70%] mx-auto'>Use our assortment of travel plan tools</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='border-[#E4DAFF] border-2 px-7 py-10 rounded-2xl text-center'>
                    <div className='flex justify-center mb-2'>
                        <img src="https://i.ibb.co.com/hs9rFYM/Time.png" alt="" />
                    </div>
                    <p className='mb-2'>Choosing some trip dates depends on factors like weather, destination, and availability of accommodations.</p>
                    <button className='px-5 uppercase py-2 border-2 border-[#9747ff] text-[1rem] font-bold rounded-3xl hover:bg-[#9747ff] hover:text-white transition-all duration-700'>Learn More</button>
                </div>
                <div className='border-[#E4DAFF] border-2 px-7 py-10 rounded-2xl text-center'>
                    <div className='flex justify-center mb-6'>
                        <img src="https://i.ibb.co.com/QP4SJFw/Plane-and-Money.png" alt="" />
                    </div>
                    <h1 className='text-[18px] font-bold mb-2'>Pay For Your Flights</h1>
                    <p className='mb-2'>Choosing some trip dates depends on factors like weather, destination, and availability of accommodations.</p>
                    <button className='px-5 uppercase py-2 border-2 border-[#9747ff] text-[1rem] font-bold rounded-3xl hover:bg-[#9747ff] hover:text-white transition-all duration-700'>Learn More</button>
                </div>
                <div className='border-[#E4DAFF] border-2 px-7 py-10 rounded-2xl text-center'>
                    <div className='flex justify-center mb-6'>
                        <img src="https://i.ibb.co.com/9ybM7Kx/Money.png" alt="" />
                    </div>
                    <h1 className='text-[18px] font-bold mb-2'>Plan Your Finances</h1>
                    <p className='mb-2'>Choosing some trip dates depends on factors like weather, destination, and availability of accommodations.</p>
                    <button className='px-5 uppercase py-2 border-2 border-[#9747ff] text-[1rem] font-bold rounded-3xl hover:bg-[#9747ff] hover:text-white transition-all duration-700'>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default TravelPlanTool;