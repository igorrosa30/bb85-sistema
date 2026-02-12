
import { prisma } from './lib/prisma';

async function main() {
    const count = await prisma.questao.count({
        where: {
            comentario_detalhado: {
                contains: 'Problema de Juros Compostos'
            }
        }
    });
    console.log(`Found ${count} questions with specific detailed comments.`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
