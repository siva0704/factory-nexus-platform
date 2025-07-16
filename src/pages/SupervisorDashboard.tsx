import React from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Clipboard, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

const SupervisorDashboard: React.FC = () => {
  const { factoryCode } = useParams<{ factoryCode: string }>();
  const { user, factory } = useAuth();

  // Mock data for demonstration
  const mockStats = {
    tasksToday: 12,
    teamMembers: 8,
    pendingIssues: 3,
    completedTasks: 28,
    efficiency: 94,
    production: 1250
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Supervisor Dashboard - {factory?.name}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name} ({user?.employee_id})
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.tasksToday}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.completedTasks} completed this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.teamMembers}</div>
              <p className="text-xs text-muted-foreground">
                Under your supervision
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{mockStats.pendingIssues}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <BarChart3 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockStats.efficiency}%</div>
              <p className="text-xs text-muted-foreground">
                Team performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Production</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.production.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Units produced today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5h</div>
              <p className="text-xs text-muted-foreground">
                Today's shift
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common supervisor tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <h3 className="font-medium">Assign Daily Tasks</h3>
                  <p className="text-sm text-muted-foreground">Distribute work assignments to team members</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <h3 className="font-medium">Review Production Reports</h3>
                  <p className="text-sm text-muted-foreground">Check daily production metrics and quality reports</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <h3 className="font-medium">Schedule Maintenance</h3>
                  <p className="text-sm text-muted-foreground">Plan and schedule equipment maintenance</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <h3 className="font-medium">Safety Inspection</h3>
                  <p className="text-sm text-muted-foreground">Conduct safety checks and report issues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Morning shift completed successfully</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Equipment maintenance scheduled</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">New safety protocol implemented</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Quality targets exceeded</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for Future Features */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
            <CardDescription>Monitor your team's productivity and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground">
                Detailed performance charts and analytics will be available here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SupervisorDashboard;