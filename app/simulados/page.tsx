import { prisma } from '@/lib/prisma';
import SimuladosClient from './SimuladosClient';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SimuladosPage() {
    let stats = {
        totalQuestoes: 0,
        tiQuestoes: 0,
        portQuestoes: 0
    };
    let error = null;

    try {
        const questoes = await prisma.questao.findMany({
            select: { materia: true }
        });

        stats.totalQuestoes = questoes.length;
        stats.tiQuestoes = questoes.filter(q => 
            q.materia.toLowerCase().includes('tecnologia') || 
            q.materia.toLowerCase().includes('informática')
        ).length;
        stats.portQuestoes = questoes.filter(q => 
            q.materia.toLowerCase().includes('portuguesa')
        ).length;

    } catch (err) {
        console.error("Erro ao carregar questões:", err);
        error = "Erro de conexão com o banco de dados.";
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 text-white">
                <div className="text-center space-y-4">
                    <AlertTriangle size={64} className="text-red-500 mx-auto" />
                    <h2 className="text-2xl font-bold">Falha na Conexão</h2>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    if (stats.totalQuestoes === 0) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 text-white">
                <div className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-xl">
                    <AlertTriangle size={64} className="text-[#eaff20] mx-auto mb-6" />
                    <h2 className="text-3xl font-black uppercase mb-4">Banco de Dados Vazio</h2>
                    <p className="text-gray-400 mb-8 font-medium">O sistema não encontrou questões cadastradas.</p>
                    <Link href="/" className="inline-flex items-center px-8 py-4 bg-[#00a3ff] text-black font-black rounded-xl hover:scale-105 transition-transform uppercase">
                        Voltar ao Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <SimuladosClient 
            totalQuestoes={stats.totalQuestoes}
            tiQuestoes={stats.tiQuestoes}
            portQuestoes={stats.portQuestoes}
        />
    );
}
