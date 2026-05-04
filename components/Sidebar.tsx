'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    TrendingUp,
    BookOpen,
    History,
    Target,
    ChevronRight,
    PenTool,
    Zap,
    Trophy,
    Flame
} from 'lucide-react';
import { getUserProfile } from '@/app/actions';

const Sidebar = () => {
    const pathname = usePathname();
    const [profile, setProfile] = React.useState<any>(null);

    React.useEffect(() => {
        getUserProfile().then(setProfile);
    }, [pathname]);

    const xpNextLevel = profile ? Math.floor(100 * Math.pow(profile.level, 1.5)) : 100;
    const xpProgress = profile ? (profile.xp / xpNextLevel) * 100 : 0;

    const levelNames = ["Recruta", "Soldado", "Cabo", "Sargento", "Tenente", "Capitão", "Major", "Coronel", "General", "Supreme"];
    const levelName = profile ? (levelNames[profile.level - 1] || "Lenda") : "Recruta";

    return (
        <aside className="w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen sticky top-0">
            <div className="p-8 border-b border-white/5">
                <h2 className="text-3xl font-black tracking-tighter">
                    <span className="text-neon-blue">BB</span>
                    <span className="text-white">85</span>
                    <span className="text-neon-yellow text-xs ml-1 align-top">X</span>
                </h2>
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest mt-1 opacity-60">Agente de Tecnologia</p>
            </div>

            {/* Gamification Stats */}
            <div className="px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-neon-yellow/20 flex items-center justify-center text-neon-yellow">
                            <Flame size={18} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black text-white">{profile?.streak || 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                            <Trophy size={18} />
                        </div>
                        <span className="text-sm font-black text-white">LVL {profile?.level || 1}</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black uppercase text-secondary">
                        <span>{levelName}</span>
                        <span>{profile?.xp || 0} / {xpNextLevel} XP</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                            className="h-full bg-gradient-to-r from-neon-blue to-cyan-400 transition-all duration-1000 shadow-[0_0_10px_rgba(0,163,255,0.5)]"
                            style={{ width: `${xpProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 mt-2">
                {[
                    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
                    { name: 'Simulados', icon: BookOpen, href: '/simulados' },
                    { name: 'Redação', icon: PenTool, href: '/redacao' },
                    { name: 'Performance', icon: TrendingUp, href: '/performance' },
                    { name: 'Ranking', icon: History, href: '/ranking' },
                ].map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                ? 'bg-neon-blue text-black font-black shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                                : 'text-secondary hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon size={20} className={isActive ? 'text-black' : 'group-hover:text-neon-blue transition-colors'} />
                            <span className="text-sm">{item.name}</span>
                            {isActive && <ChevronRight size={14} className="ml-auto" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-white/5">
                <div className="p-4 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-2 bg-neon-blue/20 rounded-lg">
                            <Target className="text-neon-blue" size={18} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-secondary uppercase">Meta Vital</div>
                            <div className="text-sm font-black text-white">85% DE ACERTOS</div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};


export default Sidebar;
