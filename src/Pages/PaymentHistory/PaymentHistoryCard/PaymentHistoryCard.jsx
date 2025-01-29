import React from 'react';

const PaymentHistoryCard = ({ payment, index }) => {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373]">
                {payment?.email}
            </td>
            <td className="py-2 px-4 text-[#737373]">{payment?.trxid}</td>
            <td className="py-2 px-4 text-[#737373]">${payment?.totalPrice}</td>
            <td className="py-2 px-4 text-[#737373]">{payment?.paymentDate}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button className={`font-bold text-[1rem] capitalize btn bg-blue-600 text-white cursor-not-allowed ${payment?.status == "accepted" ? 'bg-green-600' : 'bg-sky-500'}`}>{payment?.status}</button>
                </td>
        </tr>
    );
};

export default PaymentHistoryCard;