import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Event from './Components/Event/Event';
import { LoginPage } from './Components/Login/LoginPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AddEvent } from './components/Event/AddEvent';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events" element={<Event />} />
        <Route path="/admin/AddEvent" element={<AddEvent />} />
        <Route path="/admin/EditEvent/:id" element={<AddEvent />} />

        {/* You can add more routes here, like the dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
