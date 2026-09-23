import React from 'react';
import { Home, BookOpen, Terminal, Award, Briefcase } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isLoggedIn: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  isLoggedIn
}) => {
  if (!isLoggedIn) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'curriculum', label: '15 Days', icon: BookOpen },
    { id: 'simulators', label: 'Labs', icon: Terminal },
    { id: 'assessment', label: 'Mock Test', icon: Award },
    { id: 'interview', label: 'Interview', icon: Briefcase }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#070d1e]/95 backdrop-blur-lg border-t border-cyan-900/50 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id || (item.id === 'simulators' && currentTab.startsWith('sim-'));

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive 
                ? 'text-cyan-400 bg-cyan-950/60 scale-105' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
