import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';

const ManageUsersCard = ({ item: user, index }) => {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373]">
                {user?.name}
            </td>
            <td className="py-2 px-4 text-[#737373]">{user.email}</td>
            <td className="py-2 px-4 text-[#737373]">{user.lastLoginTime}</td>
            <td className="py-2 px-4 text-[#737373]">
                <h2 className={`font-bold text-[1rem] capitalize btn 
                ${user?.role === "admin" ? 'bg-green-400' : 'bg-[#D1A054]'} text-white`}>
                    {user?.role}</h2>
            </td>
        </tr>
    );
};

export default ManageUsersCard;