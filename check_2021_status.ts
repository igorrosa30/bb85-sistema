import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check2021Status() {
    const provas = await prisma.prova.findMany({
        where: { ano: 2021 },
        include: {
            _count: {
                select: { questoes: true }
            }
        }
    });

    console.log("BB 2021 Provas in DB:");
    provas.forEach(p => {
        console.log(`ID: ${p.id} | Cargo: ${p.cargo} | Tipo: ${p.tipo_prova} | Versão: ${p.versao} | Qtd: ${p._count.questoes}`);
    });
}

check2021Status()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
