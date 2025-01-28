import { ImCross } from "react-icons/im";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


const ManageCandidatesCard = ({ requestUser, index, handleAccepted, handleRejected }) => {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373]">
                {requestUser?.name}
            </td>
            <td className="py-2 px-4 text-[#737373]">{requestUser?.email}</td>
            <td className="px-4 py-2 text-[#737373]">
                <h2 className={`font-bold text-[1rem] capitalize btn bg-purple-500 text-white`}>Tourist</h2>
            </td>
            <td className="py-2 px-4">
                <button onClick={() => handleAccepted(requestUser)} className="font-bold text-[1rem] capitalize btn bg-green-600 text-white">
                    <IoCheckmarkDoneSharp size={25} />
                </button>
            </td>
            <td className="py-2 px-4 text-white">
                <button onClick={() => handleRejected(requestUser?._id)} className="font-bold text-[1rem] capitalize btn bg-red-600 text-white">
                    <ImCross size={25} />
                </button>
            </td>
        </tr>
    );
};

export default ManageCandidatesCard;