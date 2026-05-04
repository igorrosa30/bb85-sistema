import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { BarChart, BookOpen, Target, TrendingUp, Award, Clock } from 'lucide-react';

export default async function Dashboard() {
    const questaoCount = await prisma.questao.count();
    const provaCount = await prisma.prova.count();
    const simuladoCount = await prisma.simulado.count();
    const respostaCount = await prisma.respostaUsuario.count();

    // Calcular estatísticas ponderadas (BB85-X Supreme v2)
    const respostas = await prisma.respostaUsuario.findMany({
        include: { questao: true }
    });

    let totalPointsPossible = 0;
    let pointsScored = 0;
    let errosCount = 0;

    respostas.forEach(r => {
        const peso = r.questao.peso_real || 1.5;
        totalPointsPossible += peso;
        if (r.correta_ou_errada) {
            pointsScored += peso;
        } else {
            errosCount++;
        }
    });

    const notaPonderada = totalPointsPossible > 0 ? (pointsScored / totalPointsPossible) * 100 : 0;
    const percentualGeral = notaPonderada.toFixed(1);

    const cadernoErrosCount = await prisma.respostaUsuario.count({
        where: { correta_ou_errada: false }
    });

    return (
        <div className="p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Dashboard Agente de Tecnologia
                </h1>
                <p className="text-gray-600">
                    Sistema de Alta Performance - Foco Microrregião 158 (TI)
                </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<BookOpen className="text-blue-600" size={32} />}
                    label="Questões Disponíveis"
                    value={questaoCount.toLocaleString()}
                    color="blue"
                />
                <StatCard
                    icon={<Target className="text-green-600" size={32} />}
                    label="Nota Ponderada (0-100)"
                    value={percentualGeral}
                    color="green"
                    subtitle="Simulação de Nota Real"
                />
                <StatCard
                    icon={<PenLine className="text-red-600" size={32} />}
                    label="Caderno de Erros"
                    value={cadernoErrosCount}
                    color="orange"
                    subtitle="Itens para Revisão Hoje"
                />
                <StatCard
                    icon={<BarChart className="text-purple-600" size={32} />}
                    label="Simulados Realizados"
                    value={simuladoCount}
                    color="purple"
                />
                <StatCard
                    icon={<Award className="text-blue-600" size={32} />}
                    label="Provas no Banco"
                    value={provaCount}
                    color="blue"
                />
            </div>

            {/* Progress to 85% */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                    <div>
                <h2 className="text-2xl font-bold text-gray-900">Meta: 86.0 - Agente de Tecnologia</h2>
                <p className="text-gray-600">Simulação de Performance Real (Ponderada)</p>
                    </div>
                    <Target className="text-blue-600" size={48} />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(parseFloat(percentualGeral as string), 100)}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Nota Atual: {percentualGeral}</span>
                    <span>Distância da Meta: {Math.max(86.0 - parseFloat(percentualGeral as string), 0).toFixed(1)} pontos</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/simulados" className="block group">
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <TrendingUp className="text-blue-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Iniciar Simulado</h3>
                                <p className="text-gray-600">Pratique com questões reais</p>
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                            Começar Agora →
                        </button>
                    </div>
                </Link>

                <Link href="/performance" className="block group">
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <BarChart className="text-purple-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Ver Desempenho</h3>
                                <p className="text-gray-600">Análise detalhada por matéria</p>
                            </div>
                        </div>
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
                            Analisar →
                        </button>
                    </div>
                </Link>
            </div>

            {/* Recent Activity */}
            {respostaCount > 0 && (
                <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock size={24} className="text-gray-600" />
                        Atividade Recente
                    </h3>
                    <p className="text-gray-600">
                        Você respondeu <strong>{respostaCount}</strong> questões até agora.
                        Continue praticando para alcançar a meta de 85%!
                    </p>
                </div>
            )}
        </div>
    );
}

import { PenLine } from 'lucide-react';

function StatCard({
    icon,
    label,
    value,
    color,
    subtitle
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
    subtitle?: string;
}) {
    const colorClasses = {
        blue: 'from-blue-50 to-blue-100 border-blue-200',
        green: 'from-green-50 to-green-100 border-green-200',
        purple: 'from-purple-50 to-purple-100 border-purple-200',
        orange: 'from-red-50 to-red-100 border-red-200', // Adjusted for Error Book
    };

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-6 border`}>
            <div className="flex items-center gap-4 mb-2">
                {icon}
                <span className="text-sm font-medium text-gray-600">{label}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            {subtitle && <div className="text-sm text-gray-600 mt-1">{subtitle}</div>}
        </div>
    );
}
