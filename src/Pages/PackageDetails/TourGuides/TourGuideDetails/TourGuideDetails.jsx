import React from "react";
import { FaPhoneAlt, FaEnvelope, FaStar } from "react-icons/fa";
import "animate.css";
import { useQuery } from "@tanstack/react-query";
import UseAxiosNormal from "../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal";
import { useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

const TourGuideDetails = () => {
    const axiosInstanceNormal = UseAxiosNormal()
    const params = useParams()

    const { data: tourGuide = {}, refetch: tourGuideRefetch, isLoading: tourGuideLoading } = useQuery({
        queryKey: ["tourguide"],
        queryFn: async () => {
            const { data } = await axiosInstanceNormal(`/tour-guide/${params.id}`)
            return data.data
        }
    })


    if(tourGuideLoading) return <Loading></Loading>
    const {photo, name, category, experience, phone, email, ratings } = tourGuide


    return (
        <div className="bg-gray-500 text-white p-6 md:p-10 rounded-lg shadow-xl max-w-3xl mx-auto animate__animated animate__fadeIn mt-28 mb-16">
            <div className="flex flex-col md:flex-row gap-9 items-center md:items-start">
                <img
                    src={photo}
                    alt="Irfan Khan"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="md:w-48 md:h-80 w-60 h-12 rounded-full border-4 border-blue-500 object-cover flex-1"
                />
                <div className="md:text-left flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-300 capitalize">{name}</h2>
                    <p className="text-green-400 text-lg font-semibold capitalize">{category} Tour Guide</p>
                    <p className="text-gray-400 mt-2 capitalize">
                        {name} is an experienced tour guide with a deep knowledge of the rich {category} of Bangladesh. He/She specializes in {category} tours to heritage sites and local villages.
                    </p>
                    <div className="mt-4 text-gray-300">
                        <p><strong>Experience:</strong> {experience} years</p>
                        <p className="flex items-center gap-1"><FaStar className="text-yellow-400" /> Rating: {ratings}</p>
                        <p className="flex items-center gap-1"><FaPhoneAlt className="text-green-400" /> {phone}</p>
                        <p className="flex items-center gap-1"><FaEnvelope className="text-blue-400" /> {email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuideDetails;
