import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Award, Check, GraduationCap, Lock, ShieldCheck, Users, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLES } from '../../utils/constants';

export function RoleSelectorModal() {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    isRoleModalOpen,
    setIsRoleModalOpen,
    setIsAuthModalOpen,
    addToast,
  } = useApp();

  const handleSelectRole = (roleKey) => {
    // Strictly require authenticated credentials when switching to Faculty or Administrator
    if (roleKey !== 'Student' && !user?.isAuthenticated) {
      setIsRoleModalOpen(false);
      setIsAuthModalOpen(true);
      addToast(
        'warning',
        'AUTHENTICATION REQUIRED',
        `Access to ${roleKey} oversight dashboard strictly requires verified academic sign-in. Please authenticate.`
      );
      return;
    }

    setUser((prev) => ({
      ...prev,
      role: roleKey,
    }));
    setIsRoleModalOpen(false);
    addToast('success', 'ROLE ACTIVATED', `Active workspace configured as ${roleKey}.`);

    if (roleKey === 'Faculty') {
      navigate('/faculty');
    } else if (roleKey === 'Administrator') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const roleList = [
    {
      key: 'Student',
      icon: GraduationCap,
      ...ROLES.Student,
      features: ['Instant Answer Feedback', 'Unit-wise Question Filtering', 'Full Proctor Exam Mode', 'Mistake Review Solutions'],
    },
    {
      key: 'Faculty',
      icon: Users,
      ...ROLES.Faculty,
      requiresAuth: true,
      features: ['Live Candidate Surveillance', 'Real-Time Screen Share View', 'Disqualification & Motivation Rights', 'Permanent Cheating Evidence Audit'],
    },
    {
      key: 'Administrator',
      icon: ShieldCheck,
      ...ROLES.Administrator,
      requiresAuth: true,
      features: ['Master Student & Faculty Records', 'Supreme Anti-Cheating Telemetry', 'User Role Assignment Directory', 'Proctor Integrity Controls'],
    },
  ];

  return (
    <AnimatePresence>
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRoleModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-surface border border-app rounded-2xl shadow-2xl overflow-hidden z-10 p-6 md:p-8 text-main"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-app pb-5">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#10B981] uppercase block mb-1 font-bold">
                  PROFILE CONFIGURATION
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-main">
                  SELECT ACADEMIC ROLE
                </h3>
              </div>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="p-2 rounded-lg border border-app bg-surface-raised text-secondary hover:text-main transition-colors cursor-pointer"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            {/* Role Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {roleList.map((roleItem) => {
                const Icon = roleItem.icon;
                const isSelected = user.role === roleItem.key;
                const needsAuth = roleItem.requiresAuth && !user.isAuthenticated;

                return (
                  <button
                    key={roleItem.key}
                    onClick={() => handleSelectRole(roleItem.key)}
                    className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative group cursor-pointer ${
                      isSelected
                        ? 'border-[#10B981] bg-[#10B981]/10 shadow-md ring-2 ring-[#10B981]/20'
                        : needsAuth
                        ? 'border-app bg-surface-raised/70 hover:border-[#D64545]/50'
                        : 'border-app bg-surface-raised hover:border-[#10B981]/50'
                    }`}
                    type="button"
                  >
                    {/* Top Status */}
                    <div className="flex justify-between items-start w-full mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: `${roleItem.accent}20`, color: roleItem.accent }}
                      >
                        <Icon size={20} />
                      </div>
                      {isSelected ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#10B981] text-white font-bold">
                          ACTIVE
                        </span>
                      ) : needsAuth ? (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#D64545]/20 text-[#D64545] border border-[#D64545]/40 font-bold flex items-center gap-1">
                          <Lock size={9} /> AUTH REQUIRED
                        </span>
                      ) : null}
                    </div>

                    {/* Title & Blurb */}
                    <div className="space-y-2 mb-6">
                      <h4 className="text-lg font-display font-bold text-main">
                        {roleItem.name}
                      </h4>
                      <p className="text-xs text-secondary font-sans leading-relaxed">
                        {roleItem.blurb}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-2 border-t border-app pt-4 w-full">
                      {roleItem.features.map((feat) => (
                        <div key={feat} className="flex items-center text-[10px] font-mono text-muted">
                          <Check size={12} className="text-[#10B981] mr-1.5 shrink-0" />
                          <span className="text-main">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs font-mono text-muted border-t border-app pt-4">
              <span>Switching to Faculty or Admin requires verified academic authentication.</span>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="text-main hover:text-[#10B981] transition-colors uppercase font-bold cursor-pointer"
                type="button"
              >
                KEEP CURRENT →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}