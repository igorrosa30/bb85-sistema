const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const provas = await prisma.prova.findMany();
    console.log(JSON.stringify(provas, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
