'use client';

import { useEffect, useState } from 'react';

interface Simulado {
    id: number;
    data: string;
    tempo_total: number;
    percentual_geral: number;
    classificacao: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<Simulado[]>([]);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch('/api/simulations');
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                }
            } catch (error) {
                console.error('Failed to fetch history', error);
            }
        }
        fetchHistory();
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Histórico de Simulados</h1>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Data</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Tempo</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Desempenho</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Classificação</th>
                            <th style={{ padding: '15px', textAlign: 'right' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Nenhum simulado realizado ainda.
                                </td>
                            </tr>
                        ) : (
                            history.map((sim) => (
                                <tr key={sim.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '15px' }}>{new Date(sim.data).toLocaleDateString()}</td>
                                    <td style={{ padding: '15px' }}>{Math.floor(sim.tempo_total / 60)} min</td>
                                    <td style={{ padding: '15px', color: sim.percentual_geral >= 85 ? 'var(--bb-yellow-neon)' : 'inherit' }}>
                                        {sim.percentual_geral}%
                                    </td>
                                    <td style={{ padding: '15px' }}>{sim.classificacao}</td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <button style={{ color: 'var(--bb-blue-neon)', textDecoration: 'underline' }}>Detalhes</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
