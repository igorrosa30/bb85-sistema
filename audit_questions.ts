import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function auditQuestions() {
    console.log("Starting System-Wide Question Audit...\n");

    const allQuestions = await prisma.questao.findMany({
        include: {
            prova: true
        }
    });

    const incomplete = [];
    const missingImages = [];
    const placeholders = [
        "transcrever",
        "completa",
        "missing",
        "placeholder",
        "Texto a ser",
        "[BB "
    ];

    for (const q of allQuestions) {
        const isIncomplete = placeholders.some(p => q.enunciado.toLowerCase().includes(p.toLowerCase())) || q.enunciado.length < 20;

        // This is a subjective check - some questions might genuinely not have images.
        // But if the enunciado mentions "Figura", "Imagem", or "Gráfico", and imagem_url is null, it's a flag.
        const mentionsImage = /figura|imagem|gráfico/i.test(q.enunciado);
        const hasNoImage = !q.imagem_url;

        if (isIncomplete) {
            incomplete.push({
                id: q.id,
                prova: `${q.prova.ano} - ${q.prova.cargo}`,
                numero: q.numero_base,
                enunciado: q.enunciado.substring(0, 50),
                materia: q.materia
            });
        }

        if (mentionsImage && hasNoImage) {
            missingImages.push({
                id: q.id,
                prova: `${q.prova.ano} - ${q.prova.cargo}`,
                numero: q.numero_base,
                enunciado: q.enunciado.substring(0, 50),
                materia: q.materia
            });
        }
    }

    console.log(`Total Questions Scanned: ${allQuestions.length}`);
    console.log(`Incomplete/Placeholder Enunciados: ${incomplete.length}`);
    console.log(`Questions mentioning images but having none: ${missingImages.length}\n`);

    if (incomplete.length > 0) {
        console.log("--- INCOMPLETE QUESTIONS ---");
        incomplete.slice(0, 50).forEach(i => {
            console.log(`[${i.prova}] Q${i.numero} (${i.materia}): ${i.enunciado}...`);
        });
        if (incomplete.length > 50) console.log(`... and ${incomplete.length - 50} more.`);
    }

    if (missingImages.length > 0) {
        console.log("\n--- POTENTIAL MISSING IMAGES ---");
        missingImages.slice(0, 50).forEach(i => {
            console.log(`[${i.prova}] Q${i.numero} (${i.materia}): ${i.enunciado}...`);
        });
        if (missingImages.length > 50) console.log(`... and ${missingImages.length - 50} more.`);
    }
}

auditQuestions()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
