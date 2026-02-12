import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    const prova = await prisma.prova.create({
        data: {
            ano: 2024,
            cargo: 'Agente de Tecnologia',
            tipo_prova: 'A',
            versao: '1',
            questoes: {
                create: [
                    {
                        numero_base: 1,
                        materia: 'Língua Portuguesa',
                        peso_materia: 1.5,
                        enunciado: 'Questão de exemplo sobre crase.',
                        alternativa_A: 'Opção A incorreta',
                        alternativa_B: 'Opção B correta',
                        alternativa_C: 'Opção C incorreta',
                        alternativa_D: 'Opção D incorreta',
                        alternativa_E: 'Opção E incorreta',
                        alternativa_correta_base: 'B',
                        comentario: 'A crase deve ser usada aqui pois...',
                    },
                    {
                        numero_base: 2,
                        materia: 'Matemática',
                        subtema: 'Juros Compostos',
                        peso_materia: 1.5,
                        enunciado: 'Calcule o montante de R$ 1000 a 10% a.m em 2 meses.',
                        alternativa_A: '1200',
                        alternativa_B: '1210',
                        alternativa_C: '1100',
                        alternativa_D: '1150',
                        alternativa_E: '1300',
                        alternativa_correta_base: 'B',
                        comentario: 'M = C * (1+i)^t => 1000 * 1.21 = 1210',
                    },
                    {
                        numero_base: 3,
                        materia: 'Conhecimentos Bancários',
                        peso_materia: 1.5,
                        enunciado: 'Sobre o Sistema Financeiro Nacional...',
                        alternativa_A: 'Errada',
                        alternativa_B: 'Errada',
                        alternativa_C: 'Correta',
                        alternativa_D: 'Errada',
                        alternativa_E: 'Errada',
                        alternativa_correta_base: 'C',
                    },
                    {
                        numero_base: 4,
                        materia: 'Informática',
                        subtema: 'Segurança',
                        peso_materia: 1.5,
                        enunciado: 'Qual destes é um malware?',
                        alternativa_A: 'Mouse',
                        alternativa_B: 'Teclado',
                        alternativa_C: 'Worm',
                        alternativa_D: 'Monitor',
                        alternativa_E: 'Impressora',
                        alternativa_correta_base: 'C',
                    },
                    {
                        numero_base: 5,
                        materia: 'Vendas e Negociação',
                        peso_materia: 1.5,
                        enunciado: 'Etapa de prospecção envolve...',
                        alternativa_A: 'Fechar venda',
                        alternativa_B: 'Buscar clientes',
                        alternativa_C: 'Pós-venda',
                        alternativa_D: 'Entrega',
                        alternativa_E: 'Cobrança',
                        alternativa_correta_base: 'B',
                    }
                ],
            },
        },
    });

    console.log(`Created exam with id: ${prova.id}`);
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
