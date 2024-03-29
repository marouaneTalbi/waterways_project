import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Layout from './layouts/Layout/layout';
import UserAdmin from "./pages/Admin/userAdmin";
import RequestProvider from './pages/requestProvider/requestProvider';
import KabisRequests from './pages/requestProvider/KabisRequests';
import MyRequest from './pages/requestProvider/myRequest';
import MdpRestEmail from "./pages/Login/motDePasseOublier";
import ResetMdp from "./pages/Login/restmpd";
import UserProvider from './contexts/userContext';
import Profile from './pages/profile';
import ReservationPage from './pages/reservationPage';
import ProviderDashboard from './pages/providerDashboard';
import EstablishmentPage from './pages/Provider/establishmentPage';
import Notifications from './pages/notifications/notifications';
import Search from './pages/search';
import Boat from './pages/Public/boat';
import BoatComment from './components/Comment/CommentForm';
import { AuthProvider } from './contexts/authContext';
import BoatProvider from './pages/Provider/boatPage';
import NotFoundPage from './pages/httpErrors/404';
import UnauthorizedPage from './pages/httpErrors/403';
import ErrorPage from './pages/httpErrors/error';
import LandingPage from './pages/Langing/landingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="mdpresetemail" element={<MdpRestEmail />} />
            <Route path="resetmdp/:token" element={<ResetMdp />} />
            <Route path="establishment-page/:id" element={<EstablishmentPage />} />
            <Route path="register" element={<Register />} />
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<Profile />} />
            <Route path="boat/:id" element={<Boat />} />
            <Route path="provider/boat/:id" element={<BoatProvider />} />
            <Route path="reservation/:id" element={<ReservationPage />} />
            <Route path="admin" element={<UserAdmin /> } />
            <Route path="provider" element={<ProviderDashboard /> } />
            <Route path="requestProvider" element={<RequestProvider /> } />
            <Route path="admin/KbisRequests" element={<KabisRequests /> } />
            <Route path="myRequest" element={<MyRequest /> } />
            <Route path="notifications" element={<Notifications /> } />
            <Route path="addcomment" element={<BoatComment /> } />
            <Route path="NotFound" element={<NotFoundPage /> } />
            <Route path="403" element={<UnauthorizedPage /> } />
            <Route path="Error" element={<ErrorPage /> } />
            <Route path='*' element={<NotFoundPage/>} />
          </Route>
        </Routes>
        </UserProvider>
    </AuthProvider>
  </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
