import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './components/auth/LoginPage';
import { CustomerMenu } from './components/menu/CustomerMenu';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { SuperAdminPortal } from './components/admin/SuperAdminPortal';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/common/AuthModal';

const AppContent: React.FC = () => {
  const { currentView, currentUser } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* View Switcher Router: Login First -> Restaurant Dashboard */}
      {(currentView === 'login' || (currentView === 'landing' && !currentUser)) && <LoginPage />}
      {currentView === 'menu' && <CustomerMenu />}
      {(currentView === 'dashboard' || (currentView === 'landing' && currentUser)) && <DashboardLayout />}
      {currentView === 'admin' && <SuperAdminPortal />}

      {/* Global Modals & Overlays */}
      <ToastContainer />
      <AuthModal />
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
