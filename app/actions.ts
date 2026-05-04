'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function updateGamification(isCorrect: boolean, isSimulado: boolean = false, nota: number = 0) {
    const userId = "unico";
    let xpGain = isCorrect ? 10 : 2;
    if (isSimulado) xpGain = 100 + Math.floor(nota * 2);

    const profile = await prisma.userProfile.upsert({
        where: { id: userId },
        update: {},
        create: { id: userId, xp: 0, level: 1, streak: 1, lastActivity: new Date() }
    });

    // Streak Logic
    const now = new Date();
    const last = new Date(profile.lastActivity);
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
    
    let newStreak = profile.streak;
    if (diffDays === 1) newStreak++;
    else if (diffDays > 1) newStreak = 1;

    // Leveling Logic (Simple)
    let newXP = profile.xp + xpGain;
    let newLevel = profile.level;
    const xpNextLevel = Math.floor(100 * Math.pow(newLevel, 1.5));

    if (newXP >= xpNextLevel) {
        newXP -= xpNextLevel;
        newLevel++;
    }

    await prisma.userProfile.update({
        where: { id: userId },
        data: {
            xp: newXP,
            level: newLevel,
            streak: newStreak,
            lastActivity: now,
            totalQuestoes: { increment: 1 },
            totalAcertos: { increment: isCorrect ? 1 : 0 }
        }
    });

    return { xpGain, leveledUp: newLevel > profile.level };
}

export async function getQuestionHistory(questaoId: number) {
    const history = await prisma.respostaUsuario.findMany({
        where: { questao_id: questaoId },
        orderBy: { data: 'desc' },
        take: 10
    });

    const total = history.length;
    const acertos = history.filter(h => h.correta_ou_errada).length;
    const erros = total - acertos;
    const ultimaVez = history[0]?.data;

    return { total, acertos, erros, ultimaVez };
}

export async function getUserProfile() {
    const userId = "unico";
    return await prisma.userProfile.findUnique({
        where: { id: userId }
    }) || { xp: 0, level: 1, streak: 1, totalQuestoes: 0, totalAcertos: 0 };
}

export async function submitAnswer(data: {
    questaoId: number;
    respostaMarcada: string;
    correta: boolean;
    tempoGasto: number;
    versao?: string;
    sinteseErro?: string;
}) {
    try {
        const nextDate = new Date();
        await prisma.respostaUsuario.create({
            data: {
                questao_id: data.questaoId,
                resposta_marcada: data.respostaMarcada,
                correta_ou_errada: data.correta,
                tempo_gasto: data.tempoGasto,
                versao_utilizada: data.versao || 'v1',
                sintese_erro: data.sinteseErro,
                proxima_revisao: data.correta ? null : nextDate,
                ciclo_revisao: 0
            },
        });

        const gameStats = await updateGamification(data.correta);

        revalidatePath('/dashboard');
        revalidatePath('/performance');

        return { success: true, ...gameStats };
    } catch (error) {
        console.error('Failed to submit answer:', error);
        return { success: false };
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
        const questionIds = data.respostas.map(r => r.questaoId);
        const questionsInDb = await prisma.questao.findMany({
            where: { id: { in: questionIds } },
            select: { id: true, peso_real: true }
        });

        const weightMap = new Map(questionsInDb.map(q => [q.id, q.peso_real]));
        let totalPointsPossible = 0;
        let pointsScored = 0;
        let totalCorrect = 0;

        data.respostas.forEach(r => {
            const peso = weightMap.get(r.questaoId) || 1.5;
            totalPointsPossible += peso;
            if (r.correta) {
                pointsScored += peso;
                totalCorrect++;
            }
        });

        const notaPonderada = totalPointsPossible > 0 ? (pointsScored / totalPointsPossible) * 100 : 0;

        const simulado = await prisma.simulado.create({
            data: {
                tempo_total: data.tempoTotal,
                percentual_geral: notaPonderada,
                percentual_materia_json: JSON.stringify([]),
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

        const gameStats = await updateGamification(totalCorrect > 0, true, notaPonderada);

        revalidatePath('/dashboard');
        revalidatePath('/performance');
        revalidatePath('/historico');

        return { success: true, id: simulado.id, ...gameStats };
    } catch (error) {
        console.error('Failed to submit exam:', error);
        return { success: false };
    }
}

