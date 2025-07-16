import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, Users, Shield, Clock } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  // Redirect authenticated users to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-primary">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Factory Nexus</span>
          </div>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Multi-Factory Management
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Streamline operations across multiple manufacturing facilities with role-based access control, 
              user management, and isolated data architecture designed for enterprise-scale factory operations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90" asChild>
              <a href="/login">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Built for Modern Manufacturing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for companies like Sangam Fasteners Pvt Ltd managing multiple 
              factory locations with complex organizational hierarchies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card border border-border rounded-lg shadow-soft">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Factory Support</h3>
              <p className="text-muted-foreground">
                Manage multiple manufacturing facilities with isolated data and factory-specific operations.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg shadow-soft">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Role-Based Access</h3>
              <p className="text-muted-foreground">
                Four-tier access control: SuperAdmin, Admin, Supervisor, and Employee with appropriate permissions.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg shadow-soft">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">User Management</h3>
              <p className="text-muted-foreground">
                Automated ID generation (SFLEMP001, SFLSUVR001) and comprehensive user lifecycle management.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg shadow-soft">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Scalable Architecture</h3>
              <p className="text-muted-foreground">
                Built to handle 1,000+ concurrent users with factory-isolated data collections for security.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg shadow-soft">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                JWT authentication, bcrypt password hashing, and comprehensive security logging.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg shadow-soft">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Factory Isolation</h3>
              <p className="text-muted-foreground">
                Complete data separation between factories using dedicated MongoDB collections per facility.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center">
          <div className="p-12 bg-gradient-primary rounded-2xl text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Factory Operations?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join leading manufacturers who trust Factory Nexus for their multi-facility operations management.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="/login">Start Your Journey</a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-2">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              Factory Nexus Platform - Built for Enterprise Manufacturing
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
