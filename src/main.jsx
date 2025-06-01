import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/login/login';
import Home from './pages/home/home'
import Register from './pages/register/register';
import './index.css';
import Progression from './pages/progression/progression';
import Statistics from './pages/statistics/statistics';

const root = createRoot(document.getElementById('root'));

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route path='/home' element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }></Route>
              <Route path='/progression' element={
                <ProtectedRoute>
                  <Progression />
                </ProtectedRoute>
              }></Route>

              <Route path='/statistics' element={
                <ProtectedRoute>
                  <Statistics />
                </ProtectedRoute>
              }></Route>
              <Route path="/" element={<Navigate to="/home" replace />} />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

root.render(<App />);