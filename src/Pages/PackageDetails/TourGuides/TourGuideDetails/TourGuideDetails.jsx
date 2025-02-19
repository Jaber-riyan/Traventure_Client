import React from "react";
import { FaPhoneAlt, FaEnvelope, FaStar } from "react-icons/fa";
import "animate.css";
import { useQuery } from "@tanstack/react-query";
import UseAxiosNormal from "../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal";
import { useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

const TourGuideDetails = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const params = useParams();

    const { data: tourGuide = {}, refetch: tourGuideRefetch, isLoading: tourGuideLoading } = useQuery({
        queryKey: ["tourguide", params.id],
        queryFn: async () => {
            const { data } = await axiosInstanceNormal(`/tour-guide/${params.id}`);
            return data.data;
        },
    });

    if (tourGuideLoading) return <Loading />;
    const { photo, name, category, experience, phone, email, rating, description } = tourGuide;

    return (
        <div className="dark:bg-gray-900 text-gray-900 dark:text-white space-y-28">
            <div className="p-6 rounded-lg shadow-lg md:shadow-xl max-w-3xl mx-auto animate__animated animate__fadeIn pt-28 pb-16">
                <div className="flex flex-col md:flex-row gap-9 items-center md:items-start">
                    <img
                        src={photo}
                        alt={name}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className="md:w-48 md:h-80 w-60 h-60 rounded-lg border-4 border-blue-500 object-cover flex-1 shadow-md"
                    />
                    <div className="md:text-left flex-1">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 capitalize">{name}</h2>
                        <p className="text-green-500 text-lg font-semibold capitalize">{category} Tour Guide</p>
                        <p className="text-gray-700 dark:text-gray-300 mt-2 capitalize text-sm leading-relaxed">{description}</p>
                        <div className="mt-4 text-gray-800 dark:text-gray-300 space-y-2">
                            <p className="text-sm"><strong>Experience:</strong> {experience} years</p>
                            <p className="flex items-center gap-1 text-sm"><FaStar className="text-yellow-400" /> Rating: {rating}</p>
                            <p className="flex items-center gap-2 text-sm"><FaPhoneAlt className="text-green-400" /> {phone}</p>
                            <p className="flex items-center gap-2 text-sm"><FaEnvelope className="text-blue-400" /> {email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuideDetails;
