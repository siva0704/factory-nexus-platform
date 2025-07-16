import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { Factory, CreateFactoryRequest } from '@/types/auth';
import { 
  Building2, 
  Plus, 
  Users, 
  Activity,
  Calendar,
  Settings
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const SuperAdminDashboard: React.FC = () => {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();

  const [newFactory, setNewFactory] = useState<CreateFactoryRequest>({
    name: '',
    code: '',
    admin_email: '',
    admin_password: '',
    admin_name: ''
  });

  useEffect(() => {
    loadFactories();
  }, []);

  const loadFactories = async () => {
    try {
      setIsLoading(true);
      const data = await api.getFactories();
      setFactories(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load factories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFactory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const factory = await api.createFactory(newFactory);
      setFactories(prev => [...prev, factory]);
      setShowCreateDialog(false);
      setNewFactory({
        name: '',
        code: '',
        admin_email: '',
        admin_password: '',
        admin_name: ''
      });
      
      toast({
        title: "Success",
        description: `Factory "${factory.name}" created successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create factory",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const mockStats = {
    totalFactories: factories.length,
    totalUsers: factories.length * 15, // Mock calculation
    activeFactories: factories.filter(f => f.status === 'active').length,
    totalProduction: 2450 // Mock value
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">SuperAdmin Dashboard</h1>
            <p className="text-muted-foreground">Manage factories and global settings</p>
          </div>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Create Factory
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Factory</DialogTitle>
                <DialogDescription>
                  Set up a new factory with its admin user
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleCreateFactory} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="factory-name">Factory Name</Label>
                    <Input
                      id="factory-name"
                      placeholder="Sangam Fasteners Ltd"
                      value={newFactory.name}
                      onChange={(e) => setNewFactory(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="factory-code">Factory Code</Label>
                    <Input
                      id="factory-code"
                      placeholder="SFL"
                      value={newFactory.code}
                      onChange={(e) => setNewFactory(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-name">Admin Name</Label>
                  <Input
                    id="admin-name"
                    placeholder="John Doe"
                    value={newFactory.admin_name}
                    onChange={(e) => setNewFactory(prev => ({ ...prev, admin_name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@sfl.com"
                    value={newFactory.admin_email}
                    onChange={(e) => setNewFactory(prev => ({ ...prev, admin_email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Temporary password"
                    value={newFactory.admin_password}
                    onChange={(e) => setNewFactory(prev => ({ ...prev, admin_password: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Factory'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Factories</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalFactories}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.activeFactories} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Across all factories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">Online</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Production</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalProduction.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Units this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Factories List */}
        <Card>
          <CardHeader>
            <CardTitle>Factories</CardTitle>
            <CardDescription>Manage all factory locations and their administrators</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : factories.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No factories yet</h3>
                <p className="text-muted-foreground mb-4">Create your first factory to get started</p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Factory
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {factories.map((factory) => (
                  <div key={factory.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded bg-gradient-primary">
                        <Building2 className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{factory.name}</h3>
                        <p className="text-sm text-muted-foreground">Code: {factory.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={factory.status === 'active' ? 'default' : 'secondary'}>
                        {factory.status}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="text-sm font-medium">
                          {new Date(factory.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;