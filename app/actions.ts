'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitAnswer(data: {
    questaoId: number;
    respostaMarcada: string;
    correta: boolean;
    tempoGasto: number;
    versao?: string;
    sinteseErro?: string; // Piazzi: Síntese de 140 chars
}) {
    try {
        const nextDate = new Date();
        // Lógica de Ciclo Piazzi: Se errou, revisão no Dia 0 (hoje)
        // Se acertou, poderíamos avançar o ciclo, mas o foco agora é a Dor do Erro.

        await prisma.respostaUsuario.create({
            data: {
                questao_id: data.questaoId,
                resposta_marcada: data.respostaMarcada,
                correta_ou_errada: data.correta,
                tempo_gasto: data.tempoGasto,
                versao_utilizada: data.versao || 'v1',
                sintese_erro: data.sinteseErro,
                proxima_revisao: data.correta ? null : nextDate, // Dia 0
                ciclo_revisao: 0
            },
        });

        // Revalidate dashboard and performance pages to update stats immediately
        revalidatePath('/dashboard');
        revalidatePath('/performance');

        return { success: true };
    } catch (error) {
        console.error('Failed to submit answer:', error);
        return { success: false, error: 'Failed to record answer' };
    }
}

export async function submitExam(data: {
    tempoTotal: number;
    tipo: string;
    config: any;
    respostas: {
        questaoId: number;
        respostaMarcada: string;
        correta: boolean;
        tempoGasto: number;
        materia: string;
        sinteseErro?: string;
    }[];
}) {
    try {
        // Fetch weights from DB for calculation
        const questionIds = data.respostas.map(r => r.questaoId);
        const questionsInDb = await prisma.questao.findMany({
            where: { id: { in: questionIds } },
            select: { id: true, peso_real: true }
        });

        const weightMap = new Map(questionsInDb.map(q => [q.id, q.peso_real]));

        let totalPointsPossible = 0;
        let pointsScored = 0;

        data.respostas.forEach(r => {
            const peso = weightMap.get(r.questaoId) || 1.5;
            totalPointsPossible += peso;
            if (r.correta) {
                pointsScored += peso;
            }
        });

        // Normalize to 100 points scale
        const notaPonderada = totalPointsPossible > 0 
            ? (pointsScored / totalPointsPossible) * 100 
            : 0;

        // Transaction to create Simulado and RespostaUsuario records
        const simulado = await prisma.simulado.create({
            data: {
                tempo_total: data.tempoTotal,
                percentual_geral: notaPonderada, // Now stores the weighted score
                percentual_materia_json: JSON.stringify([]), // Simplified for now
                classificacao: notaPonderada >= 86 ? 'Aprovado' : 'Abaixo da Meta',
                tipo: data.tipo,
                config_json: JSON.stringify(data.config),
                respostas: {
                    create: data.respostas.map(r => ({
                        questao_id: r.questaoId,
                        resposta_marcada: r.respostaMarcada,
                        correta_ou_errada: r.correta,
                        tempo_gasto: r.tempoGasto,
                        sintese_erro: r.sinteseErro,
                        versao_utilizada: 'v1'
                    }))
                }
            }
        });

        revalidatePath('/dashboard');
        revalidatePath('/performance');
        revalidatePath('/historico');

        return { success: true, id: simulado.id };
    } catch (error) {
        console.error('Failed to submit exam:', error);
        return { success: false, error: 'Failed to submit exam' };
    }
}
