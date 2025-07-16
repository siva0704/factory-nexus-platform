import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  LogOut, 
  User as UserIcon,
  Settings,
  Bell
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, factory, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin': return 'bg-destructive text-destructive-foreground';
      case 'admin': return 'bg-primary text-primary-foreground';
      case 'supervisor': return 'bg-warning text-warning-foreground';
      case 'employee': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="h-16 bg-card border-b border-border">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo and Factory Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-primary">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Factory Nexus</span>
            </div>
            
            {factory && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-muted rounded-md">
                <span className="text-sm font-medium text-muted-foreground">
                  {factory.name} ({factory.code})
                </span>
              </div>
            )}
          </div>

          {/* Right Side - Notifications and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs font-medium">
                      {getInitials(user?.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <div className="flex items-center space-x-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${getRoleBadgeColor(user?.role || '')}`}>
                        {user?.role?.toUpperCase()}
                      </span>
                      {user?.employee_id && (
                        <span className="text-xs text-muted-foreground">
                          {user.employee_id}
                        </span>
                      )}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};