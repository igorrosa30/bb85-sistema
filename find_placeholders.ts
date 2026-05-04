import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findPlaceholders() {
    console.log("Searching for question placeholders...");

    const placeholders = await prisma.questao.findMany({
        where: {
            enunciado: {
                contains: "transcrito"
            }
        },
        select: {
            prova_id: true
        }
    });

    const provaIds = Array.from(new Set(placeholders.map(p => p.prova_id)));

    console.log("Unique Prova IDs with placeholders:", provaIds);

    const provas = await prisma.prova.findMany({
        where: {
            id: {
                in: provaIds
            }
        }
    });

    console.log("Detailed Prova Info:");
    provas.forEach(p => {
        console.log(`ID: ${p.id} | Ano: ${p.ano} | Cargo: ${p.cargo} | Tipo: ${p.tipo_prova} | Versão: ${p.versao}`);
    });
}

findPlaceholders()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
