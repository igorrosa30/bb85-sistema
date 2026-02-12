'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    TrendingUp,
    Trophy,
    BookOpen,
    LogOut,
    Settings,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Performance', icon: TrendingUp, href: '/performance' },
        { name: 'Ranking', icon: Trophy, href: '/ranking' },
        { name: 'Simulados', icon: BookOpen, href: '/simulados' },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <h2 className="logo-text">
                    BB<span className="text-neon-yellow">85</span>
                </h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <div className={`icon-container ${isActive ? 'active' : ''}`}>
                                <Icon size={20} />
                            </div>
                            <span className="nav-text">{item.name}</span>
                            {isActive && <ChevronRight size={16} className="active-indicator" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout-btn">
                    <div className="icon-container">
                        <LogOut size={20} />
                    </div>
                    <span className="nav-text">Sair</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
