import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Award, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function RedacaoDetalhesPage({ params }: { params: { id: string } }) {
    const redacao = await prisma.redacao.findUnique({
        where: { id: params.id }
    });

    if (!redacao) notFound();

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto">
            <header className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/redacao" className="p-2 hover:bg-white/5 rounded-full transition-all text-secondary hover:text-white">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                redacao.status === 'Corrigida' ? 'bg-green-500 text-black' : 'bg-neon-yellow text-black'
                            }`}>
                                {redacao.status}
                            </span>
                            <span className="text-xs text-secondary flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(redacao.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        <h1 className="text-2xl font-black text-white">{redacao.tema}</h1>
                    </div>
                </div>

                {redacao.nota !== null && (
                    <div className="bg-neon-blue/10 border border-neon-blue/30 p-4 rounded-2xl text-center min-w-[120px]">
                        <div className="text-[10px] font-black text-neon-blue uppercase">Nota Final</div>
                        <div className="text-4xl font-black text-white">{redacao.nota}</div>
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Essay Content */}
                <div className="lg:col-span-7">
                    <div className="glass-panel p-8 bg-white/[0.02] border-white/5 shadow-2xl min-h-[600px] relative overflow-hidden">
                        {/* Simulation of notebook paper lines */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '100% 32px' }}>
                        </div>
                        
                        <div className="relative z-10 font-serif text-lg leading-[32px] text-white/90 whitespace-pre-wrap">
                            {redacao.conteudo}
                        </div>
                    </div>
                </div>

                {/* Correction Area */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="glass-panel p-6 border-neon-blue/20">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Award size={20} className="text-neon-blue" />
                            Avaliação Cesgranrio
                        </h3>

                        {redacao.correcao ? (
                            <div className="prose prose-invert prose-sm max-w-none">
                                <div className="text-secondary leading-relaxed whitespace-pre-wrap text-sm">
                                    {redacao.correcao}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <AlertCircle size={40} className="mx-auto text-white/10 mb-3" />
                                <p className="text-sm text-secondary">Esta redação ainda não foi corrigida.</p>
                                <Link 
                                    href={`/redacao/nova?edit=${redacao.id}`}
                                    className="inline-block mt-4 text-xs font-bold text-neon-blue hover:underline"
                                >
                                    Abrir no assistente de correção →
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="glass-panel p-6 bg-green-500/5 border-green-500/20">
                        <h4 className="text-xs font-bold text-green-400 mb-3 flex items-center gap-2">
                            <CheckCircle2 size={14} />
                            Checklist de Aprovação
                        </h4>
                        <ul className="space-y-2">
                            {[
                                'Adequação ao Tema',
                                'Estrutura Dissertativa',
                                'Coesão (Conectivos)',
                                'Norma Culta',
                                'Mínimo de 20 linhas'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-[11px] text-secondary">
                                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
