import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TourGuideCard = ({ guide }) => {
    const { photo, name, phone, _id, applicationTitle } = guide;

    return (
        <Link 
            to={`/guide/${_id}`} 
            className="w-full sm:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-500 dark:shadow-[0_0_10px_#fff] flex flex-col items-center text-center animate__animated animate__fadeIn"
        >
            {/* Profile Image with Stylish Border */}
            <div className="relative w-32 h-32">
                <img
                    src={photo}
                    alt={name}
                    className="w-32 h-32 object-cover rounded-md border-4 border-orange-500 shadow-md dark:border-orange-400 dark:shadow-orange-500/50"
                />
            </div>

            {/* Guide Name & Role */}
            <h3 className="text-xl font-bold mt-4 capitalize">{name}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">{applicationTitle}</p>

            {/* Contact Badge */}
            <div className="mt-3 flex items-center gap-2 bg-orange-500 dark:bg-orange-600 text-white px-3 py-1 rounded-full shadow-md">
                <FaPhoneAlt className="text-white" />
                <span className="font-semibold">{phone}</span>
            </div>
        </Link>
    );
};

export default TourGuideCard;
