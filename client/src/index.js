import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthLayout from './AuthLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import ForgetPassword from "./Components/Forms/ForgetPassword";
import NewPassword from "./Components/Forms/NewPassword";
import Main from './Main';
import NotFoundPage from './Components/NotFoundPage';
import BodyMainPage from './Components/Body';
import Intro from './Components/Intro';
import ListTour from './Components/ListTour';

import Manager from './Components/Manager'
import ManagerTours from './Components/Manager/Tours/Tours'

import Guide from './Components/Guide'

import {OtpProvider} from './Contexts/OtpContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OtpProvider>
        <Router>
          <Routes>
            {/* layout authen */}
            <Route path='/auth' element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgetPassword' element={<ForgetPassword />} />
              <Route path='newPassword' element={<NewPassword />} />
            </Route>
            {/* Layout main page */}
            {["/", "/home"].map((path, index) => {
              return (
                <Route path={path} element={<Main />} key={index}>
                  <Route path='' element={<BodyMainPage />}>
                    <Route path='' element={<Intro />}></Route>
                  </Route>
                </Route>
              );
            })}

            <Route path='/manage' element={<Manager />}>
                <Route path='tours' element={<ManagerTours />}/>
            </Route>

            <Route path='/guide' element={<Guide />} />
            <Route path='/listTour' element={<ListTour />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>

        </Router>
    </OtpProvider>

  </React.StrictMode>
);

