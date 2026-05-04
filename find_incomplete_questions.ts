import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findIncompleteQuestions() {
    console.log("Searching for potentially incomplete questions...\n");

    // Search for common patterns of incomplete data
    const patterns = [
        "Texto a ser transcrito",
        "texto a transcrever",
        "[imagem]",
        "ver imagem",
        "conforme",
        "de acordo com o texto",
        "segundo o texto"
    ];

    const suspiciousQuestions = await prisma.questao.findMany({
        where: {
            OR: [
                { enunciado: { contains: "Texto a ser transcrito" } },
                { enunciado: { contains: "texto a transcrever" } },
                {
                    AND: [
                        { enunciado: { contains: ":" } },
                        {
                            OR: [
                                { alternativa_A: { contains: "Alternativa A" } },
                                { alternativa_A: { equals: "" } }
                            ]
                        }
                    ]
                }
            ]
        },
        include: {
            prova: {
                select: {
                    ano: true,
                    cargo: true,
                    tipo_prova: true
                }
            }
        },
        take: 20
    });

    console.log(`Found ${suspiciousQuestions.length} potentially incomplete questions:\n`);

    suspiciousQuestions.forEach((q, idx) => {
        console.log(`${idx + 1}. ID: ${q.id} | Prova: ${q.prova?.ano} ${q.prova?.tipo_prova} | Matéria: ${q.materia}`);
        console.log(`   Enunciado: ${q.enunciado.substring(0, 100)}...`);
        console.log(`   Alt A: ${q.alternativa_A.substring(0, 50)}...`);
        console.log("");
    });

    // Also check for very short enunciados
    const shortEnunciados = await prisma.questao.count({
        where: {
            enunciado: {
                not: {
                    contains: " "
                }
            }
        }
    });

    console.log(`\nQuestions with very short enunciados (no spaces): ${shortEnunciados}`);
}

findIncompleteQuestions()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
