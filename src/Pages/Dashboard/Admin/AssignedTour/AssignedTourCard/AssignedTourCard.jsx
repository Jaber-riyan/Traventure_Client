import React from "react";
import { FaTag } from "react-icons/fa";
import { MdTimeline } from "react-icons/md";
import { Link } from "react-router-dom";

const AssignedTourCard = ({ tourPackage }) => {
  const { _id, category, placePhoto1, price, name, description, duration } = tourPackage;

  return (
    <div className="w-full p-4 animate__animated animate__fadeIn dark:shadow-[0_0_10px_#fff] rounded-2xl hover:scale-105 transition-all duration-500">
      <div className="relative bg-white dark:bg-gray-800 rounded-md shadow-xl h-[400px] flex flex-col justify-between dark:shadow-gray-900">
        
        {/* Badge - Category */}
        <div className="absolute top-4 left-4 bg-orange-500 dark:bg-orange-600 text-white text-sm font-semibold px-3 py-1 rounded-full animate__fadeIn capitalize">
          <FaTag className="inline-block mr-1" /> {category}
        </div>

        {/* Badge - Duration */}
        <div className="absolute top-4 right-4 bg-blue-500 dark:bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full animate__fadeIn capitalize">
          <MdTimeline className="inline-block mr-1" /> {duration} days
        </div>

        {/* Image */}
        <img
          src={placePhoto1 || placePhoto1}
          alt="Tour Destination"
          className="rounded-t-md w-full h-40 object-cover"
        />

        {/* Content */}
        <div className="p-4 text-gray-800 dark:text-white flex flex-col justify-between flex-grow">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-snug flex-grow">
            {description?.slice(0, 200)} <span className="font-bold">more...</span>
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-orange-500 dark:text-orange-400">৳ {price}</span>
            <Link 
              to={`/package-details/${_id}`} 
              className="bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedTourCard;
