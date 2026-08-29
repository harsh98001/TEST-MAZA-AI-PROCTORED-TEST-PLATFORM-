import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Database,
  Key,
  LogIn,
  LogOut,
  Mail,
  Moon,
  RotateCcw,
  Save,
  Shield,
  ShieldCheck,
  Sun,
  User,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';
import {
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  isConfigured,
  supabase,
} from '../lib/supabaseClient';

export function SettingsPage() {
  const {
    user,
    setUser,
    theme,
    setTheme,
    settings,
    setSettings,
    setIsAuthModalOpen,
    addToast,
  } = useApp();

  const [name, setName] = useState(user.name || '');
  const [sbUrl, setSbUrl] = useState('');
  const [sbKey, setSbKey] = useState('');
  const [isSbConnected, setIsSbConnected] = useState(false);

  useEffect(() => {
    const config = getStoredSupabaseConfig();
    setSbUrl(config.url || '');
    setSbKey(config.anonKey || '');
    setIsSbConnected(isConfigured());
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: name.trim() || 'Candidate',
    }));
    addToast('success', 'PROFILE UPDATED', 'User display name saved.');
  };

  const handleSaveSupabase = (e) => {
    e.preventDefault();
    if (!sbUrl || !sbKey) {
      addToast('error', 'INPUT REQUIRED', 'Please provide both Supabase URL and Anon Key.');
      return;
    }
    saveSupabaseConfig(sbUrl, sbKey);
    setIsSbConnected(isConfigured());
    addToast('success', 'SUPABASE SAVED', 'Supabase credentials updated successfully.');
  };

  const handleDisconnectSupabase = () => {
    clearSupabaseConfig();
    setSbUrl('');
    setSbKey('');
    setIsSbConnected(false);
    addToast('info', 'SUPABASE DISCONNECTED', 'Local Supabase credentials removed.');
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all local evaluation scores and session data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12 font-mono">
        {/* Header */}
        <div className="hairline-b pb-6 space-y-2">
          <span className="text-[10px] tracking-mono-label text-[#D64545] uppercase block">
            SYSTEM DIRECTORY // 05
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-main uppercase">
            SETTINGS & CONFIG
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-body max-w-xl leading-relaxed">
            Manage candidate authentication status, Supabase project keys, appearance mode, and examination integrity parameters.
          </p>
        </div>

        <div className="space-y-12 divide-y divide-app">
          {/* Section 1: Candidate Account & Verification Status */}
          <section className="space-y-4 pt-2">
            <h3 className="text-xl font-display font-medium text-main flex items-center gap-2 uppercase">
              <User size={18} className="text-[#D64545]" />
              Candidate Authentication Telemetry
            </h3>

            <div className="p-6 rounded-lg border border-app bg-surface space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded flex items-center justify-center text-xs font-bold ${
                    user.isAuthenticated ? 'bg-[#10B981] text-white' : 'bg-surface-raised border border-app text-muted'
                  }`}>
                    {user.isAuthenticated ? <ShieldCheck size={20} /> : <User size={20} />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <strong className="text-sm font-display text-main font-medium">{user.name}</strong>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        user.isAuthenticated ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]' : 'border-app bg-surface-raised text-muted'
                      }`}>
                        {user.isAuthenticated ? 'EMAIL VERIFIED' : 'UNAUTHENTICATED'}
                      </span>
                    </div>
                    <span className="text-xs text-secondary">
                      {user.email || 'No email verified. Click Authenticate to verify your email.'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-5 py-2.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white text-xs tracking-mono-label uppercase cursor-pointer"
                  type="button"
                >
                  {user.isAuthenticated ? 'SWITCH ACCOUNT' : 'VERIFY EMAIL / LOGIN'}
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Real Supabase Configuration */}
          <section className="space-y-4 pt-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-display font-medium text-main flex items-center gap-2 uppercase">
                <Database size={18} className="text-[#D64545]" />
                Supabase Production Project API
              </h3>
              <span className={`text-[10px] px-2.5 py-1 rounded border ${
                isSbConnected ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]' : 'border-[#D64545] bg-[#D64545]/10 text-[#D64545]'
              }`}>
                {isSbConnected ? 'CONNECTED' : 'NOT CONFIGURED'}
              </span>
            </div>

            <p className="text-xs text-secondary font-body leading-relaxed">
              To send real OTP codes and magic links to users' inboxes, connect your Supabase project. Keys can be set here or in your <code>.env</code> file.
            </p>

            <form onSubmit={handleSaveSupabase} className="p-6 rounded-lg border border-app bg-surface space-y-4">
              <div>
                <label className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
                  SUPABASE PROJECT URL
                </label>
                <input
                  type="text"
                  required
                  value={sbUrl}
                  onChange={(e) => setSbUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full px-4 py-2.5 rounded border border-app bg-surface-raised text-xs text-main outline-none focus:border-[#D64545]"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
                  SUPABASE ANON PUBLIC API KEY
                </label>
                <textarea
                  required
                  rows={2}
                  value={sbKey}
                  onChange={(e) => setSbKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-4 py-2.5 rounded border border-app bg-surface-raised text-xs text-main outline-none focus:border-[#D64545]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded bg-[#D64545] hover:bg-[#E05656] text-white text-xs tracking-mono-label uppercase cursor-pointer"
                >
                  SAVE CREDENTIALS
                </button>

                {isSbConnected && (
                  <button
                    type="button"
                    onClick={handleDisconnectSupabase}
                    className="px-4 py-3 rounded border border-app bg-surface-raised text-xs text-[#D64545] hover:bg-[#D64545]/10 cursor-pointer uppercase"
                  >
                    DISCONNECT
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Section 3: Appearance (Dark / Light toggle) */}
          <section className="space-y-4 pt-8">
            <h3 className="text-xl font-display font-medium text-main flex items-center gap-2 uppercase">
              <Sun size={18} className="text-[#D64545]" />
              Appearance Theme
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`px-6 py-3 rounded border text-xs tracking-mono-label flex items-center space-x-2 transition-all cursor-pointer uppercase ${
                  theme === 'dark'
                    ? 'border-[#D64545] bg-surface-raised text-main font-medium shadow-xs'
                    : 'border-app bg-surface text-secondary hover:text-main'
                }`}
                type="button"
              >
                <Moon size={14} />
                <span>EDITORIAL DARK</span>
              </button>

              <button
                onClick={() => setTheme('light')}
                className={`px-6 py-3 rounded border text-xs tracking-mono-label flex items-center space-x-2 transition-all cursor-pointer uppercase ${
                  theme === 'light'
                    ? 'border-[#D64545] bg-surface-raised text-main font-medium shadow-xs'
                    : 'border-app bg-surface text-secondary hover:text-main'
                }`}
                type="button"
              >
                <Sun size={14} className="text-[#D64545]" />
                <span>CLINICAL LIGHT</span>
              </button>
            </div>
          </section>

          {/* Section 4: Practice Automation */}
          <section className="space-y-4 pt-8">
            <h3 className="text-xl font-display font-medium text-main flex items-center gap-2 uppercase">
              <Zap size={18} className="text-[#10B981]" />
              Evaluation Automation
            </h3>
            <div className="space-y-3 max-w-lg">
              <label className="flex items-center justify-between p-4 rounded-lg border border-app bg-surface cursor-pointer">
                <div>
                  <strong className="text-xs text-main block uppercase">Auto-Advance on Correct Answer</strong>
                  <span className="text-[11px] text-secondary font-body">
                    Advances automatically after 700ms on accurate answer.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoAdvance}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, autoAdvance: e.target.checked }))
                  }
                  className="accent-[#D64545] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-lg border border-app bg-surface cursor-pointer">
                <div>
                  <strong className="text-xs text-main block uppercase">Custom Precision Cursor</strong>
                  <span className="text-[11px] text-secondary font-body">
                    Enable custom trailing ring cursor on desktop.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableCustomCursor}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, enableCustomCursor: e.target.checked }))
                  }
                  className="accent-[#D64545] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </section>

          {/* Section 5: Data Reset */}
          <section className="space-y-4 pt-8">
            <h3 className="text-xl font-display font-medium text-[#D64545] flex items-center gap-2 uppercase">
              <RotateCcw size={18} />
              DATA REPOSITORY PURGE
            </h3>
            <p className="text-xs text-secondary font-body leading-relaxed">
              Erase all locally stored evaluation records, completed phases, and session telemetry.
            </p>
            <button
              onClick={handleResetData}
              className="px-6 py-3 rounded border border-[#D64545]/40 text-[#D64545] hover:bg-[#D64545]/10 text-xs tracking-mono-label uppercase cursor-pointer"
              type="button"
            >
              PURGE ALL TEST DATA
            </button>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
