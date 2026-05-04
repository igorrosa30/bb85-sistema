import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("--- STARTING SIMULATION VERIFICATION (Updated) ---");

    // 1. Fetch 3 questions
    const questions = await prisma.questao.findMany({ take: 3 });
    if (questions.length === 0) {
        throw new Error("No questions found! Cannot test.");
    }
    console.log(`Fetched ${questions.length} questions for test.`);

    // 2. Prepare Data for Transactional Creation
    const answers = [
        { q: questions[0], correct: true },
        { q: questions[1], correct: true },
        { q: questions[2], correct: false }
    ];

    const startTime = Date.now();
    let totalTime = 600; // 10 min

    const acertos = answers.filter(a => a.correct).length;
    const total = answers.length;
    const percentual = (acertos / total) * 100;

    const materiasStats: Record<string, { total: number; acertos: number }> = {};
    answers.forEach(a => {
        if (!materiasStats[a.q.materia]) {
            materiasStats[a.q.materia] = { total: 0, acertos: 0 };
        }
        materiasStats[a.q.materia].total++;
        if (a.correct) materiasStats[a.q.materia].acertos++;
    });

    const materiasJson = Object.entries(materiasStats).map(([m, s]) => ({
        materia: m,
        percentual: (s.acertos / s.total) * 100
    }));

    // 3. Create Simulado with Nested Respostas
    console.log("Creating Simulado with nested Answers...");
    const simulado = await prisma.simulado.create({
        data: {
            tempo_total: totalTime,
            percentual_geral: percentual,
            percentual_materia_json: JSON.stringify(materiasJson),
            classificacao: percentual >= 85 ? 'Aprovado' : 'Reprovado',
            // data_criacao removed, using default 'data' or explicit 'data' if needed
            data: new Date(),
            tipo: 'teste_verificacao',
            config_json: JSON.stringify({ mode: 'test' }),
            respostas: {
                create: answers.map(a => ({
                    questao_id: a.q.id,
                    resposta_marcada: a.correct ? a.q.alternativa_correta_base : 'X',
                    correta_ou_errada: a.correct,
                    tempo_gasto: 120,
                    versao_utilizada: 'v_verification'
                }))
            }
        },
        include: {
            respostas: true
        }
    });

    console.log(`Simulado created with ID: ${simulado.id}. Total Answers linked: ${simulado.respostas.length}`);

    // 4. Verify Retrieval
    const retrieved = await prisma.simulado.findUnique({
        where: { id: simulado.id },
        include: { respostas: true }
    });

    if (!retrieved || retrieved.respostas.length !== 3) {
        throw new Error("Failed to retrieve simulado with answers.");
    }

    console.log("✅ SYSTEM VERIFIED: Data flow (Transaction & Relation) is working correctly.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
