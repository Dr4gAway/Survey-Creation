import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './views/Dashboard'
import Surveys from './views/Surveys'

import GuestLayout from './components/GuestLayout'
import Login from './views/Login'
import Signup from './views/Signup'
import DefaultLayout from './components/DefaultLayout';
import SurveyView from './views/SurveyView';
import SurveyPublicView from './views/SurveyPublicView';

const router = createBrowserRouter( [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/Dashboard',
                element: <Navigate to='/' />
            },
            {
                path: '/Surveys',
                element: <Surveys />
            },
            {
                path: '/Surveys/Create',
                element: <SurveyView />
            },
            {
                path: '/Surveys/:id',
                element: <SurveyView />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    },
    {
        path: "survey/public/:slug",
        element: <SurveyPublicView />
    }
]);

export default router;