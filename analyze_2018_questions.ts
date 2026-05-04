import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function find2018Questions() {
    console.log("Searching for 2018 questions...\n");

    const questions2018 = await prisma.questao.findMany({
        where: {
            prova: {
                ano: 2018
            }
        },
        include: {
            prova: {
                select: {
                    ano: true,
                    cargo: true,
                    tipo_prova: true,
                    versao: true
                }
            }
        },
        orderBy: {
            numero_base: 'asc'
        }
    });

    console.log(`Found ${questions2018.length} questions from 2018\n`);

    // Group by prova
    const byProva: Record<string, any[]> = {};
    questions2018.forEach(q => {
        const key = `${q.prova?.tipo_prova} (${q.prova?.versao})`;
        if (!byProva[key]) byProva[key] = [];
        byProva[key].push(q);
    });

    Object.entries(byProva).forEach(([prova, questions]) => {
        console.log(`\n=== Prova ${prova} ===`);
        console.log(`Total: ${questions.length} questões`);

        const incomplete = questions.filter(q =>
            q.enunciado.includes("Texto a ser transcrito") ||
            q.alternativa_A.includes("Alternativa A")
        );

        console.log(`Incompletas: ${incomplete.length}`);

        if (incomplete.length > 0) {
            console.log("\nPrimeiras 5 incompletas:");
            incomplete.slice(0, 5).forEach(q => {
                console.log(`  Q${q.numero_base} (ID ${q.id}) - ${q.materia}`);
            });
        }
    });

    console.log(`\n\nTOTAL GERAL: ${questions2018.length} questões de 2018`);

    const totalIncomplete = questions2018.filter(q =>
        q.enunciado.includes("Texto a ser transcrito") ||
        q.alternativa_A.includes("Alternativa A")
    ).length;

    console.log(`INCOMPLETAS: ${totalIncomplete} (${((totalIncomplete / questions2018.length) * 100).toFixed(1)}%)`);
}

find2018Questions()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
