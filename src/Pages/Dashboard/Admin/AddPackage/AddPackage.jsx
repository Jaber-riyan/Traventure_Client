import React from 'react';
import { useForm } from 'react-hook-form';
import { ImSpoonKnife } from 'react-icons/im';
import Swal from 'sweetalert2';
import useAuth from '../../../../Hooks/UseAuth/UseAuth';
import { updateProfile } from 'firebase/auth'
import UseAxiosNormal from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
import { toast } from 'react-toastify';
import UseUser from '../../../../Hooks/UseUser/UseUser';
import auth from '../../../../Firebase/Firebase.config';
import { Helmet } from 'react-helmet-async';

const ImageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const AddPackage = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const { handleRegister, setUser, user, googleRegister } = useAuth()
    const { userData, userRefetch } = UseUser();

    const handleSubmitAddPackage = async (data) => {
        const packageName = data.packageName;
        const tourDuration = data.tourDuration;
        const price = data.tourPrice;
        const description = data.description;
        const category = data.category;
        let planPoint = data.planPoint;
        let plan = data.details;
        let placePhoto1 = data.placePhoto1[0];
        let placePhoto2 = data.placePhoto2[0];
        let placePhoto3 = data.placePhoto3[0];

        const { data: imageURL1 } = await axiosInstanceNormal.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, { image: placePhoto1 }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        placePhoto1 = imageURL1.data.url;

        const { data: imageURL2 } = await axiosInstanceNormal.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, { image: placePhoto2 }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        placePhoto2 = imageURL2.data.url;

        const { data: imageURL3 } = await axiosInstanceNormal.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, { image: placePhoto3 }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        placePhoto3 = imageURL3.data.url;

        planPoint = planPoint.split("\n");
        plan = plan.split("\n");

        const planData = planPoint.map((planD, index) => `${planD} | ${plan[index]}`);

        const packageInfo = {
            name: packageName,
            duration: tourDuration,
            price,
            planData,
            category,
            description,
            placePhoto1,
            placePhoto2,
            placePhoto3
        }

        const response = await axiosInstanceSecure.post("/packages", packageInfo);
        if (response.data.data.insertedId && response.data.status) toast.success("Successfully Added Package");
        else toast.error("Something is Wrong! Try Again")
    }

    return (
        <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
            <Helmet><title>Add Package | Traventure</title></Helmet>
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Add Tour <span className="text-orange-600 capitalize"> Package </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(handleSubmitAddPackage)} className="space-y-6">
                    {/* Package Name */}
                    <div className="form-group">
                        <label htmlFor="packageName" className="block text-lg font-semibold mb-2">Package Name*</label>
                        <input
                            type="text"
                            id="packageName"
                            placeholder="Package Name"
                            name='packageName'
                            {...register("packageName", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                        {errors.packageName && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                        {/* Tour Duration */}
                        <div className="form-group">
                            <label htmlFor="tourDuration" className="block text-lg font-semibold mb-2">Tour Duration</label>
                            <input
                                type="number"
                                id="tourDuration"
                                placeholder="Duration"
                                name='tourDuration'
                                {...register("tourDuration", { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                            {errors.tourDuration && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Price */}
                        <div className="form-group">
                            <label htmlFor="tourPrice" className="block text-lg font-semibold mb-2">Price</label>
                            <input
                                type="number"
                                id="tourPrice"
                                placeholder="Price"
                                name='tourPrice'
                                {...register("tourPrice", { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                            {errors.tourPrice && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label htmlFor="category" className="block text-lg font-semibold mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            {...register("category", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        >
                            <option value="">Select a Category</option>
                            <option value="nature">Nature</option>
                            <option value="beach">Beach</option>
                            <option value="island">Island</option>
                            <option value="cultural">Cultural</option>
                            <option value="historical">Historical</option>
                            <option value="adventure">Adventure</option>
                        </select>
                        {errors.category && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
                        <textarea
                            id="description"
                            placeholder="Description"
                            rows="4"
                            name='description'
                            {...register("description", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                        {errors.description && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Plan key point */}
                    <div className="form-group">
                        <label htmlFor="planPoint" className="block text-lg font-semibold mb-2">Plan Key Point (Separate The Day Plan using New Line)</label>
                        <textarea
                            id="planPoint"
                            placeholder="Plan Point"
                            rows="3"
                            name='planPoint'
                            {...register("planPoint", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                        {errors.planPoint && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Brief overview */}
                    <div className="form-group">
                        <label htmlFor="details" className="block text-lg font-semibold mb-2">Plans Of the tour (Separate The Day Plan using New Line)</label>
                        <textarea
                            id="details"
                            placeholder="Details"
                            rows="3"
                            name='details'
                            {...register("details", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                        {errors.details && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* File Upload */}
                    <div className="form-group">
                        <label htmlFor="file" className="block text-lg font-semibold mb-2">Must Upload 3 Image</label>
                        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                            <input
                                type="file"
                                id="placePhoto1"
                                name="placePhoto1"
                                {...register("placePhoto1")}
                                className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white dark:bg-[#b5823077]"
                            />
                            <input
                                type="file"
                                id="placePhoto2"
                                name="placePhoto2"
                                {...register("placePhoto2")}
                                className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white dark:bg-[#b5823077]"
                            />
                            <input
                                type="file"
                                id="placePhoto3"
                                name="placePhoto3"
                                {...register("placePhoto3")}
                                className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white dark:bg-[#b5823077]"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-[#835d23] to-[#b58130] text-white hover:bg-gradient-to-l transition-all duration-1000 flex items-center gap-2 rounded-lg"
                        >
                            <span>Add Package</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;
