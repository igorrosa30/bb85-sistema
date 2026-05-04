
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Cleaning up simulation data...");
    await prisma.respostaUsuario.deleteMany({});
    await prisma.simulado.deleteMany({});
    console.log("All simulation history deleted.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
