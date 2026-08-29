import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LenisScrollProvider } from '../components/common/LenisScrollProvider';
import { Preloader } from '../components/common/Preloader';
import { CustomCursor } from '../components/common/CustomCursor';
import { Header } from '../components/common/Header';
import { FullscreenMenu } from '../components/common/FullscreenMenu';
import { CommandPalette } from '../components/common/CommandPalette';
import { SearchOverlay } from '../components/common/SearchOverlay';
import { RoleSelectorModal } from '../components/role/RoleSelectorModal';
import { AuthModal } from '../components/auth/AuthModal';
import { ToastContainer } from '../components/common/ToastContainer';
import { Footer } from '../components/common/Footer';
import { useApp } from '../context/AppContext';

export function AppShell() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const { isAuthModalOpen, setIsAuthModalOpen } = useApp();

  return (
    <LenisScrollProvider>
      <div className="min-h-screen flex flex-col bg-app text-main relative selection:bg-[#D64545] selection:text-white transition-colors duration-300 film-grain">
        {/* 1. Preloader */}
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

        {/* 2. Custom Precision Cursor */}
        <CustomCursor />

        {/* 3. Global Overlays & Modals */}
        <FullscreenMenu />
        <CommandPalette />
        <SearchOverlay />
        <RoleSelectorModal />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <ToastContainer />

        {/* 4. Fixed Minimalist Top Header */}
        <Header />

        {/* 5. Main Content Area */}
        <main className="flex-1 pt-16 md:pt-20 relative z-10">
          <Outlet />
        </main>

        {/* 6. Dense Editorial Footer */}
        <Footer />
      </div>
    </LenisScrollProvider>
  );
}
