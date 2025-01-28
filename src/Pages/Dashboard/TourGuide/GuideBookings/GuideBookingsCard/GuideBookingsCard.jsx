import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';

const GuideBookingsCard = ({ index, booking, handleDelete }) => {
    const axiosInstanceSecure = UseAxiosSecure()


    const { data: bookingStatus } = useQuery({
        queryKey: ["bookingStatusGuide", booking?._id],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure(`/booking/status/${booking?._id}`)
            return data.data
        }
    })
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373] capitalize">
                {booking?.packageName}
            </td>
            <td className="py-2 px-4 text-[#737373] capitalize">{booking.touristName}</td>
            <td className="py-2 px-4 text-[#737373]">{booking.tourDate}</td>
            <td className="py-2 px-4 text-[#737373]">{booking.packagePrice}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button className={`font-bold text-[1rem] capitalize btn bg-blue-600 text-white`}>{booking?.status}</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button disabled={bookingStatus === "pending"} className={`font-bold text-[1rem] capitalize btn btn-success text-white`}>Accept</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button disabled={!bookingStatus === "pending"} onClick={() => handleDelete(booking?._id)} className={`font-bold text-[1rem] capitalize btn btn-error text-white`}>Reject</button>
            </td>
        </tr>
    );
};

export default GuideBookingsCard;