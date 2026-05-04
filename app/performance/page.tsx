import { prisma } from '@/lib/prisma';
import React from 'react';
import {
    TrendingUp,
    Target,
    Clock,
    AlertTriangle,
    CheckCircle2,
    ArrowUpRight,
    MapPin
} from 'lucide-react';

export const dynamic = 'force-dynamic';


export default async function PerformancePage({
    searchParams,
}: {
    searchParams: { period?: string }
}) {
    const period = searchParams.period || 'all';

    // Calculate start date based on period
    let startDate = new Date(0); // Default to all time
    const now = new Date();

    if (period === 'today') {
        startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (period === '7d') {
        startDate = new Date(now.setDate(now.getDate() - 7));
    } else if (period === '30d') {
        startDate = new Date(now.setDate(now.getDate() - 30));
    } else if (period === '60d') {
        startDate = new Date(now.setDate(now.getDate() - 60));
    } else if (period === '90d') {
        startDate = new Date(now.setDate(now.getDate() - 90));
    } else if (period === '180d') {
        startDate = new Date(now.setDate(now.getDate() - 180));
    } else if (period === '365d') {
        startDate = new Date(now.setDate(now.getDate() - 365));
    }

    // 1. Fetch filtered stats from RespostaUsuario
    const totalAnswers = await prisma.respostaUsuario.count({
        where: { data: { gte: startDate } }
    });
    const correctAnswers = await prisma.respostaUsuario.count({
        where: { 
            data: { gte: startDate },
            correta_ou_errada: true 
        }
    });

    // 2. Calculate Core Metrics
    const media = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
    const progresso85 = Math.min((media / 85) * 100, 100).toFixed(1);
    const needed = Math.max(85 - media, 0).toFixed(1);

    // 3. Competitiveness Logic (Microrregião 158 - TI)
    const isCompetitiveTI = media >= 80;

    // 4. Calculate Subject Stats
    const subjectStats = await prisma.respostaUsuario.findMany({
        where: { data: { gte: startDate } },
        include: { questao: { select: { materia: true } } }
    });

    const subjects: Record<string, { total: number; correct: number }> = {};
    subjectStats.forEach(r => {
        const mat = r.questao.materia;
        if (!subjects[mat]) subjects[mat] = { total: 0, correct: 0 };
        subjects[mat].total++;
        if (r.correta_ou_errada) subjects[mat].correct++;
    });

    const subjectList = Object.entries(subjects).map(([name, stats]) => ({
        name,
        accuracy: (stats.correct / stats.total) * 100,
        total: stats.total
    })).sort((a, b) => b.accuracy - a.accuracy);

    const weakest = [...subjectList].sort((a, b) => a.accuracy - b.accuracy)[0];
    const strongest = subjectList[0];

    // 5. Periods labels
    const periods = [
        { id: 'today', label: 'Hoje' },
        { id: '7d', label: '7 Dias' },
        { id: '30d', label: '30 Dias' },
        { id: '60d', label: '60 Dias' },
        { id: '90d', label: '90 Dias' },
        { id: 'all', label: 'Tudo' },
    ];

    return (
        <div className="performance-container p-6 md:p-8">
            <header className="page-header mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Análise de Performance</h1>
                    <p className="subtitle text-secondary">Acompanhe seu progresso por período e matéria</p>
                </div>
                
                <div className="flex flex-wrap gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    {periods.map((p) => (
                        <Link 
                            key={p.id}
                            href={`/performance?period=${p.id}`}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                period === p.id 
                                ? 'bg-neon-blue text-white shadow-[0_0_15px_rgba(0,163,255,0.4)]' 
                                : 'text-secondary hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {p.label}
                        </Link>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main KPI Card */}
                <div className="card-primary lg:col-span-2 glass-panel p-8 main-kpi relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-black/40">
                    <div className="kpi-header flex items-center gap-3 mb-4">
                        <div className="p-3 bg-neon-blue/20 rounded-xl">
                            <Target className="text-neon-blue" size={32} />
                        </div>
                        <div>
                            <h6 className="stat-label uppercase tracking-widest text-xs text-secondary font-bold">Média de Acertos ({periods.find(p => p.id === period)?.label})</h6>
                            <h1 className="display-value text-6xl font-black text-white">{media.toFixed(1)}%</h1>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-semibold text-secondary">Progresso rumo aos 85%</span>
                            <span className="text-xl font-bold text-neon-blue">{progresso85}%</span>
                        </div>
                        <div className="progress-container h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <div
                                className="progress-bar-fill h-full bg-gradient-to-r from-blue-600 via-neon-blue to-cyan-400 transition-all duration-1000 shadow-[0_0_20px_rgba(0,163,255,0.5)]"
                                style={{ width: `${progresso85}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {media < 85 ? (
                            <div className="alert-box flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-500">
                                <AlertTriangle size={20} />
                                <span className="text-sm font-medium">Atenção: Você precisa de mais <strong>{needed}%</strong> para a meta.</span>
                            </div>
                        ) : (
                            <div className="alert-box flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-500">
                                <CheckCircle2 size={20} />
                                <span className="text-sm font-medium">Excelente! Você está acima da meta de 85%.</span>
                            </div>
                        )}
                        
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-blue-400 flex items-center gap-3">
                            <TrendingUp size={20} />
                            <span className="text-sm font-medium">Volume: <strong>{totalAnswers}</strong> questões no período.</span>
                        </div>
                    </div>
                </div>

                {/* AI Insights & Competition */}
                <div className="glass-panel p-6 bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ArrowUpRight size={20} className="text-neon-yellow" />
                            Análise Estratégica
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-secondary uppercase">
                                    <MapPin size={14} className="text-neon-yellow" />
                                    Corte Regional (Micro 158)
                                </div>
                                <div className={`text-lg font-bold ${isCompetitiveTI ? 'text-green-400' : 'text-red-400'}`}>
                                    {isCompetitiveTI ? 'Perfil de Aprovado' : 'Abaixo da Nota de Corte'}
                                </div>
                                <p className="text-[10px] text-secondary leading-tight mt-1">
                                    Baseado na média estimada de 80% para Agente de TI na sua região.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-xl">
                                    <small className="text-[10px] font-bold text-green-500 uppercase">Ponto Mais Forte</small>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-white truncate mr-2">{strongest?.name || '-'}</span>
                                        <span className="text-lg font-black text-green-400">{strongest?.accuracy.toFixed(0) || 0}%</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                                    <small className="text-[10px] font-bold text-red-500 uppercase">Ponto Crítico</small>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-white truncate mr-2">{weakest?.name || '-'}</span>
                                        <span className="text-lg font-black text-red-400">{weakest?.accuracy.toFixed(0) || 0}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-xl relative">
                        <div className="absolute -top-3 left-4 bg-neon-blue text-black text-[10px] font-black px-2 py-0.5 rounded">RECOMENDAÇÃO IA</div>
                        <p className="text-xs text-blue-100 leading-relaxed pt-1 italic">
                            "{weakest 
                                ? `Seus erros em ${weakest.name} representam seu maior 'gap' atual. Revise a base teórica desta matéria nas próximas 48h.`
                                : "Foco mantido. Continue o ciclo de simulados para manter a consistência."}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Subject Breakdown */}
            <div className="glass-panel p-6 bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-neon-blue" />
                    Desempenho por Matéria
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjectList.map((subject, idx) => (
                        <div key={idx} className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-white/20 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-sm font-bold text-white group-hover:text-neon-blue transition-colors">{subject.name}</span>
                                <span className={`text-lg font-black ${
                                    subject.accuracy >= 85 ? 'text-green-400' : (subject.accuracy >= 70 ? 'text-neon-yellow' : 'text-red-400')
                                }`}>
                                    {subject.accuracy.toFixed(0)}%
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-1000 ${
                                        subject.accuracy >= 85 ? 'bg-green-500' : (subject.accuracy >= 70 ? 'bg-neon-yellow' : 'bg-red-500')
                                    }`}
                                    style={{ width: `${subject.accuracy}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 text-[10px] text-secondary font-bold uppercase flex justify-between">
                                <span>{subject.total} QUESTÕES</span>
                                <span>META 85%</span>
                            </div>
                        </div>
                    ))}
                    {subjectList.length === 0 && (
                        <div className="col-span-full py-12 text-center text-secondary italic">
                            Nenhum dado registrado para este período.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

