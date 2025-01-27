import ReactLoading from 'react-loading';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import UseAdmin from '../../Hooks/UseAdmin/UseAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Pages/Shared/Loading/Loading';
import { toast } from 'react-toastify';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = UseAdmin();
    const location = useLocation();
    // console.log(role);
    // console.log({ loading, roleLoading });


    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (user && role === "admin") {
        return children;
    }

    return (
        <>
            {toast.error("You are not a valid user")}
            <Navigate to={'/'} state={location.pathname}></Navigate>
        </>
    )

};

export default AdminRoutes;