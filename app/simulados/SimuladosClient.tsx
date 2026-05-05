"use client"

import { useRouter } from "next/navigation"
import { 
    FileText, 
    Zap, 
    Target, 
    BarChart3, 
    CheckCircle2, 
    AlertTriangle,
    ArrowRight
} from 'lucide-react';

export default function SimuladosPage({ 
    totalQuestoes, 
    tiQuestoes, 
    portQuestoes 
}: { 
    totalQuestoes: number, 
    tiQuestoes: number, 
    portQuestoes: number 
}) {
    const router = useRouter();

    const handleStart = (mode: string) => {
        const config: any = {
            tipo: mode,
            quantidade: mode === "completo" ? 70 : 25,
        };

        if (mode === "blitz") {
            config.materias = ["Tecnologia da Informação", "Língua Portuguesa"];
        }

        // Salvar configuração na sessão
        sessionStorage.setItem("simulado-config", JSON.stringify(config));

        // Redirecionar para o exame
        router.push("/simulado/exam");
    };

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-10 max-w-7xl mx-auto text-white">
            <header className="mb-12">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                    Centro de <span className="text-[#00a3ff]">Treinamento</span>
                </h1>
                <p className="text-[#a1a1aa] mt-2 font-medium italic">Simulados BB85-X Supreme v2.0</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Simulado Completo */}
                <div className="group relative bg-gradient-to-br from-[#00a3ff]/20 to-transparent border-2 border-[#00a3ff]/30 rounded-3xl p-8 hover:border-[#00a3ff] transition-all">
                    <div className="absolute top-6 right-8 text-[#00a3ff]">
                        <Target size={48} />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-[#00a3ff] mb-2">Modo Elite</div>
                    <h3 className="text-3xl font-black mb-4 uppercase italic">Simulado Completo</h3>
                    <p className="text-gray-400 mb-8 font-medium leading-relaxed">
                        70 questões | 5 horas de prova<br />
                        Simulação 100% fiel ao edital do Banco do Brasil 2023.
                    </p>
                    <ul className="space-y-3 mb-8 text-sm font-bold text-white/80">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#eaff20]" /> Todas as matérias incluídas
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#eaff20]" /> Pesos reais de prova
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#eaff20]" /> Ranking Global Ativado
                        </li>
                    </ul>
                    <button 
                        onClick={() => handleStart('completo')}
                        className="w-full py-4 bg-[#00a3ff] text-black font-black uppercase rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                    >
                        Iniciar Batalha
                    </button>
                </div>

                {/* Blitz Noturna */}
                <div className="group relative bg-gradient-to-br from-[#eaff20]/10 to-transparent border-2 border-white/10 rounded-3xl p-8 hover:border-[#eaff20]/50 transition-all">
                    <div className="absolute top-6 right-8 text-[#eaff20]">
                        <Zap size={48} />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-[#eaff20] mb-2">Treino Diário</div>
                    <h3 className="text-3xl font-black mb-4 uppercase italic">Blitz Noturna</h3>
                    <p className="text-gray-400 mb-8 font-medium leading-relaxed">
                        25 questões | 1.5 horas<br />
                        Foco total nas matérias de maior peso (TI e Português).
                    </p>
                    <ul className="space-y-3 mb-8 text-sm font-bold text-white/80">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#eaff20]" /> Foco em Probabilidade e TI
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#eaff20]" /> Revisão imediata de erros
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#eaff20]" /> Ganho de XP acelerado
                        </li>
                    </ul>
                    <button 
                        onClick={() => handleStart('blitz')}
                        className="w-full py-4 bg-white/10 text-white font-black uppercase rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                    >
                        Iniciar Treino
                    </button>
                </div>
            </div>

            {/* Arsenal Stats */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-8">
                    <BarChart3 className="text-[#00a3ff]" />
                    <h4 className="text-xl font-black uppercase italic">Arsenal Disponível</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="space-y-1">
                        <div className="text-4xl font-black text-[#00a3ff]">{totalQuestoes}</div>
                        <div className="text-[10px] font-black uppercase text-white/40 tracking-tighter">Total de Questões</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-4xl font-black text-[#eaff20]">{tiQuestoes}</div>
                        <div className="text-[10px] font-black uppercase text-white/40 tracking-tighter">Questões de TI</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-4xl font-black text-white">{portQuestoes}</div>
                        <div className="text-[10px] font-black uppercase text-white/40 tracking-tighter">Língua Portuguesa</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-4xl font-black text-[#00a3ff]">01</div>
                        <div className="text-[10px] font-black uppercase text-white/40 tracking-tighter">Provas Reais BB</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
