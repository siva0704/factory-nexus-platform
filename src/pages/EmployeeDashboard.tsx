import React from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CheckSquare, 
  Clock, 
  Award,
  Target,
  Calendar,
  AlertCircle
} from 'lucide-react';

const EmployeeDashboard: React.FC = () => {
  const { factoryCode } = useParams<{ factoryCode: string }>();
  const { user, factory } = useAuth();

  // Mock data for demonstration
  const mockData = {
    todayTasks: [
      { id: 1, title: "Machine Setup - Line A", status: "completed", priority: "high" },
      { id: 2, title: "Quality Check - Batch 023", status: "in-progress", priority: "medium" },
      { id: 3, title: "Safety Inspection", status: "pending", priority: "high" },
      { id: 4, title: "Material Loading", status: "pending", priority: "low" }
    ],
    stats: {
      tasksCompleted: 15,
      hoursWorked: 6.5,
      qualityScore: 96,
      attendance: 100
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Employee Dashboard - {factory?.name}
          </h1>
          <p className="text-muted-foreground">
            Welcome, {user?.name} ({user?.employee_id})
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <CheckSquare className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockData.stats.tasksCompleted}</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.hoursWorked}h</div>
              <p className="text-xs text-muted-foreground">
                Today's shift
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
              <Award className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockData.stats.qualityScore}%</div>
              <p className="text-xs text-muted-foreground">
                Above target (90%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Target className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockData.stats.attendance}%</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5" />
                <span>Today's Tasks</span>
              </CardTitle>
              <CardDescription>Your assigned tasks for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{task.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getStatusColor(task.status) as any}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                        <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority} priority
                        </span>
                      </div>
                    </div>
                    {task.status === 'pending' && (
                      <AlertCircle className="w-5 h-5 text-warning" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Quick Information</span>
              </CardTitle>
              <CardDescription>Important updates and announcements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Safety Reminder</h3>
                <p className="text-sm text-muted-foreground">
                  Always wear protective equipment when operating machinery. Report any safety concerns immediately.
                </p>
              </div>
              
              <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                <h3 className="font-medium text-success mb-2">Quality Achievement</h3>
                <p className="text-sm text-muted-foreground">
                  Congratulations! You've maintained quality standards above 95% for the past month.
                </p>
              </div>
              
              <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                <h3 className="font-medium text-warning mb-2">Upcoming Training</h3>
                <p className="text-sm text-muted-foreground">
                  New equipment training session scheduled for next Friday at 2:00 PM.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Section */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your performance metrics and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">This Week's Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-success" />
                    <span className="text-sm">Perfect attendance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckSquare className="w-5 h-5 text-success" />
                    <span className="text-sm">All tasks completed on time</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-success" />
                    <span className="text-sm">Quality targets exceeded</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Areas for Improvement</h3>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    • Consider taking the advanced machinery operation course
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Review safety protocols for handling materials
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Explore efficiency improvement techniques
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;