import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RedacaoEditor from './redacao-editor';

export default function NovaRedacaoPage() {
    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-10 space-y-8 text-white">
            <header className="flex items-center gap-6">
                <Link href="/redacao" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-[#a1a1aa] hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase">Novo Treino de <span className="text-[#eaff20]">Redação</span></h1>
                    <p className="text-[#a1a1aa] font-medium text-xs tracking-widest uppercase mt-1">Foco na estrutura e argumentação sólida</p>
                </div>
            </header>

            <RedacaoEditor />
        </div>
    );
}

