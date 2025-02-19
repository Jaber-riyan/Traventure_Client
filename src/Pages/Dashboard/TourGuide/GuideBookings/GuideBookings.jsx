import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import useAuth from '../../../../Hooks/UseAuth/UseAuth';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading/Loading';
import BookingsCard from '../../Tourist/MyBookings/BookingsCard/BookingsCard';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import GuideBookingsCard from './GuideBookingsCard/GuideBookingsCard';

const GuideBookings = () => {
    const axiosInstanceSecure = UseAxiosSecure()
    const { user } = useAuth()
    const { data: bookings = [], refetch: bookingsRefetch, isLoading: bookingsLoading } = useQuery({
        queryKey: ["bookingsGuide", user?.email],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure(`/guide/bookings/${user?.email}`)
            return data.data
        }
    })

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Do you want to reject Booking?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.delete(`/booking/${id}`)
                console.log(data);
                if (data.status) {
                    Swal.fire({
                        title: "Cancel The Booking",
                        icon: 'success',
                    })
                    bookingsRefetch()
                }
                else {
                    Swal.fire({
                        title: "Something Went wrong for delete Booking",
                        icon: 'info',
                    })
                }
            }
        });
    }

    const handleAcceptBooking = (id) => {
        Swal.fire({
            title: "Do you want to accept Booking?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.get(`/booking/accepted/${id}`)
                console.log(data);
                if (data.status) {
                    Swal.fire({
                        title: "Accepted The Booking",
                        icon: 'success',
                    })
                    bookingsRefetch()
                }
                else {
                    Swal.fire({
                        title: "Something Went wrong for accepting Booking",
                        icon: 'info',
                    })
                }
            }
        });
    }

    if (bookingsLoading) return <Loading></Loading>

    return (
        <div className='mb-32 mt-10'>
            <Helmet><title>Guide Bookings | Traventure</title></Helmet>
            <div className="text-center py-8 mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Manage all <span className="text-orange-600 capitalize"> Bookings</span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>
            <div className='px-12 py-10 bg-white dark:bg-[#1f2937]'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] dark:text-white font-bold text-2xl'>Total Bookings: {bookings.length}</h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className='sticky top-0'>
                                <tr className="bg-[#D1A054] dark:bg-[#4a5568] text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">PACKAGE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TOURIST NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TOUR DATE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TOUR PRICE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">STATUS</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ACCEPT</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">REJECT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookings?.length > 0 ? bookings?.map((booking, index) => {
                                        return <GuideBookingsCard key={user?._id} booking={booking} handleDelete={handleDelete} handleAcceptBooking={handleAcceptBooking} index={index}></GuideBookingsCard>
                                    }) :
                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No Booking</h2></td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideBookings;
