// App.js - Main Application Component
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
// import HospitalSettings from './pages/hospital/Settings';
import HospitalIncidentDetail from './pages/hospital/HospitalIncidentDetail';
import PoliceDashboard from './pages/police/PoliceDashboard';
// import PoliceIncidentDetail from './pages/police/IncidentDetail';
import NotFound from './pages/NotFound';
import HospitalDashboardMIOT from './pages/hospital/HospitalDashboardMIOT';
import HospitalDashboardMGM from './pages/hospital/HospitalDashboardMGM';


// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  
  return children;
};
// Redirect based on hospitalId
const HospitalDashboardRedirect = () => {
  const { hospitalId } = useAuth();

  if (hospitalId === 'miot') return <Navigate to="/hospital/dashboard/miot" />;
  if (hospitalId === 'mgm') return <Navigate to="/hospital/dashboard/mgm" />;
  return <Navigate to="/" />;
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Hospital Redirect Route */}
          <Route
            path="/hospital/dashboard"
            element={
              <ProtectedRoute allowedRoles={['hospital']}>
                <HospitalDashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* Individual Hospital Dashboards */}
          <Route
            path="/hospital/dashboard/miot"
            element={
              <ProtectedRoute allowedRoles={['hospital']}>
                <HospitalDashboardMIOT />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital/dashboard/mgm"
            element={
              <ProtectedRoute allowedRoles={['hospital']}>
                <HospitalDashboardMGM />
              </ProtectedRoute>
            }
          />
          
          Police Routes
          <Route 
            path="/police/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['police']}>
                <PoliceDashboard />
              </ProtectedRoute>
            } 
          />
    
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;