import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure";
import UseAxiosNormal from "../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import { useNavigate } from "react-router-dom";

const ImageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const ImgBBUploadURL = `https://api.imgbb.com/1/upload?key=${ImageHostingKey}`;

const AddStories = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [charCount, setCharCount] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const { user } = useAuth()
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    };

    const uploadImagesToImgBB = async (files) => {
        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axiosInstanceNormal.post(ImgBBUploadURL, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                return response.data.data.url;
            } catch (error) {
                console.error("Image upload failed:", error);
                return null;
            }
        });

        return Promise.all(uploadPromises);
    };

    const onSubmit = async (data) => {
        if (data.description.length > 100) {
            toast.error("Description must be within 100 characters!");
            return;
        }

        // Upload images to ImgBB and get URLs
        toast.info("Uploading images...");
        const imageUrls = await uploadImagesToImgBB(selectedImages);

        if (imageUrls.includes(null)) {
            toast.error("Some images failed to upload. Please try again.");
            return;
        }

        const storyData = {
            title: data.title,
            description: data.description,
            images: imageUrls, // Store only URLs
            email: user?.email
        };

        console.log("Story Submitted:", storyData);
        const response = await axiosInstanceSecure.post('/story', storyData)
        console.log(response.data);
        if (response.data.data.insertedId) toast.success("Story added successfully!"); 
        else toast.error("Something Went wrong to adding story!")

        // Reset form
        reset();
        setCharCount(0);
        setSelectedImages([]);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-[0_0_15px_#fff] rounded-lg mt-10 mb-10 dark:bg-gray-900 dark:text-white">
            <Helmet><title>Add Story | Traventure</title></Helmet>
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Add Your <span className="text-orange-600 capitalize">Story </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>
    
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block font-medium text-gray-600 dark:text-gray-300">Title*</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter story title"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
    
                {/* Description Input */}
                <div>
                    <label className="block font-medium text-gray-600 dark:text-gray-300">Description* (Max 100 characters)</label>
                    <textarea
                        {...register("description", { required: "Description is required", maxLength: 100 })}
                        placeholder="Write your story description here"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        rows="3"
                        onChange={(e) => setCharCount(e.target.value.length)}
                    ></textarea>
                    <p className={`text-sm mt-1 ${charCount > 100 ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>{charCount}/100 characters</p>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
    
                {/* File Upload */}
                <div>
                    <label className="block font-medium text-gray-600 dark:text-gray-300">Upload Images</label>
                    <label className="border-2 border-dashed p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
                        <FiUpload className="text-3xl text-blue-500" />
                        <span className="mt-2 text-gray-500 text-sm dark:text-gray-400">Click to Upload Photos (Multiple allowed)</span>
                        <input type="file" multiple {...register("images")} className="hidden" onChange={handleFileChange} />
                    </label>
                    {selectedImages.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {selectedImages.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)} alt="Preview" className="w-full h-20 object-cover rounded-lg" />
                            ))}
                        </div>
                    )}
                </div>
    
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all dark:bg-orange-600 dark:hover:bg-orange-700"
                >
                    Add Story
                </button>
            </form>
        </div>
    );
    
};

export default AddStories;
