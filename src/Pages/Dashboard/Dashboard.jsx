import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdTour, MdManageHistory } from "react-icons/md";
import { TbBrandDaysCounter } from "react-icons/tb";
import { FaChevronCircleRight, FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import UseAdmin from "../../Hooks/UseAdmin/UseAdmin";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, handleLogout, setUser, loading } = useAuth();
    const { role, roleLoading } = UseAdmin();

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

    // Close the drawer when a link is clicked
    const closeDrawer = () => {
        document.getElementById("my-drawer").checked = false;
    };

    if (loading || roleLoading) return <p>Loading...</p>;

    return (
        <div className="bg-gray-200">
            <Helmet>
                <title>Dashboard | Traventure</title>
            </Helmet>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex">
                    {/* Page Content */}
                    <label
                        htmlFor="my-drawer"
                        className="drawer-button w-fit h-screen flex flex-col justify-center bg-black/40 hover:bg-black/50 cursor-pointer p-1 hover:text-white"
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
                    <ul className="menu p-4 w-80 bg-base-200 text-base-content h-screen">
                        <div className="mb-10">
                            <Link
                                to="/dashboard/admin/profile"
                                className="text-2xl font-bold cinzel-font tracking-[4px]"
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
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/profile"
                                        onClick={closeDrawer}
                                    >
                                        <CgProfile size={20} />
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/assigned-tour"
                                        onClick={closeDrawer}
                                    >
                                        <MdTour size={20} />
                                        My Assigned Tours
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/add-stories"
                                        onClick={closeDrawer}
                                    >
                                        <TbBrandDaysCounter size={20} />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/manage-stories"
                                        onClick={closeDrawer}
                                    >
                                        <MdManageHistory size={20} />
                                        Manage Stories
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* tour guide dashboard options section  */}
                        {role === "tourGuide" && (
                            <>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/profile"
                                        onClick={closeDrawer}
                                    >
                                        <CgProfile size={20} />
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/assigned-tour"
                                        onClick={closeDrawer}
                                    >
                                        <MdTour size={20} />
                                        My Assigned Tours
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/add-stories"
                                        onClick={closeDrawer}
                                    >
                                        <TbBrandDaysCounter size={20} />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/manage-stories"
                                        onClick={closeDrawer}
                                    >
                                        <MdManageHistory size={20} />
                                        Manage Stories
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* tourist dashboard options section  */}
                        {role === "tourist" && (
                            <>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/tourist/profile"
                                        onClick={closeDrawer}
                                    >
                                        <CgProfile size={20} />
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/tourist/bookings"
                                        onClick={closeDrawer}
                                    >
                                        <MdTour size={20} />
                                        My Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/add-stories"
                                        onClick={closeDrawer}
                                    >
                                        <TbBrandDaysCounter size={20} />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex items-center gap-3 font-bold"
                                        to="/dashboard/admin/manage-stories"
                                        onClick={closeDrawer}
                                    >
                                        <MdManageHistory size={20} />
                                        Manage Stories
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/* Divider */}
                        <div className="divider"></div>
                        {/* General Links */}
                        <li>
                            <NavLink
                                className="flex items-center gap-3 font-bold"
                                to="/"
                                onClick={closeDrawer}
                            >
                                <FaHome size={20} />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    closeDrawer();
                                    logoutHandler();
                                }}
                                className="flex items-center gap-3 font-bold"
                            >
                                <MdLogout size={20} />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
