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

export default async function PerformancePage() {
    // 1. Fetch real stats from RespostaUsuario
    const totalAnswers = await prisma.respostaUsuario.count();
    const correctAnswers = await prisma.respostaUsuario.count({
        where: { correta_ou_errada: true }
    });

    // 2. Calculate Core Metrics
    const media = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
    const progresso85 = Math.min((media / 85) * 100, 100).toFixed(1);
    const needed = Math.max(85 - media, 0).toFixed(1);

    // 3. Competitiveness Logic (São Luís)
    // Assumption: São Luís requires consistently high scores due to competition.
    // 82% is a safe "competitive" threshold for this analysis.
    const isCompetitiveSaoLuis = media >= 82;

    // 4. Calculate Subject Stats for Insights
    const subjectStats = await prisma.respostaUsuario.findMany({
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
        accuracy: (stats.correct / stats.total) * 100
    })).sort((a, b) => a.accuracy - b.accuracy);

    const weakest = subjectList[0];
    const strongest = subjectList[subjectList.length - 1];

    // Timeline (Mock for MVP, replace with aggregation by date)
    const timeline = [
        { date: new Date().toLocaleDateString('pt-BR'), type: 'Geral', score: media.toFixed(1), trend: '-' }
    ];

    return (
        <div className="performance-container">
            <header className="page-header mb-8">
                <h1 className="text-3xl font-bold">Estrada para os 85%</h1>
                <p className="subtitle text-secondary">Analise sua evolução e foco nos pontos de melhoria</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Main KPI Card */}
                <div className="card-primary glass-panel p-6 main-kpi relative overflow-hidden">
                    <div className="kpi-header flex items-center gap-3 mb-2">
                        <Target className="text-neon-blue" size={32} />
                        <h6 className="stat-label uppercase tracking-widest text-xs text-secondary">Sua Média Atual</h6>
                    </div>
                    <h1 className="display-value text-6xl font-bold text-neon-blue mb-2">{media.toFixed(1)}%</h1>
                    <p className="text-secondary mb-6">Próximo objetivo: <strong className="text-white">85.0%</strong></p>

                    <div className="progress-container mb-6 bg-gray-800 h-4 rounded-full overflow-hidden relative">
                        <div
                            className="progress-bar-fill h-full bg-gradient-to-r from-blue-600 to-neon-blue transition-all duration-1000"
                            style={{ width: `${progresso85}%` }}
                        ></div>
                    </div>

                    {media < 85 ? (
                        <div className="alert-box warning-alert flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg text-warning">
                            <AlertTriangle size={24} className="shrink-0" />
                            <span>Você precisa de mais <strong>{needed}%</strong> para atingir a meta de excelência do BB.</span>
                        </div>
                    ) : (
                        <div className="alert-box success-alert flex items-start gap-3 p-4 bg-success/10 border border-success/30 rounded-lg text-success">
                            <CheckCircle2 size={24} className="shrink-0" />
                            <span>Parabéns! Você atingiu a meta de alta performance.</span>
                        </div>
                    )}
                </div>

                {/* Secondary Stats & AI Insights */}
                <div className="card-secondary glass-panel p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Análise de Competitividade</h3>

                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="text-neon-yellow" size={18} />
                                <span className="text-sm font-semibold text-white">Regional: São Luís - MA</span>
                            </div>
                            {isCompetitiveSaoLuis ? (
                                <div className="text-success flex items-center gap-2">
                                    <CheckCircle2 size={16} />
                                    <span className="font-bold">Competitivo</span>
                                </div>
                            ) : (
                                <div className="text-error flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    <span className="font-bold">Ainda não competitivo (&lt; 82%)</span>
                                </div>
                            )}
                            <p className="text-xs text-secondary mt-1">A nota de corte estimada para sua região é alta. Mantenha o foco.</p>
                        </div>

                        <div className="stats-detail-grid grid grid-cols-2 gap-4 mt-4">
                            <div className="detail-item bg-black/20 p-3 rounded">
                                <small className="label text-secondary text-xs uppercase">Melhor Matéria</small>
                                <div className="value-row flex items-center gap-2 mt-1">
                                    <span className="h4 font-bold text-success">{strongest ? strongest.accuracy.toFixed(0) : 0}%</span>
                                    <span className="text-xs truncate max-w-[100px]">{strongest ? strongest.name : '-'}</span>
                                </div>
                            </div>
                            <div className="detail-item bg-black/20 p-3 rounded">
                                <small className="label text-secondary text-xs uppercase">Pior Matéria</small>
                                <div className="value-row flex items-center gap-2 mt-1">
                                    <span className="h4 font-bold text-error">{weakest ? weakest.accuracy.toFixed(0) : 0}%</span>
                                    <span className="text-xs truncate max-w-[100px]">{weakest ? weakest.name : '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ai-insight glass-panel p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-lg mt-4">
                        <p className="text-sm">
                            <strong className="text-neon-blue block mb-1">🤖 Recomendação do Sistema:</strong>
                            {weakest
                                ? `Seus erros em ${weakest.name} estão puxando sua média para baixo. Foque 2h de estudo nessa matéria amanhã.`
                                : "Continue respondendo questões para receber recomendações personalizadas."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="evolution-section mt-4 glass-panel p-6">
                <h3 className="mb-4 text-xl font-bold">Histórico de Performance</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-secondary text-sm uppercase">
                                <th className="p-3">Data</th>
                                <th className="p-3">Tipo</th>
                                <th className="p-3">Desempenho</th>
                                <th className="p-3">Tendência</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeline.map((item, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-3">{item.date}</td>
                                    <td className="p-3">{item.type}</td>
                                    <td className="p-3">
                                        <span className="py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-bold text-sm">{item.score}%</span>
                                    </td>
                                    <td className="p-3 text-secondary">
                                        {item.trend}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
