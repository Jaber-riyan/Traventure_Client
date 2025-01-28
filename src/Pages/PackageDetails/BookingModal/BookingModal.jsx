import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "animate.css";

const BookingModal = ({ isOpen, onClose, packageDetails, user, guides, onSubmit }) => {
    const [tourDate, setTourDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState("");

    if (!isOpen) return null; // Hide modal if not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg md:w-2/3">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg md:text-xl font-bold text-gray-700">Book Your Tour</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Booking Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit({ tourDate, selectedGuide });
                    }}
                    className="mt-3 space-y-3"
                >
                    {/* Package Name */}
                    <div>
                        <label className="font-medium text-gray-600 text-sm">Package Name</label>
                        <input
                            type="text"
                            value={packageDetails?.name || ""}
                            readOnly
                            className="w-full p-1.5 border rounded-md bg-gray-100 text-sm"
                        />
                    </div>

                    {/* Tourist Name */}
                    <div>
                        <label className="font-medium text-gray-600 text-sm">Tourist Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full p-1.5 border rounded-md bg-gray-100 text-sm"
                        />
                    </div>

                    {/* Tourist Email */}
                    <div>
                        <label className="font-medium text-gray-600 text-sm">Tourist Email</label>
                        <input
                            type="text"
                            value={user?.email || ""}
                            readOnly
                            className="w-full p-1.5 border rounded-md bg-gray-100 text-sm"
                        />
                    </div>

                    {/* Tourist Image */}
                    <div>
                        <label className="font-medium text-gray-600 text-sm">Tourist Image</label>
                        <input
                            type="text"
                            value={user?.photoURL || ""}
                            readOnly
                            className="w-full p-1.5 border rounded-md bg-gray-100 text-sm"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="font-medium text-gray-600 text-sm">Price</label>
                        <input
                            type="text"
                            value={`৳ ${packageDetails?.price || 0}`}
                            readOnly
                            className="w-full p-1.5 border rounded-md bg-gray-100 text-sm"
                        />
                    </div>

                    {/* Tour Date */}
                    <div>
                        <label className="font-medium text-gray-600 text-sm">Tour Date</label>
                        <DatePicker
                            selected={tourDate}
                            onChange={(date) => setTourDate(date)}
                            className="w-full p-1.5 border rounded-md text-sm"
                        />
                    </div>

                    {/* Tour Guide Selection */}
                    <div>
                        <label className="font-medium text-gray-600 text-sm">Tour Guide</label>
                        <select
                            value={selectedGuide}
                            onChange={(e) => setSelectedGuide(e.target.value)}
                            className="w-full p-1.5 border rounded-md text-sm"
                            required
                        >
                            <option value="">Select a Guide</option>
                            {guides.map((guide) => (
                                <option key={guide.id} value={guide.email}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition text-sm"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
