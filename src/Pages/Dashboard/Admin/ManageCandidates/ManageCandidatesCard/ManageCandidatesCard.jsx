import { ImCross } from "react-icons/im";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


const ManageCandidatesCard = ({ requestUser }) => {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{1}</td>
            <td className="py-2 px-4 text-[#737373]">
                {requestUser?.name}
            </td>
            <td className="py-2 px-4 text-[#737373]">{requestUser?.email}</td>
            <td className="px-4 py-2 text-[#737373]">
                <h2 className={`font-bold text-[1rem] capitalize btn 
                ${requestUser?.role === "admin" ? 'bg-green-500' : requestUser?.role === "tourist" ? 'bg-blue-400' : 'bg-purple-400'} text-white`}>
                    {requestUser?.role}</h2>
            </td>
            <td className="py-2 px-4">
                <button className="font-bold text-[1rem] capitalize btn bg-green-600 text-white">
                    <IoCheckmarkDoneSharp size={25} />
                </button>
            </td>
            <td className="py-2 px-4 text-white">
                <h2 className="font-bold text-[1rem] capitalize btn bg-red-600 text-white">
                    <ImCross size={25} />
                </h2>
            </td>
        </tr>
    );
};

export default ManageCandidatesCard;