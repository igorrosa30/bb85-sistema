import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
    FileText,
    Calendar,
    CheckCircle,
    Clock,
    ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';


export default async function SimuladosPage() {
    let provas = [];
    try {
        provas = await prisma.prova.findMany({
            orderBy: { ano: 'desc' }
        });
        console.log(`Página Simulados: ${provas.length} provas encontradas.`);
    } catch (error) {
        console.error("ERRO CRÍTICO NO BANCO:", error);
    }

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-10 max-w-7xl mx-auto text-white">
            <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter uppercase">
                    Centro de <span className="text-[#00a3ff]">Treinamento</span>
                </h1>
                <p className="text-[#a1a1aa] mt-2 font-medium italic">Simulados BB85-X Supreme</p>
            </header>

            {provas.length === 0 ? (
                <div className="bg-white/5 border border-white/10 p-12 text-center rounded-2xl">
                    <p className="text-[#a1a1aa]">Nenhuma prova encontrada.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {provas.map((prova) => (
                        <Link key={prova.id} href={`/simulado/${prova.id}`} className="block group">
                            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl group-hover:border-[#00a3ff]/50 transition-all">
                                <div className="text-[#00a3ff] mb-4">
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-xl font-black mb-1">{prova.cargo}</h3>
                                <p className="text-xs font-bold text-[#a1a1aa] uppercase mb-4">{prova.tipo_prova} • {prova.ano}</p>
                                <div className="flex items-center text-[#00a3ff] text-xs font-black uppercase">
                                    Iniciar Combate <ArrowRight size={14} className="ml-2" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}


