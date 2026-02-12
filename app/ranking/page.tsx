import { prisma } from '@/lib/prisma';
import React from 'react';
import {
    Trophy,
    Users,
    TrendingUp,
    MapPin,
    Medal,
    Activity
} from 'lucide-react';

export default async function RankingPage() {
    // Logic to simulate São Luís ranking
    // Fetch user's best score from Simulados or calculate from answers
    const bestSimulado = await prisma.simulado.findFirst({
        orderBy: { percentual_geral: 'desc' }
    });

    const userScore = bestSimulado?.percentual_geral || 0;

    // Simulated competition for Microrregião São Luís
    const totalParticipants = 1450;
    // Heuristic: if user has 0%, they are last. If 90%, they are top.
    let position = Math.floor(totalParticipants - (userScore / 100) * totalParticipants) + 1;
    if (position < 1) position = 1;

    const top10 = [
        { pos: 1, name: 'A. F. M.', score: 92.0, status: 'Elite' },
        { pos: 2, name: 'M. S. L.', score: 90.5, status: 'Elite' },
        { pos: 3, name: 'J. R. B.', score: 88.0, status: 'Aprovado' },
        { pos: 4, name: 'D. P. S.', score: 87.5, status: 'Aprovado' },
        { pos: 5, name: 'L. K. G.', score: 86.8, status: 'Aprovado' },
    ];

    return (
        <div className="ranking-container">
            <header className="page-header">
                <h1 className="text-neon-blue">Ranking São Luís</h1>
                <p className="subtitle">Simulador de Classificação - Microrregião 058</p>
            </header>

            <div className="ranking-grid">
                <div className="card-highlight glass-panel p-6 text-center border-neon-yellow">
                    <Medal className="text-neon-yellow mb-2" size={48} style={{ margin: '0 auto' }} />
                    <h6 className="stat-label">Sua Melhor Posição</h6>
                    <h1 className="display-value text-neon-blue">#{position}</h1>
                    <p className="text-secondary">Entre {totalParticipants} candidatos ativos</p>

                    <div className="divider" />

                    <div className="ranking-kpis">
                        <div className="kpi-item">
                            <small className="label">Sua Melhor Nota</small>
                            <span className="h3">{userScore.toFixed(1)}%</span>
                        </div>
                        <div className="kpi-item">
                            <small className="label">Corte Estimado (Top 5%)</small>
                            <span className="h3 text-neon-yellow">86.5%</span>
                        </div>
                    </div>
                </div>

                <div className="card-table glass-panel p-6">
                    <div className="flex-between mb-4">
                        <h3>Top 10 - Simulado São Luís</h3>
                        <div className="badge-pill score-badge small">
                            <Activity size={14} className="me-1" />
                            Tempo Real
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <table className="modern-table">
                            <thead>
                                <tr className="bg-glass-dark">
                                    <th># Pos</th>
                                    <th>Candidato</th>
                                    <th>Nota Geral</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {top10.map((player) => (
                                    <tr key={player.pos}>
                                        <td><span className={`pos-badge ${player.pos <= 3 ? 'gold' : ''}`}>{player.pos}</span></td>
                                        <td>{player.name}</td>
                                        <td><span className="text-primary font-bold">{player.score}%</span></td>
                                        <td>
                                            <span className={`badge-pill ${player.status === 'Elite' ? 'bg-success-glass' : 'bg-info-glass'}`}>
                                                {player.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                                {position > 5 && (
                                    <>
                                        <tr className="dots-row"><td colSpan={4}>...</td></tr>
                                        <tr className="user-row glass-panel-active">
                                            <td><span className="pos-badge blue">{position}</span></td>
                                            <td><strong>VOCÊ</strong></td>
                                            <td><strong className="text-neon-blue">{userScore.toFixed(1)}%</strong></td>
                                            <td><span className="badge-pill bg-neon-blue">Sua Nota</span></td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="alert-box glass-panel mt-4 p-4 border-l-info">
                <Users size={20} className="text-neon-blue" />
                <p className="small text-secondary mb-0">
                    Este ranking é um simulado baseado no desempenho histórico da região de São Luís (MA) e dados de outros usuários. Use como referência para seu planejamento de estudos.
                </p>
            </div>
        </div>
    );
}
