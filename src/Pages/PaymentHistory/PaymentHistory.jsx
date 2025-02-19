import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import UsePaymentHistory from "../../Hooks/UsePaymentHistory/UsePaymentHistory";
import Loading from "../Shared/Loading/Loading";
import PaymentHistoryCard from "./PaymentHistoryCard/PaymentHistoryCard";

const PaymentHistory = () => {
    const { paymentHistory, paymentHistoryRefetch, isLoading } = UsePaymentHistory();

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="pb-44 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Helmet><title>Payment History | Traventure</title></Helmet>
            <div className="text-center py-8 mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Payment <span className="text-orange-600 capitalize"> History </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>
            <div className='px-12 py-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] dark:text-gray-200 font-bold text-2xl'>Total Payments: {paymentHistory?.data?.length}</h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-72 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className='sticky top-0'>
                                <tr className="bg-[#D1A054] dark:bg-orange-600 text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">EMAIL</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TOTAL PRICE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TrxId</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">PAYMENT DATE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="dark:text-gray-200">
                                {
                                    paymentHistory?.data?.length > 0 ? paymentHistory?.data?.map((payment, index) => {
                                        return <PaymentHistoryCard key={payment?._id} payment={payment} index={index}></PaymentHistoryCard>
                                    }) :
                                        <tr className='text-3xl font-bold text-center text-red-600 dark:text-red-400'>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className='p-6'>No Payment History </h2></td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
