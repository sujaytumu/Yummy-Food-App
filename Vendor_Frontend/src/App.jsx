import React from 'react';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LandingPage from './vendorDashboard/pages/LandingPage';
import NavBar from './vendorDashboard/components/NavBar';
import Login from './vendorDashboard/components/forms/Login';
import NotFound from './vendorDashboard/components/NotFound';

import "./App.css";

const history = createBrowserHistory({ window });

const App = () => {
  return (
    <HistoryRouter
      history={history}
      future={{ v7_relativeSplatPath: true }} // ✅ Suppress future warning
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
};

export default App;
