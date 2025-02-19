import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';

const GuideBookingsCard = ({ index, booking, handleDelete, handleAcceptBooking }) => {
    const axiosInstanceSecure = UseAxiosSecure()


    const { data: bookingStatus } = useQuery({
        queryKey: ["bookingStatusGuide", booking?._id],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure(`/booking/status/${booking?._id}`)
            return data.data
        }
    })
    return (
        <tr className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
            <td className='p-5 font-bold text-xl text-[#151515] dark:text-white'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 capitalize">
                {booking?.packageName}
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 capitalize">{booking.touristName}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{booking.tourDate}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{booking.packagePrice}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">
                <button className={`font-bold text-[1rem] capitalize btn ${bookingStatus == "accepted" ? 'bg-green-600 dark:bg-green-500' : bookingStatus == "in review" ? 'bg-blue-600 dark:bg-blue-500' : 'bg-sky-500 dark:bg-sky-400'} text-white`}>
                    {booking?.status}
                </button>
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">
                <button disabled={bookingStatus === "pending" || bookingStatus === "accepted"} onClick={() => handleAcceptBooking(booking?._id)} className={`font-bold text-[1rem] capitalize btn dark:text-white dark:shadow-[0_0_10px_#fff] btn-success text-white`}>
                    Accept
                </button>
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 ">
                <button disabled={bookingStatus === "accepted"} onClick={() => handleDelete(booking?._id)} className={`font-bold text-[1rem] capitalize btn btn-error text-white dark:text-white dark:shadow-[0_0_10px_#fff] `}>
                    Reject
                </button>
            </td>
        </tr>
    );
};

export default GuideBookingsCard;
