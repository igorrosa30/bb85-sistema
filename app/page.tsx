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
    PenTool,
    Check
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
        <div className="min-h-full bg-[#050505] p-6 md:p-10 space-y-8 text-white">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
                        COMANDO <span className="text-[#00a3ff]">SUPREME</span>
                    </h1>
                    <div className="flex items-center gap-2 text-[#a1a1aa] mt-2 font-bold text-xs tracking-widest uppercase">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Status: Sistema Ativo
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                        <Flame className="text-[#eaff20]" size={20} fill="currentColor" />
                        <span className="font-black text-xl">{profile.streak}D</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                        <Trophy className="text-[#00a3ff]" size={20} />
                        <span className="font-black text-xl">LVL {profile.level}</span>
                    </div>
                </div>
            </div>

            {/* Main KPI Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Target size={150} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-black text-[#a1a1aa] uppercase tracking-[0.2em] mb-2">Performance Real</p>
                        <div className="text-7xl font-black mb-6">{stats.percentualGeral.toFixed(1)}%</div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                                <span className="text-[#a1a1aa]">Progresso para a Meta</span>
                                <span className="text-[#00a3ff]">Meta: 86.0%</span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-600 to-[#00a3ff] shadow-[0_0_15px_rgba(0,163,255,0.4)]"
                                    style={{ width: `${Math.min(stats.percentualGeral, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-black text-[#a1a1aa] uppercase tracking-[0.2em] mb-4">Próximo Nível</p>
                        <div className="text-4xl font-black mb-2">{profile.xp} <span className="text-sm text-[#a1a1aa]">XP</span></div>
                        <p className="text-[10px] text-[#a1a1aa] font-bold uppercase">Faltam {xpNextLevel - profile.xp} XP</p>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-6">
                        <div 
                            className="h-full bg-[#00a3ff] shadow-[0_0_10px_rgba(0,163,255,0.3)]"
                            style={{ width: `${xpProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickCard 
                    label="Simulados" 
                    value={stats.simuladoCount} 
                    icon={<TrendingUp size={20} />} 
                    color="text-[#00a3ff]"
                    href="/simulados"
                />
                <QuickCard 
                    label="Redações" 
                    value={stats.redacaoCount} 
                    icon={<PenTool size={20} />} 
                    color="text-[#eaff20]"
                    href="/redacao"
                />
                <QuickCard 
                    label="Erros" 
                    value={stats.cadernoErrosCount} 
                    icon={<Zap size={20} />} 
                    color="text-red-500"
                    href="/performance"
                />
                <QuickCard 
                    label="Questões" 
                    value={stats.questaoCount} 
                    icon={<BookOpen size={20} />} 
                    color="text-green-500"
                    href="/simulados"
                />
            </div>

            {/* Engagement Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Clock size={16} className="text-[#00a3ff]" /> Engajamento
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-xs text-[#a1a1aa] font-bold uppercase">Questões Respondidas</span>
                            <span className="font-black">{stats.respostaCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-xs text-[#a1a1aa] font-bold uppercase">Provas no Banco</span>
                            <span className="font-black">{stats.provaCount}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Award size={16} className="text-[#00a3ff]" /> Conquistas
                    </h3>
                    <div className="flex gap-4">
                        <BadgeIcon active={true} icon={<Check size={20} />} title="Iniciante" />
                        <BadgeIcon active={stats.respostaCount >= 100} icon={<Zap size={20} />} title="Centurião" />
                        <BadgeIcon active={stats.percentualGeral >= 85} icon={<Trophy size={20} />} title="Elite" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickCard({ label, value, icon, color, href }: any) {
    return (
        <Link href={href} className="block group">
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl hover:border-white/30 transition-all">
                <div className={`${color} mb-4 group-hover:scale-110 transition-transform`}>{icon}</div>
                <div className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-widest mb-1">{label}</div>
                <div className="text-2xl font-black text-white">{value}</div>
            </div>
        </Link>
    );
}

function BadgeIcon({ active, icon, title }: any) {
    return (
        <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
            active ? 'bg-[#00a3ff]/20 border-[#00a3ff]/50 text-[#00a3ff] shadow-[0_0_10px_rgba(0,163,255,0.2)]' : 'bg-white/5 border-white/10 text-white/10'
        }`} title={title}>
            {icon}
        </div>
    );
}
