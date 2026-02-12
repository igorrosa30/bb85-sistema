"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function PublicNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    BB<span className="text-yellow-400">85</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">Vantagens</Link>
                    <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Notícias</Link>
                    <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Entrar</Link>
                    <Link href="/register" className="btn-primary px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg shadow-blue-500/20 transition-all">
                        Começar Agora
                    </Link>
                </div>

                <button className="md:hidden text-gray-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 p-6 md:hidden flex flex-col gap-4 shadow-xl">
                    <Link href="/#features" className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Vantagens</Link>
                    <Link href="/blog" className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Notícias</Link>
                    <Link href="/login" className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Entrar</Link>
                    <Link href="/register" className="btn-primary text-center py-3 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Começar Agora</Link>
                </div>
            )}
        </nav>
    );
}
