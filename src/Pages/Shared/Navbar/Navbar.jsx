import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/UseAuth/UseAuth';
import UseAdmin from '../../../Hooks/UseAdmin/UseAdmin';
import UseTheme from '../../../Hooks/UseTheme/UseTheme';
import { useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, handleLogout, setUser } = useAuth();
    const { role } = UseAdmin();
    const { theme, setTheme } = UseTheme();

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggle Theme Function
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const logoutHandler = () => {
        handleLogout()
            .then(res => {
                Swal.fire({
                    title: "Logout Successfully",
                    icon: 'success'
                });
                setUser(null);
                navigate('/login');
            })
            .catch(error => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                toast.error(formattedError);
            });
    };

    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                        : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/community"
                className={({ isActive }) =>
                    isActive
                        ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                        : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                }
            >
                Community
            </NavLink>
            <NavLink
                to="/about-us"
                className={({ isActive }) =>
                    isActive
                        ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                        : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                }
            >
                About Us
            </NavLink>
            <NavLink
                to="/trips"
                className={({ isActive }) =>
                    isActive
                        ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                        : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                }
            >
                Trips
            </NavLink>

            {user?.email ? (
                <>
                    <Link
                        onClick={logoutHandler}
                        className="hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                    >
                        Logout
                    </Link>
                    <button className="flex gap-2 justify-center items-center text-[14px] relative">
                        {user && (
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
                                    <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                        <Link
                                            to={
                                                role === "tourist"
                                                    ? "/dashboard/tourist/profile"
                                                    : role === "admin"
                                                        ? "/dashboard/admin/profile"
                                                        : "/dashboard/tour-guide/profile"
                                            }
                                            className="block p-2"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                        <Link className="block p-2">Offer Announcement</Link>
                                    </li>
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
                        )}
                    </button>
                </>
            ) : (
                <>
                    <NavLink
                        to={'/register'}
                        className={({ isActive }) =>
                            isActive
                                ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                                : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                        }
                    >
                        Register
                    </NavLink>
                    <NavLink
                        to={'/login'}
                        className={({ isActive }) =>
                            isActive
                                ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                                : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                        }
                    >
                        Login
                    </NavLink>
                </>
            )}

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="p-2 mb-2 text-black dark:text-white font-bold rounded-lg shadow-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-700"
            >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </>
    );

    return (
        <div>
            <div className="md:w-[87%] mx-auto">
                <nav>
                    <div className="navbar text-black dark:text-white">
                        <div className="navbar-start animate__animated animate__fadeInLeft">
                            <Link to={'/'}>
                                <h2 className="text-2xl font-bold cinzel-font text-white">Traventure</h2>
                            </Link>
                        </div>
                        <div className="navbar-end">
                            <div className="lg:block hidden animate__animated animate__fadeInRight">
                                <ul className="menu-horizontal p-2 space-x-3 items-center justify-center">
                                    {links}
                                </ul>
                            </div>
                            <div className="dropdown">
                                <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16"
                                        />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-black/95 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow right-0"
                                >
                                    {links}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
