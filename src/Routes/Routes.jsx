import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout/MainLayout';
import ErrorForRoot from '../Error/ErrorForRoot';
import Login from '../Pages/Shared/AuthComponents/Login';
import Register from '../Pages/Shared/AuthComponents/Register';
import Home from '../Pages/Home/Home';
import ForgatPassword from '../Pages/ForgatPassword/ForgatPassword';
import Dashboard from '../Pages/Dashboard/Dashboard';
import AdminRoutes from './AdminRoutes/AdminRoutes';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import ManageProfile from '../Pages/Dashboard/Admin/ManageProfile/ManageProfile';
import AdminProfileUpdate from '../Pages/Dashboard/Admin/AdminProfileUpdate/AdminProfileUpdate';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers/ManageUsers';
import ManageCandidates from '../Pages/Dashboard/Admin/ManageCandidates/ManageCandidates';
import AddPackage from '../Pages/Dashboard/Admin/AddPackage/AddPackage';
import TourGuideRoutes from './TourGuideRoutes/TourGuideRoutes';
import AssignedTour from '../Pages/Dashboard/Admin/AssignedTour/AssignedTour';
import PackageDetails from '../Pages/PackageDetails/PackageDetails';
import Trips from '../Pages/Trips/Trips';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorForRoot></ErrorForRoot>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'forgat-password',
                element: <ForgatPassword></ForgatPassword>
            },
            {
                path: 'package-details/:id',
                element: <PackageDetails></PackageDetails>
            },
            {
                path: 'trips',
                element: <Trips></Trips>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        errorElement: <ErrorForRoot></ErrorForRoot>,
        children: [
            // admin routes start
            {
                path: 'admin/profile',
                element: <AdminRoutes><ManageProfile></ManageProfile></AdminRoutes>
            },
            {
                path: 'admin/profile/edit',
                element: <AdminRoutes><AdminProfileUpdate></AdminProfileUpdate></AdminRoutes>
            },
            {
                path: 'admin/manage-users',
                element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
            },
            {
                path: 'admin/manage-candidates',
                element: <AdminRoutes><ManageCandidates></ManageCandidates></AdminRoutes>
            },
            {
                path: 'admin/add-package',
                element: <AdminRoutes><AddPackage></AddPackage></AdminRoutes>
            },
            {
                path: 'admin/assigned-tour',
                element: <AdminRoutes><AssignedTour></AssignedTour></AdminRoutes>
            },
            {
                path: 'admin/add-stories',
                element: <AdminRoutes><div>Add stories</div></AdminRoutes>
            },
            {
                path: 'admin/manage-stories',
                element: <AdminRoutes><div>manage stories</div></AdminRoutes>
            },
            // admin routes end


            // tourist routes start 
            {
                path: 'tourist/profile',
                element: <PrivateRoutes><div>tourist profile</div></PrivateRoutes>
            },
            // tourist routes end


            // tour guide routes start 
            {
                path: 'tour-guide/profile',
                element: <TourGuideRoutes><div>Tour Guide Profile</div></TourGuideRoutes>
            },
            // tour guide routes end 
        ]
    }
])

export default router;