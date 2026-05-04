import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PenTool, FileText, Award, Info, Plus, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RedacaoPage() {
    const redacoes = await prisma.redacao.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="redacao-container p-6 md:p-8">
            <header className="page-header mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Laboratório de Redação</h1>
                    <p className="text-secondary mt-1">Treine para a nota 100 com o padrão Cesgranrio</p>
                </div>
                
                <Link 
                    href="/redacao/nova" 
                    className="flex items-center gap-2 bg-neon-blue text-black font-black px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                >
                    <Plus size={20} />
                    NOVA REDAÇÃO
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Writing History */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                        <FileText size={20} className="text-neon-blue" />
                        Seu Histórico de Treino
                    </h2>

                    {redacoes.length === 0 ? (
                        <div className="glass-panel p-12 text-center border-dashed border-2 border-white/10 rounded-2xl">
                            <PenTool size={48} className="mx-auto text-white/20 mb-4" />
                            <p className="text-secondary font-medium">Você ainda não escreveu nenhuma redação.</p>
                            <p className="text-xs text-white/40 mt-1">A redação é o que diferencia o aprovado do quase-aprovado.</p>
                        </div>
                    ) : (
                        redacoes.map((red) => (
                            <Link 
                                key={red.id} 
                                href={`/redacao/${red.id}`}
                                className="glass-panel p-5 block group hover:border-neon-blue/50 transition-all border border-white/5"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                                red.status === 'Corrigida' ? 'bg-green-500 text-black' : 'bg-neon-yellow text-black'
                                            }`}>
                                                {red.status}
                                            </span>
                                            <span className="text-xs text-secondary font-mono">
                                                {new Date(red.createdAt).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-neon-blue transition-colors line-clamp-1">
                                            {red.tema}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {red.nota !== null && (
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold text-secondary uppercase">Nota</div>
                                                <div className="text-2xl font-black text-neon-blue">{red.nota}</div>
                                            </div>
                                        )}
                                        <ChevronRight size={24} className="text-white/20 group-hover:text-neon-blue" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Cesgranrio Guide */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 border-neon-yellow/30 bg-neon-yellow/5">
                        <h2 className="text-xl font-bold text-neon-yellow flex items-center gap-2 mb-4">
                            <Award size={20} />
                            Padrão Cesgranrio
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="guide-item">
                                <h4 className="text-sm font-bold text-white uppercase text-[11px] mb-1">1. Dissertativo-Argumentativo</h4>
                                <p className="text-xs text-secondary leading-relaxed">
                                    Defenda um ponto de vista claro com argumentos sólidos. Nada de textos narrativos ou apenas expositivos.
                                </p>
                            </div>
                            <div className="guide-item">
                                <h4 className="text-sm font-bold text-white uppercase text-[11px] mb-1">2. Objetividade</h4>
                                <p className="text-xs text-secondary leading-relaxed">
                                    A banca é direta. Foque no tema central, geralmente sobre atualidades, tecnologia ou sociedade.
                                </p>
                            </div>
                            <div className="guide-item">
                                <h4 className="text-sm font-bold text-white uppercase text-[11px] mb-1">3. Conectivos</h4>
                                <p className="text-xs text-secondary leading-relaxed">
                                    Use "Diante desse cenário", "Além disso", "Portanto". A coesão vale muitos pontos.
                                </p>
                            </div>
                            <div className="guide-item">
                                <h4 className="text-sm font-bold text-white uppercase text-[11px] mb-1">4. Tamanho Ideal</h4>
                                <p className="text-xs text-secondary leading-relaxed">
                                    Mire entre 25 e 30 linhas. Menos de 20 linhas é penalizado severamente.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 bg-white/5 border border-white/10">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                            <Info size={16} className="text-neon-blue" />
                            Dica Supreme
                        </h3>
                        <p className="text-xs text-secondary italic leading-relaxed">
                            "A Cesgranrio valoriza a clareza. Não tente usar palavras complexas demais se não dominar o sentido. O simples bem escrito aprova mais que o rebuscado confuso."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
