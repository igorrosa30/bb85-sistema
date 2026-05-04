import { prisma } from '@/lib/prisma';
import React from 'react';
import Link from 'next/link';
import {
    TrendingUp,
    Target,
    AlertTriangle,
    CheckCircle2,
    ArrowUpRight,
    MapPin,
    BookOpen,
    Clock
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PerformancePage({
    searchParams,
}: {
    searchParams: { period?: string }
}) {
    const period = searchParams.period || 'all';
    const now = new Date();
    let startDate = new Date(0);

    if (period === 'today') startDate = new Date(now.setHours(0, 0, 0, 0));
    else if (period === '7d') startDate = new Date(now.setDate(now.getDate() - 7));
    else if (period === '30d') startDate = new Date(now.setDate(now.getDate() - 30));
    else if (period === '90d') startDate = new Date(now.setDate(now.getDate() - 90));

    let stats = {
        totalAnswers: 0,
        correctAnswers: 0,
        subjectList: [] as any[],
        strongest: null as any,
        weakest: null as any,
        media: 0
    };

    try {
        stats.totalAnswers = await prisma.respostaUsuario.count({
            where: { data: { gte: startDate } }
        });
        stats.correctAnswers = await prisma.respostaUsuario.count({
            where: { 
                data: { gte: startDate },
                correta_ou_errada: true 
            }
        });

        stats.media = stats.totalAnswers > 0 ? (stats.correctAnswers / stats.totalAnswers) * 100 : 0;

        const subjectData = await prisma.respostaUsuario.findMany({
            where: { data: { gte: startDate } },
            include: { questao: { select: { materia: true } } }
        });

        const subjects: Record<string, { total: number; correct: number }> = {};
        subjectData.forEach(r => {
            const mat = r.questao.materia;
            if (!subjects[mat]) subjects[mat] = { total: 0, correct: 0 };
            subjects[mat].total++;
            if (r.correta_ou_errada) subjects[mat].correct++;
        });

        stats.subjectList = Object.entries(subjects).map(([name, s]) => ({
            name,
            accuracy: (s.correct / s.total) * 100,
            total: s.total
        })).sort((a, b) => b.accuracy - a.accuracy);

        stats.strongest = stats.subjectList[0];
        stats.weakest = [...stats.subjectList].sort((a, b) => a.accuracy - b.accuracy)[0];

    } catch (e) {
        console.error("Performance Page Error:", e);
    }

    const progresso85 = Math.min((stats.media / 85) * 100, 100).toFixed(1);
    const needed = Math.max(85 - stats.media, 0).toFixed(1);
    const isCompetitiveTI = stats.media >= 80;

    const periods = [
        { id: 'today', label: 'Hoje' },
        { id: '7d', label: '7 Dias' },
        { id: '30d', label: '30 Dias' },
        { id: '90d', label: '90 Dias' },
        { id: 'all', label: 'Tudo' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-10 space-y-10 text-white">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Análise de <span className="text-[#00a3ff]">Performance</span></h1>
                    <p className="text-[#a1a1aa] font-medium mt-1">Métricas vitais de combate para a vaga no BB</p>
                </div>
                
                <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    {periods.map((p) => (
                        <Link 
                            key={p.id}
                            href={`/performance?period=${p.id}`}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                period === p.id 
                                ? 'bg-[#00a3ff] text-black shadow-[0_0_20px_rgba(0,163,255,0.4)]' 
                                : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {p.label}
                        </Link>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Card */}
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                        <Target size={250} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-4 bg-[#00a3ff]/10 rounded-2xl text-[#00a3ff]">
                                <Target size={40} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-[#a1a1aa] uppercase tracking-[0.3em]">Média Ponderada</p>
                                <div className="text-7xl font-black">{stats.media.toFixed(1)}%</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end text-sm font-black uppercase">
                                <span className="text-[#a1a1aa]">Progresso rumo aos 85%</span>
                                <span className="text-[#00a3ff]">{progresso85}%</span>
                            </div>
                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-600 via-[#00a3ff] to-cyan-400 shadow-[0_0_25px_rgba(0,163,255,0.6)]"
                                    style={{ width: `${progresso85}%` }}
                                />
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats.media < 85 ? (
                                <div className="flex items-center gap-4 p-5 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-500">
                                    <AlertTriangle size={24} />
                                    <div className="text-xs font-bold leading-relaxed uppercase">
                                        Zona de Risco: Faltam {needed}% para atingir o nível de segurança.
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 p-5 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500">
                                    <CheckCircle2 size={24} />
                                    <div className="text-xs font-bold leading-relaxed uppercase">
                                        Nível Elite: Você está operando acima da nota de corte prevista.
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-4 p-5 bg-[#00a3ff]/10 border border-[#00a3ff]/20 rounded-2xl text-[#00a3ff]">
                                <TrendingUp size={24} />
                                <div className="text-xs font-bold leading-relaxed uppercase">
                                    Volume de Treino: {stats.totalAnswers} questões analisadas.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI & Competition */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                            <ArrowUpRight size={20} className="text-[#eaff20]" />
                            Tática Regional
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-[#a1a1aa] uppercase tracking-widest">
                                    <MapPin size={14} className="text-[#eaff20]" /> Microrregião 158
                                </div>
                                <div className={`text-xl font-black ${isCompetitiveTI ? 'text-green-400' : 'text-red-500'}`}>
                                    {isCompetitiveTI ? 'PERFIL APROVADO' : 'ABAIXO DO CORTE'}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                                    <div className="text-[10px] font-black text-green-500 uppercase mb-1">Ponto Mais Forte</div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-black text-white truncate">{stats.strongest?.name || '-'}</span>
                                        <span className="text-xl font-black text-green-400">{stats.strongest?.accuracy.toFixed(0) || 0}%</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                                    <div className="text-[10px] font-black text-red-500 uppercase mb-1">Ponto Crítico</div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-black text-white truncate">{stats.weakest?.name || '-'}</span>
                                        <span className="text-xl font-black text-red-400">{stats.weakest?.accuracy.toFixed(0) || 0}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-5 bg-[#eaff20]/5 border border-[#eaff20]/10 rounded-2xl">
                        <p className="text-xs text-[#eaff20] leading-relaxed font-bold italic">
                            "{stats.weakest 
                                ? `IA: Seus erros em ${stats.weakest.name} representam o maior risco para sua vaga. Priorize este módulo amanhã.`
                                : "IA: Consistência detectada. Mantenha o ritmo de simulados diários."}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Subject Matrix */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                    <BookOpen size={24} className="text-[#00a3ff]" />
                    Matriz de Aproveitamento
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.subjectList.map((subject, idx) => (
                        <div key={idx} className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-[#00a3ff]/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-sm font-black text-white group-hover:text-[#00a3ff] transition-colors">{subject.name}</span>
                                <span className={`text-xl font-black ${
                                    subject.accuracy >= 85 ? 'text-green-400' : (subject.accuracy >= 70 ? 'text-[#eaff20]' : 'text-red-500')
                                }`}>
                                    {subject.accuracy.toFixed(0)}%
                                </span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-1000 ${
                                        subject.accuracy >= 85 ? 'bg-green-500' : (subject.accuracy >= 70 ? 'bg-[#eaff20]' : 'bg-red-500')
                                    }`}
                                    style={{ width: `${subject.accuracy}%` }}
                                />
                            </div>
                            <div className="mt-3 flex justify-between text-[10px] font-black uppercase text-[#a1a1aa]">
                                <span>{subject.total} Confrontos</span>
                                <span>Meta 85%</span>
                            </div>
                        </div>
                    ))}
                    {stats.subjectList.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <Clock size={48} className="mx-auto text-white/5 mb-4" />
                            <p className="text-secondary font-black uppercase tracking-widest">Nenhum dado tático registrado para este período.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


