import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import Loading from '../../Pages/Shared/Loading/Loading';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoutes;