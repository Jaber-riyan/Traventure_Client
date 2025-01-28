import React from 'react';

const PaymentHistoryCard = ({ payment, index }) => {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373]">
                {payment?.email}
            </td>
            <td className="py-2 px-4 text-[#737373]">{payment?.category}</td>
            <td className="py-2 px-4 text-[#737373]">${payment?.totalPrice}</td>
            <td className="py-2 px-4 text-[#737373]">{payment?.trxid}</td>
            <td className="py-2 px-4 text-[#737373]">{payment?.paymentDate}</td>
            <td className="py-2 px-4 text-[#737373]">{
            payment?.orderedItems?.length > 0 ? 
            payment?.orderedItems.map((item, index)=> <h2 className='mb-2' key={index}>*{item}*</h2>) : ""}</td>
            <td className="py-2 px-4 text-[#737373] capitalize">{payment?.status}</td>
        </tr>
    );
};

export default PaymentHistoryCard;