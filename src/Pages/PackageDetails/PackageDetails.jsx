import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import TourGuides from './TourGuides/TourGuides';
import BookingModal from './BookingModal/BookingModal';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';


const PackageDetails = () => {
    const params = useParams();
    const axiosInstanceNormal = UseAxiosNormal()
    const axiosInstanceSecure = UseAxiosSecure()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tourGuides, tourGuidesLoading, tourGuidesRefetch } = UseTourGuide()
    // console.log("tour guides", tourGuides);
    const { user, handleLogout, setUser } = useAuth();
    const navigate = useNavigate();

    const { data: tourPackage = {}, refetch: packageRefetch, isLoading: packageLoading } = useQuery({
        queryFn: async () => {
            const { data } = await axiosInstanceNormal(`/package/${params.id}`)
            return data.data
        }
    })

    const handleBookingSubmit = async (data) => {
        if (!user?.email) {
            Swal.fire({
                title: "Login First then Booking Package",
                icon: "error"
            })
            navigate('/login');
            return
        }
        console.log("Booking Details:", data);
        console.log(new Date(data.tourDate).toDateString());
        const submitData = {
            packageName: name,
            touristName: user?.displayName,
            touristEmail: user?.email,
            touristImage: user?.photoURL,
            packagePrice: price,
            tourDate: new Date(data.tourDate).toDateString(),
            tourGuide: data.selectedGuide,
            status: "pending"
        }
        console.log(submitData);
        const response = await axiosInstanceSecure.post('/booking', submitData)
        if (response.data.data.insertedId) {
            toast.success("Successfully Booked Tour Package")
            navigate('/dashboard/tourist/bookings')
        }
        else toast.error("Something went wrong to booking!")
        setIsModalOpen(false);
    };

    if (packageLoading) return <Loading></Loading>

    // console.log(tourPackage, { packageLoading });
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
                    <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                        Book Now
                    </button>
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

            {/* Booking Modal */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                packageDetails={{ name, price }}
                user={user}
                guides={tourGuides}
                onSubmit={handleBookingSubmit}
            />

            {/* meet tour guides  */}
            <section>
                <SectionTitle heading={"meet our expert tour guides"} subHeading={""}></SectionTitle>
            </section>
            <div>
                <TourGuides></TourGuides>
            </div>
        </div>
    );
};

export default PackageDetails;