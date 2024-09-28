import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Event from './Components/Event/Event';
import AddEvent from './Components/Event/AddEvent';
import { LoginPage } from './Components/Login/LoginPage';


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
