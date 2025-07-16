import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User['role'];
  requiredFactoryAccess?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredFactoryAccess = false
}) => {
  const { user, factory, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole) {
    const roleHierarchy = {
      superadmin: 4,
      admin: 3,
      supervisor: 2,
      employee: 1
    };

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check factory access for non-superadmin users
  if (requiredFactoryAccess && user.role !== 'superadmin' && !factory) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};