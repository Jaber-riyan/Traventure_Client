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
import TouristRoutes from './TouristRoutes/TouristRoutes';
import ManageProfileTourist from '../Pages/Dashboard/Tourist/ManageProfileTourist/ManageProfileTourist';
import MyBookings from '../Pages/Dashboard/Tourist/MyBookings/MyBookings';
import TourGuides from '../Pages/PackageDetails/TourGuides/TourGuides';
import TourGuideDetails from '../Pages/PackageDetails/TourGuides/TourGuideDetails/TourGuideDetails';
import JoinTourGuide from '../Pages/Dashboard/Tourist/JoinTourGuide/JoinTourGuide';

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
            }, 
            {
                path: 'guide/:id',
                element: <TourGuideDetails></TourGuideDetails>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        errorElement: <ErrorForRoot></ErrorForRoot>,
        children: [
            // shared routes 
            {
                path: 'profile/edit',
                element: <AdminProfileUpdate></AdminProfileUpdate>
            },
            // admin routes start
            {
                path: 'admin/profile',
                element: <AdminRoutes><ManageProfile></ManageProfile></AdminRoutes>
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
                element: <TouristRoutes><ManageProfileTourist></ManageProfileTourist></TouristRoutes>
            },
            {
                path: 'tourist/join-guide',
                element: <TouristRoutes><JoinTourGuide></JoinTourGuide></TouristRoutes>
            },
            {
                path: 'tourist/bookings',
                element: <TouristRoutes><MyBookings></MyBookings></TouristRoutes>
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