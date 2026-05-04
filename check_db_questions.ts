import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkQuestions() {
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
            enunciado: true,
            materia: true
        }
    });

    console.log("Current Questions in DB for 2018:");
    questions.forEach(q => {
        if (q.numero_base % 5 === 1 || q.numero_base === 30 || q.numero_base === 45) {
            console.log(`Q${q.numero_base} [${q.materia}]: ${q.enunciado.substring(0, 50)}...`);
        }
    });
}

checkQuestions()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
