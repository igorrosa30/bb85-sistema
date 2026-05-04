import { prisma } from '@/lib/prisma';
import React from 'react';
import ExamEngine from '@/components/ExamEngine';
import { notFound } from 'next/navigation';

export default async function SimuladoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const provaId = parseInt(id);

    const prova = await prisma.prova.findUnique({
        where: { id: provaId },
        include: {
            questoes: {
                orderBy: { numero_base: 'asc' }
            }
        }
    });

    if (!prova) {
        notFound();
    }

    const titulo = `Prova ${prova.cargo} - ${prova.tipo_prova} (${prova.versao})`;

    return (
        <div className="exam-execution-page">
            <header className="page-header flex-between">
                <div>
                    <h1>{titulo}</h1>
                    <p className="subtitle">{prova.ano} • {prova.questoes.length} Questões</p>
                </div>
            </header>

            <ExamEngine prova={prova} />
        </div>
    );
}
