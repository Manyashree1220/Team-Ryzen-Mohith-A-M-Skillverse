import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RecruiterDashboard from './pages/RecruiterDashboard'
import JobDetails from './pages/JobDetails'
import CandidateProfile from './pages/CandidateProfile'
import CandidateDashboard from './pages/CandidateDashboard'
import ProfileBuilder from './pages/ProfileBuilder'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Student/Candidate routes */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/profile"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <ProfileBuilder />
          </ProtectedRoute>
        }
      />
      <Route path="/candidate/:id" element={<CandidateProfile />} />
      
      {/* Recruiter routes */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/job/:id"
        element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <JobDetails />
          </ProtectedRoute>
        }
      />
      
      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}