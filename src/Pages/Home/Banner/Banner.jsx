// import "animate.css";
import { LuPlane } from "react-icons/lu";
import { GiWorld } from "react-icons/gi";
import { BsBicycle } from "react-icons/bs";
import React from "react";
import "animate.css";

const Banner = () => {
    return (
        <section className="w-full bg-gray-50 dark:bg-gray-900">
            {/* Main Banner Section */}
            <div
                className="bg-no-repeat bg-left min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: "url('https://i.ibb.co/m8VsZvP/Boarding.png')",
                    backgroundSize: "cover",
                }}
            >
                <div
                    className="w-full mx-auto px-4 py-12 flex flex-col lg:flex-row items-center lg:items-start md:w-[80%]"
                >
                    {/* Left Section */}
                    <div className="lg:w-1/2 text-center lg:text-left animate__animated animate__fadeInLeft flex flex-col">
                        <h1 className="text-4xl md:text-4xl lg:text-5xl cinzel-font font-bold text-gray-800 dark:text-gray-200 leading-snug">
                            Plan your next big <br /> trip overseas.
                        </h1>
                        <div className="mt-6 flex justify-center lg:justify-start gap-4">
                            <button className="px-6 py-3 text-white bg-[#5b21b6] hover:bg-[#4c1d95] rounded-lg shadow-md text-sm md:text-base font-semibold">
                                Begin Plans
                            </button>
                            <button className="px-6 py-3 text-[#5b21b6] dark:text-[#c4a7e7] bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-[#5b21b6] dark:border-gray-600 rounded-lg shadow-md text-sm md:text-base font-semibold">
                                Review Plans
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 py-8 border-t-2 border-gray-300 dark:border-gray-700 border-b-2">
                <div className="md:w-[80%] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="flex gap-5 animate__animated animate__fadeInUp px-12 py-5">
                        <LuPlane size={55} className="text-[#5b21b6] dark:text-[#c4a7e7] text-4xl mb-3" />
                        <div>
                            <h3 className="text-3xl font-bold text-[#2a00a2] dark:text-[#c4a7e7] mb-4">23,973</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 md:w-[90%]">
                                Travel to over 23 thousand locations around the world.
                            </p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex gap-5 animate__animated animate__fadeInUp border-t-2 border-b-2 sm:border-t-0 sm:border-b-0 sm:border-l-2 sm:border-r-2 border-gray-200 dark:border-gray-700 py-5 px-12">
                        <GiWorld size={55} className="text-[#5b21b6] dark:text-[#c4a7e7] text-4xl mb-3" />
                        <div>
                            <h3 className="text-3xl font-bold text-[#2a00a2] dark:text-[#c4a7e7] mb-4">82,000</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 md:w-[90%]">
                                Read tens of thousands of reviews of destinations.
                            </p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex gap-5 animate__animated animate__fadeInUp px-12 py-5">
                        <BsBicycle size={60} className="text-[#5b21b6] dark:text-[#c4a7e7] text-4xl mb-3" />
                        <div>
                            <h3 className="text-3xl font-bold text-[#2a00a2] dark:text-[#c4a7e7] mb-4">4,000,000</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 md:w-[90%]">
                                Visited by millions of travelers every single day.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
