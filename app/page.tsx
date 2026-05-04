import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { 
    BarChart, 
    BookOpen, 
    Target, 
    TrendingUp, 
    Award, 
    Clock, 
    Zap, 
    Flame, 
    Trophy,
    ArrowUpRight,
    PenTool
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
    let stats = {
        questaoCount: 0,
        provaCount: 0,
        simuladoCount: 0,
        respostaCount: 0,
        percentualGeral: 0,
        cadernoErrosCount: 0,
        redacaoCount: 0
    };

    let profile = {
        level: 1,
        xp: 0,
        streak: 1
    };

    try {
        stats.questaoCount = await prisma.questao.count();
        stats.provaCount = await prisma.prova.count();
        stats.simuladoCount = await prisma.simulado.count();
        stats.respostaCount = await prisma.respostaUsuario.count();
        stats.redacaoCount = await prisma.redacao.count();

        const respostas = await prisma.respostaUsuario.findMany({
            include: { questao: true }
        });

        let totalPointsPossible = 0;
        let pointsScored = 0;

        respostas.forEach(r => {
            const peso = r.questao.peso_real || 1.5;
            totalPointsPossible += peso;
            if (r.correta_ou_errada) pointsScored += peso;
        });

        stats.percentualGeral = totalPointsPossible > 0 ? (pointsScored / totalPointsPossible) * 100 : 0;
        stats.cadernoErrosCount = await prisma.respostaUsuario.count({
            where: { correta_ou_errada: false }
        });

        const userProfile = await prisma.userProfile.findUnique({ where: { id: "unico" } });
        if (userProfile) profile = userProfile;

    } catch (e) {
        console.error("Database error");
    }

    const xpNextLevel = Math.floor(100 * Math.pow(profile.level, 1.5));
    const xpProgress = (profile.xp / xpNextLevel) * 100;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
            {/* Header with Profile Summary */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter">
                        CENTRAL DE COMANDO <span className="text-neon-blue">SUPREME</span>
                    </h1>
                    <p className="text-secondary font-medium mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        SISTEMA OPERACIONAL BB85-X ATIVO
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="glass-panel px-6 py-3 border-neon-yellow/30 bg-neon-yellow/5 flex items-center gap-3">
                        <Flame className="text-neon-yellow" size={24} fill="currentColor" />
                        <div>
                            <div className="text-[10px] font-black text-neon-yellow uppercase tracking-widest">Streak</div>
                            <div className="text-xl font-black text-white">{profile.streak} DIAS</div>
                        </div>
                    </div>
                    <div className="glass-panel px-6 py-3 border-neon-blue/30 bg-neon-blue/5 flex items-center gap-3">
                        <Trophy className="text-neon-blue" size={24} />
                        <div>
                            <div className="text-[10px] font-black text-neon-blue uppercase tracking-widest">Nível</div>
                            <div className="text-xl font-black text-white">{profile.level}</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Score Progress Card */}
                <div className="lg:col-span-8 glass-panel p-8 relative overflow-hidden group border-white/10 bg-white/[0.02]">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                        <Target size={200} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-sm font-black text-secondary uppercase tracking-[0.3em] mb-1">Nota Ponderada Real</h3>
                                <div className="text-6xl font-black text-white">{stats.percentualGeral.toFixed(1)}%</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-black text-neon-blue uppercase tracking-widest mb-1">Meta de Corte (158)</div>
                                <div className="text-2xl font-black text-white/40 italic">86.0</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-600 via-neon-blue to-cyan-400 shadow-[0_0_20px_rgba(0,163,255,0.4)] transition-all duration-1000"
                                    style={{ width: `${Math.min(stats.percentualGeral, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold">
                                <span className="text-secondary uppercase">Progressão de Performance</span>
                                <span className="text-neon-blue">{Math.max(86 - stats.percentualGeral, 0).toFixed(1)} pontos para a vaga</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Level Card */}
                <div className="lg:col-span-4 glass-panel p-8 border-neon-blue/20 bg-neon-blue/5">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Próximo Nível</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div className="text-4xl font-black text-white">{profile.xp} <span className="text-sm text-secondary font-medium">XP</span></div>
                            <div className="text-sm font-bold text-neon-blue">{Math.floor(xpProgress)}%</div>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-neon-blue shadow-[0_0_15px_rgba(0,163,255,0.5)] transition-all"
                                style={{ width: `${xpProgress}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-secondary leading-relaxed uppercase font-black">
                            Faltam {xpNextLevel - profile.xp} XP para subir de nível e ganhar novas badges.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Simulados" 
                    value={stats.simuladoCount} 
                    icon={<TrendingUp size={24} />} 
                    color="neon-blue"
                    href="/simulados"
                />
                <StatCard 
                    title="Redações" 
                    value={stats.redacaoCount} 
                    icon={<PenTool size={24} />} 
                    color="neon-yellow"
                    href="/redacao"
                />
                <StatCard 
                    title="Erro Fatal" 
                    value={stats.cadernoErrosCount} 
                    icon={<Zap size={24} />} 
                    color="red-500"
                    href="/performance"
                    subtitle="Caderno de Erros"
                />
                <StatCard 
                    title="Questões" 
                    value={stats.questaoCount} 
                    icon={<BookOpen size={24} />} 
                    color="green-500"
                    href="/simulados"
                />
            </div>

            {/* Activity Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 border-white/5 bg-white/[0.01]">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-neon-blue" />
                        Relatório de Engajamento
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-sm text-secondary">Total de Questões Respondidas</span>
                            <span className="text-lg font-black text-white">{stats.respostaCount}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-sm text-secondary">Provas Processadas</span>
                            <span className="text-lg font-black text-white">{stats.provaCount}</span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 border-neon-blue/10 bg-neon-blue/[0.02]">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Award size={20} className="text-neon-blue" />
                        Conquistas Recentes
                    </h3>
                    <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-help" title="Fazer 100 questões">
                            <Zap size={24} />
                        </div>
                        <div className="w-16 h-16 rounded-full bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center text-neon-blue shadow-[0_0_15px_rgba(0,163,255,0.3)]" title="Iniciou a Jornada">
                            <Check size={24} />
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-20" title="Alcançar 85% de média">
                            <Trophy size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Check } from 'lucide-react';

function StatCard({ 
    title, 
    value, 
    icon, 
    color, 
    href,
    subtitle 
}: { 
    title: string, 
    value: number, 
    icon: React.ReactNode, 
    color: string,
    href: string,
    subtitle?: string
}) {
    return (
        <Link href={href} className="group">
            <div className={`glass-panel p-6 border-white/10 bg-white/[0.02] hover:border-${color}/50 hover:bg-white/[0.05] transition-all relative overflow-hidden h-full`}>
                <div className={`absolute top-0 right-0 p-4 text-${color} opacity-10 group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <div className="relative z-10">
                    <div className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">{title}</div>
                    <div className="text-3xl font-black text-white">{value}</div>
                    {subtitle && <div className="text-[10px] font-bold text-secondary mt-1 uppercase">{subtitle}</div>}
                    <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
                        ACESSAR MÓDULO <ArrowUpRight size={12} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

