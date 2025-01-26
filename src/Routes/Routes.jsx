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
                path: 'admin/add-package',
                element: <AdminRoutes><div>Add Package</div></AdminRoutes>
            },
            {
                path: 'admin/assigned-tour',
                element: <AdminRoutes><div>Assigned Tour</div></AdminRoutes>
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
        ]
    }
])

export default router;