import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          
          {user && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Logged in as: <span className="font-medium">{user.name}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Role: <span className="font-medium">{user.role}</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          {user && (
            <Button onClick={logout} variant="destructive">
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;