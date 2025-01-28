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
import AddStories from '../Pages/AddStories/AddStories';
import ManageProfileTourGuide from '../Pages/Dashboard/TourGuide/ManageProfile/ManageProfileTourGuide';
import AllStories from '../Pages/AddStories/AllStories/AllStories';
import Community from '../Pages/Community/Community';
import GuideBookings from '../Pages/Dashboard/TourGuide/GuideBookings/GuideBookings';
import Payment from '../Pages/Payment/Payment';

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
            },
            {
                path: 'community',
                element: <Community></Community>
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
                path: 'add-stories',
                element: <PrivateRoutes><AddStories></AddStories></PrivateRoutes>
            },
            {
                path: 'manage-stories',
                element: <PrivateRoutes><AllStories></AllStories></PrivateRoutes>
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
                element: <TourGuideRoutes><ManageProfileTourGuide></ManageProfileTourGuide></TourGuideRoutes>
            },
            {
                path: 'tour-guide/assigned-tour',
                element: <TourGuideRoutes><GuideBookings></GuideBookings></TourGuideRoutes>
            },
            // tour guide routes end 

            {
                path: 'payment',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
            }

        ]
    }
])

export default router;