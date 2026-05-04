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
    PenTool
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
        { name: 'Simulados', icon: BookOpen, href: '/simulados' },
        { name: 'Redação', icon: PenTool, href: '/redacao' },
        { name: 'Performance', icon: TrendingUp, href: '/performance' },
        { name: 'Ranking', icon: History, href: '/ranking' },
    ];

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

            <nav className="flex-1 p-4 space-y-1 mt-4">
                {menuItems.map((item) => {
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
