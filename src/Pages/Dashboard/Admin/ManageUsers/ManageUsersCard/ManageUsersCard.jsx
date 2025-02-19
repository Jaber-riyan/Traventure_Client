const ManageUsersCard = ({ item: user, index }) => {
    return (
        <tr className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300">
            <td className="p-5 font-bold text-xl dark:text-gray-200">{index + 1}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">
                {user?.name}
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{user.email}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{user.lastLoginTime}</td>
            <td className="py-2 px-4">
                <h2 className={`font-bold text-[1rem] capitalize btn 
                ${user?.role === "admin" ? 'bg-green-500' 
                : user?.role === "tourist" ? 'bg-blue-400' 
                : 'bg-purple-400'} 
                text-white dark:bg-opacity-80`}>
                    {user?.role}
                </h2>
            </td>
        </tr>
    );
};

export default ManageUsersCard;
