import React from 'react';

const GuideBookingsCard = ({ index, booking, handleDelete }) => {
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
                <button className={`font-bold text-[1rem] capitalize btn bg-orange-500 text-white`}>Pay</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button onClick={() => handleDelete(booking?._id)} className={`font-bold text-[1rem] capitalize btn bg-red-600 text-white`}>Cancel</button>
            </td>
        </tr>
    );
};

export default GuideBookingsCard;