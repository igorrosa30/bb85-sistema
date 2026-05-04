const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Criando Prova BB 2023...');
  
  const prova = await prisma.prova.upsert({
    where: { id: 100 },
    update: {},
    create: {
      id: 100,
      cargo: 'Agente de Tecnologia',
      ano: 2023,
      versao: 'Gabarito 1',
      tipo_prova: 'Tecnologia da Informação'
    }
  });

  console.log('Prova criada com sucesso:', prova.id);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
