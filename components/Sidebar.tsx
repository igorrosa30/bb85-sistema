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
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
        { name: 'Simulados', icon: BookOpen, href: '/simulados' },
        { name: 'Performance', icon: TrendingUp, href: '/performance' },
        { name: 'Ranking', icon: History, href: '/ranking' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold">
                    <span className="text-blue-600">BB</span>
                    <span className="text-orange-500">85</span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">Sistema Pessoal</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                            {isActive && <ChevronRight size={16} className="ml-auto" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <Target className="text-blue-600" size={20} />
                    <div className="text-sm">
                        <div className="font-semibold text-gray-900">Meta: 85%</div>
                        <div className="text-gray-600">Rumo à aprovação</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
