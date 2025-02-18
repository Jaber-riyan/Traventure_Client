import { useState } from "react";
import { IoNotificationsOutline, IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
import useAuth from "../../../Hooks/UseAuth/UseAuth";

export default function DashboardNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user } = useAuth();

    return (
        <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-4 py-2.5">
            <div className="flex items-center justify-between">
                {/* Left - Logo/Brand */}
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
                </div>

                {/* Middle - Search Bar (hidden on mobile) */}
                <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <IoSearchOutline className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                        />
                    </div>
                </div>

                {/* Right - Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Selector */}
                    <div className="hidden md:flex items-center gap-1 cursor-pointer">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Eng (UK)</span>
                        <IoChevronDownOutline className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                        <IoNotificationsOutline className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <button
                                title={`${user.displayName}`}
                                tabIndex={0}
                                role="button"
                                className="m-1 transition-all hover:scale-105 focus:outline-none"
                            >
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 shadow-md hover:ring-secondary">
                                        <img
                                            src={user.photoURL}
                                            alt="User profile"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                </div>
                            </button>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-white dark:bg-gray-900 rounded-lg z-[1] w-56 p-2 shadow-lg font-semibold text-gray-700 dark:text-gray-200"
                            >
                                {user && (
                                    <>
                                        <li className="cursor-not-allowed pointer-events-none text-sm text-gray-500 dark:text-gray-400">
                                            <h2 className="p-2">👤 {user?.displayName}</h2>
                                        </li>
                                        <li className="cursor-not-allowed pointer-events-none text-sm text-gray-500 dark:text-gray-400">
                                            <h2 className="p-2">✉️ {user?.email}</h2>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 animate__animated animate__fadeIn animate__faster">
                                <ul className="py-1">
                                    <li>
                                        <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-red-400">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-3 md:hidden">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <IoSearchOutline className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                    />
                </div>
            </div>
        </nav>
    );
}
