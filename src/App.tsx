import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerMenu } from './components/menu/CustomerMenu';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { SuperAdminPortal } from './components/admin/SuperAdminPortal';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/common/AuthModal';
import { LiveDemoSwitcher } from './components/common/LiveDemoSwitcher';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* View Switcher Router */}
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'menu' && <CustomerMenu />}
      {currentView === 'dashboard' && <DashboardLayout />}
      {currentView === 'admin' && <SuperAdminPortal />}

      {/* Global Modals & Overlays */}
      <ToastContainer />
      <AuthModal />
      <LiveDemoSwitcher />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
