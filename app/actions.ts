'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitAnswer(data: {
    questaoId: number;
    respostaMarcada: string;
    correta: boolean;
    tempoGasto: number;
    versao?: string;
}) {
    try {
        await prisma.respostaUsuario.create({
            data: {
                questao_id: data.questaoId,
                resposta_marcada: data.respostaMarcada,
                correta_ou_errada: data.correta,
                tempo_gasto: data.tempoGasto,
                versao_utilizada: data.versao || 'v1',
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
