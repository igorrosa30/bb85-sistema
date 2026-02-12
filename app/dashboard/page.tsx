import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession();

    if (!session) {
        redirect("/login");
    }

    const questaoCount = await prisma.questao.count();
    const provaCount = await prisma.prova.count();

    return (
        <div className="dashboard-container">
            <header className="page-header">
                <h1>Dashboard</h1>
                <p className="subtitle">Bem-vindo ao BB85 - Seu Sistema de Alta Performance</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card glass-panel">
                    <span className="stat-label">Total de Questões</span>
                    <span className="stat-value text-neon-blue">{questaoCount}</span>
                </div>
                <div className="stat-card glass-panel">
                    <span className="stat-label">Provas Cadastradas</span>
                    <span className="stat-value text-neon-yellow">{provaCount}</span>
                </div>
                <div className="stat-card glass-panel">
                    <span className="stat-label">Seu Progresso Atual</span>
                    <span className="stat-value">0%</span>
                </div>
            </div>

            <div className="action-grid mt-4">
                <div className="action-card glass-panel p-4">
                    <h3>Iniciar Simulado</h3>
                    <p>Treine com questões baseadas no seu desempenho.</p>
                    <button className="btn-primary mt-2">Praticar Agora</button>
                </div>
            </div>
        </div>
    );
}
