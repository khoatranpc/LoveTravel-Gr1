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
import ManagerAccounts from './Components/Manager/Accounts'
import ManagerIncome from './Components/Manager/Income'

import Guide from './Components/Guide'
import GuideAccount from './Components/Guide/Account'
import GuideAccountSelectedTours from './Components/Guide/SelectedTours'

import User from './Components/User';
import UserBookedTours from './Components/User/BookedTours'
import UserAccount from './Components/User/Account'

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

            {/* Manager  */}
            <Route path='/manage' >
              <Route path='tours' element={<Manager />}/>
              <Route path='accounts' element={<ManagerAccounts />}/>
              <Route path='income' element={<ManagerIncome />}/>
            </Route>


            {/* Guide */}
            <Route path='/guide'>
              <Route path='' element={<Guide />}/>
              <Route path='account' element={<GuideAccount />}/>
              <Route path='selectedTours' element={<GuideAccountSelectedTours />}/>
            </Route>

          {/* User */}
          <Route path='/user'>
              <Route path='' element={<User />}/>
              <Route path='account' element={<UserAccount />}/>
              <Route path='bookedTours' element={<UserBookedTours />}/>
            </Route>

            <Route path='/listTour' element={<ListTour />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>

        </Router>
    </OtpProvider>

  </React.StrictMode>
);

