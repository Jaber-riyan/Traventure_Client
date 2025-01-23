import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/UseAuth/UseAuth';
import UseAdmin from '../../../Hooks/UseAdmin/UseAdmin';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, handleLogout, setUser } = useAuth();
    const isAdmin = UseAdmin();

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

            {user && isAdmin.isAdmin && (
                <NavLink
                    to={'/dashboard/admin-home'}
                    className={({ isActive }) =>
                        isActive
                            ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                            : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                    }
                >
                    Dashboard
                </NavLink>
            )}
            {user && !isAdmin.isAdmin && (
                <NavLink
                    to={'/dashboard/user-home'}
                    className={({ isActive }) =>
                        isActive
                            ? "hover:text-white/70 text-[#0040fffd] font-[700] text-[14px] cursor-pointer uppercase"
                            : "hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                    }
                >
                    Dashboard
                </NavLink>
            )}

            {user?.email ? (
                <>
                    <Link
                        onClick={logoutHandler}
                        className="hover:text-white/70 text-white font-[700] text-[14px] cursor-pointer uppercase"
                    >
                        Logout
                    </Link>
                    <NavLink className="flex gap-2 justify-center items-center text-[14px]">
                        {user && (
                            <Link title={`${user.displayName}`}>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                        <img
                                            src={user.photoURL}
                                            alt="User profile"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </NavLink>
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
                    <NavLink className="flex gap-2 justify-center items-center text-[14px]">
                        <div>
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                    <img
                                        src="https://i.ibb.co.com/nsJZRMr/profile.png"
                                        alt="User profile"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </>
            )}
        </>
    );

    return (
        <div>
            <div className="md:w-[80%] mx-auto">
                <nav>
                    <div className="navbar text-black">
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
                                    className="menu menu-sm dropdown-content bg-black/95 rounded-box z-[1] mt-3 w-52 p-2 shadow right-0"
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
