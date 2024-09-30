import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Dashboard } from './components/Dashboard/Dashboard';
import { AddEvent } from './components/Event/AddEvent';
import { Event } from './components/Event/Event';
import { LoginPage } from './components/login/LoginPage';
import { Ads } from './components/Ads/Ads';
import { Reports } from './components/reports/Reports';
import { AdminUsers } from './components/adminusers/AdminUsers';
import { Feedback } from './components/feedbacks/Feedback';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events" element={<Event />} />
        <Route path="/admin/AddEvent" element={<AddEvent />} />
<Route path='/admin/ads' element={<Ads/>}/>
<Route path='/admin/reports' element={<Reports/>}/>
<Route path='/admin/admin-user' element={<AdminUsers/>}/>
<Route path='/admin/feedbacks' element={<Feedback/>}/>

        <Route path="/admin/EditEvent/:id" element={<AddEvent />} />

        {/* You can add more routes here, like the dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
