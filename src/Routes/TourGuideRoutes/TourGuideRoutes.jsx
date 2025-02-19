import ReactLoading from 'react-loading';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import UseAdmin from '../../Hooks/UseAdmin/UseAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Pages/Shared/Loading/Loading';
import { toast } from 'react-toastify';

const TourGuideRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = UseAdmin();
    const location = useLocation();


    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (user && role === "tourGuide") {
        return children;
    }

    return (
        <>
            {toast.error("You are not a valid user")}
            <Navigate to={'/'}></Navigate>
        </>
    )
};

export default TourGuideRoutes;