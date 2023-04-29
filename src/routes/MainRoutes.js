import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';

import {
    HomePage, HospitalPage, HospitalDetailPage, SchedulePage,
    UserPage, UserAuthPage, UserDetailPage,
    OrderPage, OrderDetailPage, HospitalSetPage, HospitalSetAddPage, DoctorPage,
    DoctorOrderDetailPage, DoctorOrderPage
} from '../pages'
import AuthRouter from './AuthRouter'
 
const MainRoutes = {
    path: '/', element: <MainLayout />,
    children: [
        { path: '/', element: <HomePage /> },
        {
            path: 'hospital',
            // , element: <HospitalPage />,
            children: [
                { path: '/hospital/list', element: <HospitalPage /> },
                { path: '/hospital/set', element: <HospitalSetPage /> },
                { path: '/hospital/setAdd', element: <HospitalSetAddPage /> },
                { path: '/hospital/detail', element: <HospitalDetailPage /> },
                { path: '/hospital/schedule', element: <SchedulePage /> },
            ]
        },
        {
            path: 'user', 
            children: [
                { path: '/user/list', element: <UserPage /> },
                { path: '/user/userAuth', element: <UserAuthPage /> },
                { path: '/user/detail', element: <UserDetailPage /> },
            ]
        },
        {
            path: 'doctor', 
            children: [
                { path: '/doctor/list', element: <DoctorPage /> }, 
            ]
        },
        {
            path: 'order',
            //  element: <OrderPage />
            children: [
                { path: '/order/list', element: <OrderPage /> }, 
                { path: '/order/detail', element: <OrderDetailPage /> },
            ]
        },
        {
            path: 'doctorOrder',
            //  element: <OrderPage />
            children: [
                { path: '/doctorOrder/list', element: <DoctorOrderPage /> }, 
                { path: '/doctorOrder/detail', element: <DoctorOrderDetailPage /> },
            ]
        },
    ]
};

export default MainRoutes;
