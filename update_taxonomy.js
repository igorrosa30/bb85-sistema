const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const PROVA_ID = 100;

    // Taxonomy Mapping based on user input
    const taxonomy = {
        "sintaxe_exata": [36, 37, 40, 45, 48, 51, 60, 61, 70],
        "polimorfismo": [38, 50, 64, 65],
        "sql_subconsulta": [52, 53, 55, 56, 58, 68, 69],
        "algoritmo_manual": [63, 66, 67],
        "conceito_direto": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 39, 41, 42, 43, 44, 46, 47, 49, 54, 57, 59, 62]
    };

    const weights = {
        "Língua Portuguesa": 1.5,
        "Língua Inglesa": 1.0,
        "Matemática": 1.5,
        "Atualidades do Mercado Financeiro": 1.0,
        "Probabilidade e Estatística": 1.5,
        "Conhecimentos Bancários": 1.5,
        "Tecnologia da Informação": 1.5
    };

    console.log("Updating taxonomy and weights for Prova 100...");

    const questions = await prisma.questao.findMany({
        where: { prova_id: PROVA_ID }
    });

    for (const q of questions) {
        let tipo = "conceito_direto";
        for (const [key, list] of Object.entries(taxonomy)) {
            if (list.includes(q.numero_base)) {
                tipo = key;
                break;
            }
        }

        const peso = weights[q.materia] || 1.5;

        await prisma.questao.update({
            where: { id: q.id },
            data: {
                tipo_pegadinha: tipo,
                peso_real: peso,
                is_real_2023: true
            }
        });
    }

    console.log("Update complete!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
