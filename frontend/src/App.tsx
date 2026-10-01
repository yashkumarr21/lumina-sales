import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ShaderBackground } from './components/common/ShaderBackground';
import { BookDemoModal } from './components/common/BookDemoModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { ShaderSandboxPage } from './pages/ShaderSandboxPage';
import { AuthPage } from './pages/AuthPage';
import { NavigationPage } from './types';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background relative selection:bg-primary-container selection:text-white">
      {/* Background WebGL Aurora Animation */}
      {currentPage !== 'shader' && (
        <ShaderBackground speedMultiplier={1.0} opacity={0.45} interactive={true} />
      )}

      {/* Top Glassmorphic Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Page Content */}
      <div className="flex-grow flex flex-col">
        {currentPage === 'home' && (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenDemo={() => setIsDemoModalOpen(true)}
          />
        )}
        {currentPage === 'dashboard' && (
          <DashboardPage onOpenDemo={() => setIsDemoModalOpen(true)} />
        )}
        {currentPage === 'features' && (
          <FeaturesPage onOpenDemo={() => setIsDemoModalOpen(true)} />
        )}
        {currentPage === 'pricing' && (
          <PricingPage onOpenDemo={() => setIsDemoModalOpen(true)} />
        )}
        {currentPage === 'shader' && <ShaderSandboxPage />}
        {(currentPage === 'login' || currentPage === 'signup') && (
          <AuthPage
            initialMode={currentPage}
            onNavigate={handleNavigate}
            onSuccessRedirect={(page) => handleNavigate(page)}
          />
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Book Demo Executive Briefing Modal */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

export default App;
