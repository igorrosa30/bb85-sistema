import { prisma } from '@/lib/prisma';
import React from 'react';
import {
    Trophy,
    Users,
    TrendingUp,
    MapPin,
    Medal,
    Activity,
    Target
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RankingPage() {
    let userScore = 0;
    try {
        const bestSimulado = await prisma.simulado.findFirst({
            orderBy: { percentual_geral: 'desc' }
        });
        userScore = bestSimulado?.percentual_geral || 0;
    } catch (e) {
        console.error("Ranking Page Error:", e);
    }

    const totalParticipants = 1450;
    let position = Math.floor(totalParticipants - (userScore / 100) * totalParticipants) + 1;
    if (position < 1) position = 1;
    if (userScore === 0) position = totalParticipants;

    const top10 = [
        { pos: 1, name: 'A. F. M.', score: 92.0, status: 'Elite' },
        { pos: 2, name: 'M. S. L.', score: 90.5, status: 'Elite' },
        { pos: 3, name: 'J. R. B.', score: 88.0, status: 'Aprovado' },
        { pos: 4, name: 'D. P. S.', score: 87.5, status: 'Aprovado' },
        { pos: 5, name: 'L. K. G.', score: 86.8, status: 'Aprovado' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-10 space-y-10 text-white">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Ranking <span className="text-[#00a3ff]">TI</span></h1>
                    <p className="text-[#a1a1aa] font-medium mt-1">Simulador de Classificação - Microrregião 158</p>
                </div>
                
                <div className="flex items-center gap-3 bg-[#00a3ff]/10 border border-[#00a3ff]/20 px-6 py-3 rounded-2xl">
                    <Activity size={20} className="text-[#00a3ff]" />
                    <span className="text-xs font-black uppercase tracking-widest text-[#00a3ff]">Tempo Real</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Status Card */}
                <div className="bg-[#0a0a0a] border border-[#eaff20]/20 p-10 rounded-3xl text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#eaff20]/20" />
                    <Medal className="mx-auto text-[#eaff20] mb-6 group-hover:scale-110 transition-transform" size={80} />
                    
                    <p className="text-xs font-black text-[#a1a1aa] uppercase tracking-[0.3em] mb-2">Sua Melhor Posição</p>
                    <h1 className="text-7xl font-black text-white mb-4">#{position}</h1>
                    <p className="text-[10px] font-bold text-[#a1a1aa] uppercase">Entre {totalParticipants} candidatos ativos</p>

                    <div className="my-8 border-t border-white/5" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-[#a1a1aa] uppercase mb-1">Sua Nota</p>
                            <p className="text-2xl font-black text-[#00a3ff]">{userScore.toFixed(1)}%</p>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <p className="text-[10px] font-black text-[#a1a1aa] uppercase mb-1">Corte Top 5%</p>
                            <p className="text-2xl font-black text-[#eaff20]">86.5%</p>
                        </div>
                    </div>
                </div>

                {/* Ranking Table */}
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                        <Trophy size={24} className="text-[#00a3ff]" />
                        Elite da Microrregião
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-[#a1a1aa]">
                                    <th className="pb-4 px-4">Posição</th>
                                    <th className="pb-4 px-4">Candidato</th>
                                    <th className="pb-4 px-4">Nota Geral</th>
                                    <th className="pb-4 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {top10.map((player) => (
                                    <tr key={player.pos} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-4">
                                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                                player.pos <= 3 ? 'bg-[#eaff20] text-black shadow-[0_0_15px_rgba(234,255,32,0.3)]' : 'bg-white/5 text-white'
                                            }`}>
                                                {player.pos}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 font-black text-sm">{player.name}</td>
                                        <td className="py-4 px-4 font-black text-[#00a3ff]">{player.score.toFixed(1)}%</td>
                                        <td className="py-4 px-4">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                                player.status === 'Elite' ? 'bg-[#00a3ff] text-black' : 'bg-white/10 text-white'
                                            }`}>
                                                {player.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                                {position > 5 && (
                                    <>
                                        <tr><td colSpan={4} className="py-2 px-4 text-center text-white/20">•••</td></tr>
                                        <tr className="bg-[#00a3ff]/5 border-y border-[#00a3ff]/20">
                                            <td className="py-6 px-4">
                                                <span className="w-8 h-8 rounded-lg bg-[#00a3ff] text-black flex items-center justify-center font-black text-xs">
                                                    {position}
                                                </span>
                                            </td>
                                            <td className="py-6 px-4 font-black text-sm text-[#00a3ff]">VOCÊ (COMBATENTE)</td>
                                            <td className="py-6 px-4 font-black text-[#00a3ff]">{userScore.toFixed(1)}%</td>
                                            <td className="py-6 px-4">
                                                <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase bg-[#00a3ff] text-black">
                                                    Sua Posição
                                                </span>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                <Users size={24} className="text-[#00a3ff] shrink-0" />
                <p className="text-xs text-[#a1a1aa] font-medium leading-relaxed italic">
                    "Este ranking simula a concorrência real baseada no desempenho médio histórico da Microrregião 158. Mantenha sua meta acima de 86% para garantir a vaga direta sem depender de cadastros de reserva."
                </p>
            </div>
        </div>
    );
}

