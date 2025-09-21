import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import IssueManagement from './pages/issue-management';
import UserManagement from './pages/user-management';
import MunicipalStaffDashboard from './pages/municipal-staff-dashboard';
import IssueTracking from './pages/issue-tracking';
import ReportIssue from './pages/report-issue';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
// import LoginForm from "./pages/login/components/LoginForm";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/issue-management" element={<IssueManagement />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/municipal-staff-dashboard" element={<MunicipalStaffDashboard />} />
        <Route path="/issue-tracking" element={<IssueTracking />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route
          path="/issue-report"
          element={
            <ProtectedRoute allowedRoles={['citizen']}>
              <IssueReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/municipal-staff-dashboard"
          element={
            <ProtectedRoute allowedRoles={['municipalStaff']}>
              <MunicipalStaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['superAdmin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
