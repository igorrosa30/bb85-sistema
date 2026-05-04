import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkGabaritos() {
    const questions = await prisma.questao.findMany({
        where: {
            prova: {
                ano: 2018
            }
        },
        orderBy: {
            numero_base: 'asc'
        },
        select: {
            numero_base: true,
            alternativa_correta_base: true,
            materia: true
        }
    });

    console.log("Current Gabaritos in DB for 2018 (41-70):");
    questions.slice(40).forEach(q => {
        console.log(`Q${q.numero_base} [${q.materia}]: ${q.alternativa_correta_base}`);
    });
}

checkGabaritos()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
