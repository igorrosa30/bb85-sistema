import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PenTool, FileText, Award, Info, Plus, ChevronRight, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RedacaoPage() {
    let redacoes = [];
    try {
        redacoes = await prisma.redacao.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        console.error("Redacao Page Error:", e);
    }

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-10 space-y-10 text-white">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Laboratório de <span className="text-[#eaff20]">Redação</span></h1>
                    <p className="text-[#a1a1aa] font-medium mt-1">Treine para a nota 100 com o padrão Cesgranrio</p>
                </div>
                
                <Link 
                    href="/redacao/nova" 
                    className="flex items-center gap-2 bg-[#eaff20] text-black font-black px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,255,32,0.3)]"
                >
                    <Plus size={20} />
                    NOVA REDAÇÃO
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Writing History */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                        <FileText size={24} className="text-[#eaff20]" />
                        Seu Histórico de Combate
                    </h2>

                    {redacoes.length === 0 ? (
                        <div className="bg-[#0a0a0a] border-2 border-dashed border-white/10 p-20 text-center rounded-3xl">
                            <PenTool size={64} className="mx-auto text-white/5 mb-6" />
                            <p className="text-[#a1a1aa] font-black uppercase tracking-widest">Nenhuma redação registrada.</p>
                            <p className="text-[10px] text-secondary mt-2 uppercase">O treino é o que separa o amador do profissional.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {redacoes.map((red) => (
                                <Link 
                                    key={red.id} 
                                    href={`/redacao/${red.id}`}
                                    className="bg-[#0a0a0a] border border-white/10 p-6 block group hover:border-[#eaff20]/50 transition-all rounded-2xl"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                                    red.status === 'Corrigida' ? 'bg-green-500 text-black' : 'bg-[#eaff20] text-black'
                                                }`}>
                                                    {red.status}
                                                </span>
                                                <span className="text-[10px] text-[#a1a1aa] font-black uppercase">
                                                    {new Date(red.createdAt).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-black text-white group-hover:text-[#eaff20] transition-colors line-clamp-1">
                                                {red.tema}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {red.nota !== null && (
                                                <div className="text-right">
                                                    <div className="text-[10px] font-black text-[#a1a1aa] uppercase">Nota Final</div>
                                                    <div className="text-3xl font-black text-[#eaff20]">{red.nota}</div>
                                                </div>
                                            )}
                                            <ChevronRight size={24} className="text-white/10 group-hover:text-[#eaff20]" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cesgranrio Guide */}
                <div className="space-y-6">
                    <div className="bg-[#0a0a0a] border border-[#eaff20]/30 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 text-[#eaff20]/5">
                            <Award size={150} />
                        </div>
                        <h2 className="text-xl font-black text-[#eaff20] flex items-center gap-3 mb-8 relative z-10 uppercase tracking-tighter">
                            <Award size={24} />
                            Padrão Cesgranrio
                        </h2>
                        
                        <div className="space-y-6 relative z-10">
                            <GuideItem 
                                title="1. Dissertativo-Argumentativo" 
                                text="Defenda um ponto de vista claro com argumentos sólidos. Nada de textos narrativos."
                            />
                            <GuideItem 
                                title="2. Objetividade Real" 
                                text="A banca é direta. Foque no tema central, geralmente sobre atualidades ou tecnologia."
                            />
                            <GuideItem 
                                title="3. Coesão Supreme" 
                                text="Use conectivos fortes como 'Diante desse cenário', 'Além disso', 'Portanto'."
                            />
                            <GuideItem 
                                title="4. Densidade de Conteúdo" 
                                text="Mire entre 25 e 30 linhas. Menos de 20 linhas é falha crítica."
                            />
                        </div>
                    </div>

                    <div className="bg-[#eaff20]/5 border border-[#eaff20]/10 p-6 rounded-2xl">
                        <h3 className="text-xs font-black text-[#eaff20] flex items-center gap-2 mb-3 uppercase">
                            <Info size={16} />
                            Dica de Campo
                        </h3>
                        <p className="text-xs text-[#a1a1aa] italic leading-relaxed font-medium">
                            "A Cesgranrio valoriza a clareza técnica. Não use palavras complexas se não dominar o sentido. O simples bem executado garante a vaga."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GuideItem({ title, text }: { title: string, text: string }) {
    return (
        <div className="space-y-1">
            <h4 className="text-[11px] font-black text-white uppercase tracking-wider">{title}</h4>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">{text}</p>
        </div>
    );
}

