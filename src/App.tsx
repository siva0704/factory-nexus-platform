import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* SuperAdmin Routes */}
            <Route 
              path="/superadmin" 
              element={
                <ProtectedRoute requiredRole="superadmin">
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Factory-specific Admin Routes */}
            <Route 
              path="/factory/:factoryCode/admin" 
              element={
                <ProtectedRoute requiredRole="admin" requiredFactoryAccess>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Factory-specific Supervisor Routes */}
            <Route 
              path="/factory/:factoryCode/supervisor" 
              element={
                <ProtectedRoute requiredRole="supervisor" requiredFactoryAccess>
                  <SupervisorDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Factory-specific Employee Routes */}
            <Route 
              path="/factory/:factoryCode/employee" 
              element={
                <ProtectedRoute requiredRole="employee" requiredFactoryAccess>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
