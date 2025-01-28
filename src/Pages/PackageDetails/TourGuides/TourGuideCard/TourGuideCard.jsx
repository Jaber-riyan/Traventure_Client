import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TourGuideCard = ({ guide }) => {
    const { category, photo, name, phone, _id } = guide;

    return (
        <Link to={`/guide/${_id}`} className="w-full sm:w-64 bg-gray-500 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center animate__animated animate__fadeIn">
            {/* Profile Image */}
            <div className="relative w-32 h-32">
                <img
                    src={photo}
                    alt={name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-green-500"
                />
            </div>

            {/* Guide Name & Role */}
            <h3 className="text-xl font-bold mt-4 capitalize">{name}</h3>
            <p className="text-lg text-gray-400 capitalize">{category} Tour Guide</p>

            {/* Contact */}
            <div className="mt-2 flex items-center gap-2 text-blue-400 text-lg">
                <FaPhoneAlt className="text-orange-500" />
                <span>{phone}</span>
            </div>
        </Link>
    );
};

export default TourGuideCard;
