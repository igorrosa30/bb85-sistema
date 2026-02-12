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
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-white py-4"} border-b border-gray-200`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    <span className="text-[#003D82]">BB</span><span className="text-[#FF9500]">85</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#vantagens" className="text-gray-700 hover:text-[#003D82] transition-colors font-medium">
                        Vantagens
                    </Link>
                    <Link href="/blog" className="text-gray-700 hover:text-[#003D82] transition-colors font-medium">
                        Notícias
                    </Link>
                    <Link href="/login" className="text-gray-700 hover:text-[#003D82] transition-colors font-medium">
                        Entrar
                    </Link>
                    <Link href="/register" className="btn-primary px-6 py-2.5 rounded-lg text-sm font-bold">
                        Começar Grátis
                    </Link>
                </div>

                <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 md:hidden flex flex-col gap-4 shadow-lg">
                    <Link href="/#vantagens" className="text-gray-700 hover:text-[#003D82] font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        Vantagens
                    </Link>
                    <Link href="/blog" className="text-gray-700 hover:text-[#003D82] font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        Notícias
                    </Link>
                    <Link href="/login" className="text-gray-700 hover:text-[#003D82] font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        Entrar
                    </Link>
                    <Link href="/register" className="btn-primary text-center py-3 rounded-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                        Começar Grátis
                    </Link>
                </div>
            )}
        </nav>
    );
}
