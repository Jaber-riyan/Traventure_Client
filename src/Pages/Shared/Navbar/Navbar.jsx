import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
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
                        ? "text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase dark:text-yellow-400"
                        : "text-white font-[700] text-[14px] cursor-pointer uppercase hover:text-gray-300 dark:hover:text-gray-400"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/community"
                className={({ isActive }) =>
                    isActive
                        ? "text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase dark:text-yellow-400"
                        : "text-white font-[700] text-[14px] cursor-pointer uppercase hover:text-gray-300 dark:hover:text-gray-400"
                }
            >
                Community
            </NavLink>
            <NavLink
                to="/about-us"
                className={({ isActive }) =>
                    isActive
                        ? "text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase dark:text-yellow-400"
                        : "text-white font-[700] text-[14px] cursor-pointer uppercase hover:text-gray-300 dark:hover:text-gray-400"
                }
            >
                About Us
            </NavLink>
            <NavLink
                to="/trips"
                className={({ isActive }) =>
                    isActive
                        ? "text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase dark:text-yellow-400"
                        : "text-white font-[700] text-[14px] cursor-pointer uppercase hover:text-gray-300 dark:hover:text-gray-400"
                }
            >
                Trips
            </NavLink>
            {user?.email ? (
                <>
                    <Link
                        onClick={logoutHandler}
                        className="text-white font-[700] text-[14px] cursor-pointer uppercase hover:text-gray-300 dark:hover:text-gray-400"
                    >
                        Logout
                    </Link>
                    <button className="flex gap-2 justify-center items-center text-[14px]">
                        {user && (
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <button
                                    title={`${user.displayName}`}
                                    tabIndex={0}
                                    role="button"
                                    className="m-1"
                                >
                                    <div className="avatar">
                                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
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
                                    className="dropdown-content menu bg-base-100 dark:bg-gray-800 text-black dark:text-white rounded-box z-[1] w-52 p-2 shadow font-semibold"
                                >
                                    <li>
                                        <Link to={role === "tourist" ? "/dashboard/tourist/profile" : role === "admin" ? "/dashboard/admin/profile" : "/dashboard/tour-guide/profile"}>Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link>Offer Announcement</Link>
                                    </li>
                                    <li className='cursor-not-allowed pointer-events-none'>
                                        <h2>User Name: {user?.displayName}</h2>
                                    </li>
                                    <li className='cursor-not-allowed pointer-events-none'>
                                        <h2>User Email: {user?.email}</h2>
                                    </li>
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
                                ? "text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase dark:text-yellow-400"
                                : "text-white font-[700] text-[14px] cursor-pointer uppercase hover:text-gray-300 dark:hover:text-gray-400"
                        }
                    >
                        Register
                    </NavLink>
                    <NavLink
                        to={'/login'}
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase dark:text-yellow-400"
                                : "text-white font-[700] text-[14px] cursor-pointer uppercase hover:text-gray-300 dark:hover:text-gray-400"
                        }
                    >
                        Login
                    </NavLink>
                </>
            )}
            <button
                onClick={toggleTheme}
                className="p-2 mb-2 text-black dark:text-white font-bold rounded-lg shadow-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-700"
            >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </>
    );

    return (
        <div className="dark:bg-gray-900 dark:text-white">
            <div className="md:w-[87%] mx-auto">
                <nav>
                    <div className="navbar">
                        <div className="navbar-start">
                            <Link to={'/'}>
                                <h2 className="text-2xl font-bold text-white dark:text-yellow-400">Traventure</h2>
                            </Link>
                        </div>
                        <div className="navbar-end">
                            <div className="lg:block hidden">
                                <ul className="menu-horizontal p-2 space-x-3 items-center justify-center">
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
