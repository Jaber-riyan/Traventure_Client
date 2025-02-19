import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdTour, MdManageHistory, MdBookOnline, MdBook, MdAdd, MdOutlineVerifiedUser, MdMoreTime } from "react-icons/md";
import { TbBrandDaysCounter } from "react-icons/tb";
import { FaChevronCircleRight, FaHome, FaUserCheck, FaUsersCog } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import UseAdmin from "../../Hooks/UseAdmin/UseAdmin";
import { Helmet } from "react-helmet-async";
import { IoMdPersonAdd } from "react-icons/io";
import Loading from "../Shared/Loading/Loading";
import UseTheme from "../../Hooks/UseTheme/UseTheme";
import DashboardNavbar from "../Shared/DashboardNavbar/DashboardNavbar";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, handleLogout, setUser, loading } = useAuth();
    const { role, roleLoading } = UseAdmin();
    const location = useLocation();
    const { theme, setTheme } = UseTheme();

    // console.log(location.pathname);

    const logoutHandler = () => {
        handleLogout()
            .then(() => {
                Swal.fire({
                    title: "Logout Successfully",
                    icon: "success",
                });
                setUser(null);
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                toast.error(formattedError);
            });
    };

    // useEffect(() => {
    //     if (role) {
    //         const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    //         toast.success(`Welcome ${capitalize(role)} ${user?.displayName}`);
    //     }

    // }, [role, user?.displayName])

    // Close the drawer when a link is clicked
    const closeDrawer = () => {
        document.getElementById("my-drawer").checked = false;
    };

    // Toggle Theme Function
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    if (loading || roleLoading) return <Loading></Loading>;

    return (
        <div className={`bg-blue-100 dark:bg-gray-900`}>
            <Helmet>
                <title>Dashboard | Traventure</title>
            </Helmet>
            <nav className="sticky top-0 z-50">
                <DashboardNavbar></DashboardNavbar>
            </nav>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex">
                    {/* Page Content */}
                    <label
                    title="Menu"
                        htmlFor="my-drawer"
                        className="drawer-button w-fit flex flex-col justify-center bg-black/20 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-black/50 cursor-pointer p-1 hover:text-white"
                    >
                        <div>
                            <FaChevronCircleRight size={20} />
                        </div>
                    </label>
                    <section className="mx-auto w-[90%]">
                        <Outlet />
                    </section>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-200 text-base-content dark:bg-gray-900 dark:text-white h-screen">
                        <div className="mb-10">
                            <Link
                                to={role === "tourist" ? "/dashboard/tourist/profile" : role === "admin" ? "/dashboard/admin/profile" : "/dashboard/tour-guide/profile"}
                                className="text-2xl font-bold cinzel-font tracking-[4px] dark:text-white"
                                onClick={closeDrawer}
                            >
                                Traventure
                            </Link>
                        </div>
                        {/* admin guide dashboard section */}
                        {role === "admin" && (
                            <>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/admin/profile"
                                        onClick={closeDrawer}
                                    >
                                        <CgProfile size={20} />
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/admin/add-package"
                                        onClick={closeDrawer}
                                    >
                                        <MdAdd size={20} />
                                        Add Package
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/admin/manage-users"
                                        onClick={closeDrawer}
                                    >
                                        <FaUsersCog size={20} />
                                        Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/admin/manage-candidates"
                                        onClick={closeDrawer}
                                    >
                                        <FaUserCheck size={20} />
                                        Manage Candidates
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/admin/assigned-tour"
                                        onClick={closeDrawer}
                                    >
                                        <MdTour size={20} />
                                        My Assigned Tours
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/add-stories"
                                        onClick={closeDrawer}
                                    >
                                        <TbBrandDaysCounter size={20} />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/manage-stories"
                                        onClick={closeDrawer}
                                    >
                                        <MdManageHistory size={20} />
                                        Manage Stories
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* tour guide dashboard options section */}
                        {role === "tourGuide" && (
                            <>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/tour-guide/profile"
                                        onClick={closeDrawer}
                                    >
                                        <CgProfile size={20} />
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/tour-guide/assigned-tour"
                                        onClick={closeDrawer}
                                    >
                                        <MdTour size={20} />
                                        My Assigned Tours
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/add-stories"
                                        onClick={closeDrawer}
                                    >
                                        <TbBrandDaysCounter size={20} />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/manage-stories"
                                        onClick={closeDrawer}
                                    >
                                        <MdManageHistory size={20} />
                                        Manage Stories
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* tourist dashboard options section */}
                        {role === "tourist" && (
                            <>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/tourist/profile"
                                        onClick={closeDrawer}
                                    >
                                        <CgProfile size={20} />
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/tourist/bookings"
                                        onClick={closeDrawer}
                                    >
                                        <MdBook size={20} />
                                        My Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/add-stories"
                                        onClick={closeDrawer}
                                    >
                                        <TbBrandDaysCounter size={20} />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/manage-stories"
                                        onClick={closeDrawer}
                                    >
                                        <MdManageHistory size={20} />
                                        Manage Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/tourist/join-guide"
                                        onClick={closeDrawer}
                                    >
                                        <IoMdPersonAdd size={20} />
                                        Join as tour guide
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold dark:text-white"
                                        to="/dashboard/payment-history"
                                        onClick={closeDrawer}
                                    >
                                        <MdMoreTime size={20} />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/* Divider */}
                        <div className="divider dark:border-gray-600"></div>
                        {/* General Links */}
                        <li>
                            <NavLink
                                className="flex items-center gap-3 font-bold dark:text-white"
                                to="/"
                                onClick={closeDrawer}
                            >
                                <FaHome size={20} />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={toggleTheme}
                                className="p-2 mb-2 text-black dark:text-white font-bold rounded-lg shadow-md bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-700"
                            >
                                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
