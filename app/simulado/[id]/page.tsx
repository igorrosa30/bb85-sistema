import { prisma } from '@/lib/prisma';
import React from 'react';
import ExamEngine from '@/components/ExamEngine';
import { notFound } from 'next/navigation';

export default async function SimuladoPage({ params }: { params: { id: string } }) {
    const provaId = parseInt(params.id);

    const prova = await prisma.prova.findUnique({
        where: { id: provaId },
        include: {
            questoes: {
                orderBy: { numero_questao: 'asc' }
            }
        }
    });

    if (!prova) {
        notFound();
    }

    return (
        <div className="exam-execution-page">
            <header className="page-header flex-between">
                <div>
                    <h1>{prova.nome}</h1>
                    <p className="subtitle">{prova.ano} • {prova.questoes.length} Questões</p>
                </div>
            </header>

            <ExamEngine prova={prova} />
        </div>
    );
}
