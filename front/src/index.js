import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Search from './pages/Search/search';
import Layout from './layouts/Layout/layout';
import Profile from './pages/Profile/profile';
import UserAdmin from "./pages/Admin/userAdmin";
import RequestProvider from './pages/requestProvider/requestProvider';
import KabisRequests from './pages/requestProvider/KabisRequests';
import MdpRestEmail from "./pages/Login/motDePasseOublier";
import ResetMdp from "./pages/Login/restmpd";
import UserProvider from "./pages/Provider/userProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="mdpresetemail" element={<MdpRestEmail />} />
        <Route path="resetmdp/:token" element={<ResetMdp />} />
        <Route path="register" element={<Register />} />
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<UserAdmin /> } />
        <Route path="provider" element={<UserProvider /> } />
        <Route path="requestProvider" element={<RequestProvider /> } />
        <Route path="KabisRequests" element={<KabisRequests /> } />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
