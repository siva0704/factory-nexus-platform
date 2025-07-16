import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, factory } = useAuth();

  // Redirect based on user role and factory
  if (user) {
    switch (user.role) {
      case 'superadmin':
        return <Navigate to="/superadmin" replace />;
      case 'admin':
        return <Navigate to={`/factory/${factory?.code?.toLowerCase() || 'unknown'}/admin`} replace />;
      case 'supervisor':
        return <Navigate to={`/factory/${factory?.code?.toLowerCase() || 'unknown'}/supervisor`} replace />;
      case 'employee':
        return <Navigate to={`/factory/${factory?.code?.toLowerCase() || 'unknown'}/employee`} replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Redirecting...</h1>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;