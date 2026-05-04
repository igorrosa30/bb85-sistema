import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RedacaoEditor from './redacao-editor';

export default function NovaRedacaoPage() {
    return (
        <div className="p-6 md:p-8">
            <header className="mb-8 flex items-center gap-4">
                <Link href="/redacao" className="p-2 hover:bg-white/5 rounded-full transition-all text-secondary hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white">Novo Treino de Redação</h1>
                    <p className="text-sm text-secondary">Foco na estrutura e argumentação sólida</p>
                </div>
            </header>

            <RedacaoEditor />
        </div>
    );
}
