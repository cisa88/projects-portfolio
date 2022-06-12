import './App.css';

import LandingPage from './apps/landing_page/app';
import Dashboard from './apps/dashboard/app';
import Login from './apps/login/components/login/login';
import ForgotPassword from './apps/login/components/forgot_password/forgot_password';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Insurance from './apps/insurance/insurance';
import Register from './apps/login/register';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/client" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />

          <Route path="/register" element={<Register />} />
          <Route path="/insurance" element={<Insurance />} />

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
