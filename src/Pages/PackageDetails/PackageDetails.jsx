import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import { Helmet } from 'react-helmet-async';
import UseTourGuide from '../../Hooks/UseTourGuide/UseTourGuide';


const PackageDetails = () => {
    const params = useParams();
    const axiosInstanceNormal = UseAxiosNormal()

    const { data: tourPackage = {}, refetch: packageRefetch, isLoading: packageLoading } = useQuery({
        queryFn: async () => {
            const { data } = await axiosInstanceNormal(`/package/${params.id}`)
            return data.data
        }
    })

    if (packageLoading) return <Loading></Loading>

    console.log(tourPackage);
    const { _id, name, duration, price, planData, category, description, placePhoto1, placePhoto2, placePhoto3 } = tourPackage

    return (
        <div className='mt-28 mb-10 md:w-[80%] mx-auto w-[90%]'>
            <Helmet><title>Package Details | Traventure</title></Helmet>
            <section>
                <SectionTitle heading={"Package Details"} subHeading={"About Package"}></SectionTitle>
            </section>

            {/* slider  */}
            <div>
                <Carousel className="rounded-lg" autoPlay={true} interval={2000} infiniteLoop={true}>
                    <div>
                        <img src={placePhoto1} alt="Image 1" />
                    </div>
                    <div>
                        <img src={placePhoto2} alt="Image 2" />
                    </div>
                    <div>
                        <img src={placePhoto3} alt="Image 3" />
                    </div>
                </Carousel>
            </div>
            {/* content  */}
            <div className="p-4 text-gray-800 flex flex-col justify-between mb-10">
                <h3 className="text-4xl font-black mb-4">{name}</h3>
                <p className="text-xl text-gray-600 mt-2 leading-snug">
                    <span className='font-bold'>Description: </span>
                    {description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-orange-500"><span className='font-bold'>Price: </span> ৳ {price}</span>
                    <Link to={`/package-details/${_id}`} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                        Book Now
                    </Link>
                </div>
            </div>

            {/* tour plan  */}
            <section>
                <SectionTitle heading={"Our Tour Plan"} subHeading={""}></SectionTitle>
            </section>
            <div className='space-y-5 mb-16'>
                {
                    planData?.length && planData?.map((plan, index) => {
                        return (
                            <>
                                <div className='bg-gray-200 shadow-xl p-9 rounded-lg'>
                                    <h3 className='px-5 py-2 bg-blue-400 inline-block rounded-md font-bold text-xl text-white mb-4'>Day {index + 1}</h3>
                                    <h3 className='font-bold text-2xl mb-5 text-orange-500'>{plan.split("|")[0]}</h3>
                                    <p className='text-black/60 font-semibold'>{plan.split("|")[1]}</p>
                                </div>
                            </>
                        )
                    })
                }
            </div>

            {/* meet tour guides  */}
            <section>
                <SectionTitle heading={"meet our expert tour guides"} subHeading={""}></SectionTitle>
            </section>
            <div>
                {/* {tourGuides.length} */}
            </div>
        </div>
    );
};

export default PackageDetails;