import React from 'react';
import BookingsCard from './BookingsCard/BookingsCard';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const MyBookings = () => {
    return (
        <div className='mb-10 mt-10'>
            <section className='mb-5'>
                <SectionTitle heading={"MANAGE ALL Bookings"} subHeading={"How Many Bookings"}></SectionTitle>
            </section>
            <div className='px-12 py-10 bg-white'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total Bookings: 0</h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className='sticky top-0'>
                                <tr className="bg-[#D1A054] text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">PACKAGE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">GUIDE NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TOUR DATE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">TOUR PRICE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">STATUS</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">PAYMENT</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>

                                <BookingsCard booking={{ name: "cox's bazar", guideName: "jaber", tourDate: "10/12/2025", price: 5000, status: "pending" }}></BookingsCard>

                                {/* {
                                    users?.data?.length > 0 ? users?.data?.map((user, index) => {
                                        return <BookingsCard key={user?._id} item={user} index={index}></BookingsCard>

                                    }) :

                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No User</h2></td>
                                        </tr>
                                } */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;