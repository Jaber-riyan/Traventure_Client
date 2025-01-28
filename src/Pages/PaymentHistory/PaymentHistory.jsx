import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import UsePaymentHistory from '../../../Hooks/UsePaymentHistory/UsePaymentHistory';
import PaymentHistoryCard from './PaymentHistoryCard/PaymentHistoryCard';

const PaymentHistory = () => {
    const { paymentHistory, paymentHistoryRefetch } = UsePaymentHistory();


    return (
        <div>
            <section className='mb-5'>
                <SectionTitle heading={"Payment History"} subHeading={"At a Glance"}></SectionTitle>
            </section>
            <div className='px-12 py-10 bg-white'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total Payments: {paymentHistory?.data?.length}</h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-72 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className='sticky top-0'>
                                <tr className="bg-[#D1A054] text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">EMAIL</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">CATEGORY</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TOTAL PRICE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TrxId</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">PAYMENT DATE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ITEMS</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paymentHistory?.data?.length > 0 ? paymentHistory?.data?.map((payment, index) => {
                                        return <PaymentHistoryCard key={payment?._id} payment={payment} index={index}></PaymentHistoryCard>

                                    }) :

                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No Payment History </h2></td>
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