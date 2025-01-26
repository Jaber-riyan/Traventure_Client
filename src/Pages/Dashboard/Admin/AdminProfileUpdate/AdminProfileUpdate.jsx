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


const ImageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const AddItems = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const { handleRegister, setUser, user, googleRegister } = useAuth()
    const { userData, userRefetch } = UseUser();
    console.log(userData);



    const handleSubmitAddItem = async (data) => {
        // console.log(data);
        const userName = data.userName;
        const userEmail = data.userEmail;
        let userPhoto = data.userPhoto[0];

        if (userPhoto) {
            const { data: imageURL } = await axiosInstanceNormal.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, { image: userPhoto }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            userPhoto = imageURL.data.url;
        }
        if (userPhoto || userName) {
            updateProfile(auth.currentUser, {
                displayName: userName, photoURL: userPhoto
            })
        }

        // update user state 
        setUser(auth.currentUser)
        // console.log(imageURL);

        // update usre info 
        const adminInfo = {
            name: userName,
            email: userEmail,
            id: userData?._id
        }
        console.log(adminInfo);
        // send to server 
        const userUpdateRes = await axiosInstanceSecure.patch('/user', adminInfo);
        if (userUpdateRes.data.status) {
            toast.success('Admin Profile updated successfully!')
            userRefetch();
        } else {
            toast.error('Failed to update item.');
        }

        // console.table({ recipeName, category, price, recipeDetails, recipePhoto });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-5">
                <SectionTitle heading={"Update Admin Profile"} subHeading={"What's Update?"}></SectionTitle>
            </section>
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(handleSubmitAddItem)} className="space-y-6">
                    {/* User Name */}
                    <div className="form-group">
                        <label htmlFor="recipeName" className="block text-lg font-semibold mb-2">Admin name</label>
                        <input
                            type="text"
                            id="userName"
                            placeholder="User name"
                            name='userName'
                            {...register("userName")}
                            defaultValue={userData?.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                        {/* User Email */}
                        <div className="form-group">
                            <label htmlFor="category" className="block text-lg font-semibold mb-2">Admin Email</label>
                            <input
                                type="email"
                                id="userEmail"
                                placeholder="User email"
                                name='userEmail'
                                {...register("userEmail")}
                                defaultValue={userData?.email}
                                readOnly={true}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>

                        {/* User Role */}
                        <div className="form-group">
                            <label htmlFor="price" className="block text-lg font-semibold mb-2">Role</label>
                            <input
                                type="text"
                                id="price"
                                placeholder="Role"
                                name='price'
                                readOnly={true}
                                {...register("price")}
                                defaultValue={userData?.role}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Last Seen */}
                    <div className="form-group">
                        <label htmlFor="details" className="block text-lg font-semibold mb-2">Last Seen</label>
                        <input
                            id="details"
                            placeholder="Recipe Details"
                            rows="4"
                            name='lastSeen'
                            readOnly={true}
                            {...register("recipeDetails")}
                            defaultValue={userData?.lastLoginTime}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        ></input>
                    </div>

                    {/* File Upload */}
                    <div className="form-group">
                        <label htmlFor="file" className="block text-lg font-semibold mb-2">Upload Image</label>
                        <input
                            type="file"
                            id="file"
                            name="userPhoto"
                            {...register("userPhoto")}
                            className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-[#835d23] to-[#b58130] text-white hover:bg-gradient-to-l transition-all duration-1000 flex items-center gap-2 rounded-lg"
                        >
                            <span>Update</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;