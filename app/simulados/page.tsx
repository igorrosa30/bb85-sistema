import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
    FileText,
    Calendar,
    CheckCircle,
    Clock,
    ArrowRight
} from 'lucide-react';

export default async function SimuladosPage() {
    const provas = await prisma.prova.findMany({
        include: {
            _count: {
                select: { questoes: true }
            }
        },
        orderBy: { ano: 'desc' }
    });

    return (
        <div className="simulados-container">
            <header className="page-header">
                <h1>Simulados Disponíveis</h1>
                <p className="subtitle">Escolha uma prova para treinar e testar seus conhecimentos</p>
            </header>

            <div className="simulados-grid">
                {provas.map((prova) => (
                    <div key={prova.id} className="exam-card glass-panel p-6">
                        <div className="exam-card-header">
                            <div className="exam-icon-bg">
                                <FileText className="text-neon-blue" size={24} />
                            </div>
                            <div className="exam-title-group">
                                <h3>{prova.nome}</h3>
                                <span className="exam-ano text-neon-yellow">{prova.ano}</span>
                            </div>
                        </div>

                        <p className="exam-desc mt-3 text-secondary">
                            Prepare-se para o Banco do Brasil com este simulado completo da prova {prova.nome}.
                        </p>

                        <div className="exam-stats-row mt-4">
                            <div className="exam-stat">
                                <CheckCircle size={16} className="text-secondary" />
                                <span>{prova._count.questoes} Questões</span>
                            </div>
                            <div className="exam-stat">
                                <Clock size={16} className="text-secondary" />
                                <span>4h 30min</span>
                            </div>
                            <div className="exam-stat">
                                <Calendar size={16} className="text-secondary" />
                                <span>{prova.ano}</span>
                            </div>
                        </div>

                        <div className="exam-footer mt-4">
                            <Link href={`/simulado/${prova.id}`} className="btn-primary w-full flex-center gap-2">
                                Iniciar Agora
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
