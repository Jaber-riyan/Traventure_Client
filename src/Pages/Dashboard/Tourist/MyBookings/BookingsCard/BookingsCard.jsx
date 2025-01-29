import React from 'react';
import UseAxiosSecure from '../../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const BookingsCard = ({ index, booking, handleDelete }) => {

    const axiosInstanceSecure = UseAxiosSecure()


    const { data: bookingStatus } = useQuery({
        queryKey: ["bookingStatusTourist", booking?._id],
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
            <td className="py-2 px-4 text-[#737373] capitalize">{booking.guideName}</td>
            <td className="py-2 px-4 text-[#737373]">{booking.tourDate}</td>
            <td className="py-2 px-4 text-[#737373]">{booking.packagePrice}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button className={`font-bold text-[1rem] capitalize btn bg-blue-600 text-white ${bookingStatus == "accepted" ? 'bg-green-600' : bookingStatus == "in review" ? 'bg-blue-600' : 'bg-sky-500'}`}>{booking?.status}</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <Link to={`/dashboard/payment/${booking._id}/${booking.packagePrice}`} disabled={bookingStatus !== "pending"} className={`font-bold text-[1rem] capitalize btn bg-orange-500 text-white`}>Pay</Link>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button disabled={bookingStatus !== "pending"} onClick={() => handleDelete(booking?._id)} className={`font-bold text-[1rem] capitalize btn bg-red-600 text-white`}>Cancel</button>
            </td>
        </tr>
    );
};

export default BookingsCard;