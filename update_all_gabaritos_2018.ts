import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Complete official gabarito for BB 2018 - All 70 questions
const gabarito: Record<number, string> = {
    // Conhecimentos Básicos
    1: "C", 2: "C", 3: "D", 4: "E", 5: "A", // Língua Portuguesa
    6: "B", 7: "D", 8: "C", 9: "A", 10: "C", // Língua Inglesa
    11: "B", 12: "B", 13: "E", 14: "D", 15: "B", // Matemática
    16: "C", 17: "B", 18: "D", 19: "D", 20: "E", // Atualidades
    // Conhecimentos Específicos
    21: "A", 22: "D", 23: "E", 24: "D", 25: "A", // Probabilidade e Estatística
    26: "C", 27: "B", 28: "C", 29: "A", 30: "E",
    31: "E", 32: "D", 33: "D", 34: "C", 35: "E",
    36: "C", 37: "D", 38: "D", 39: "D", 40: "D",
    41: "D", 42: "C", 43: "E", 44: "B", 45: "B", // Conhecimentos Bancários
    46: "C", 47: "D", 48: "C", 49: "B", 50: "B", // Conhecimentos de Informática
    51: "D", 52: "D", 53: "C", 54: "D", 55: "C",
    56: "C", 57: "D", 58: "C", 59: "E", 60: "C",
    61: "C", 62: "D", 63: "E", 64: "B", 65: "C",
    66: "E", 67: "C", 68: "B", 69: "E", 70: "D"
};

async function updateAllGabaritos() {
    console.log("Updating all BB 2018 questions with correct gabaritos...\n");

    const prova2018 = await prisma.prova.findFirst({
        where: { ano: 2018 }
    });

    if (!prova2018) {
        console.log("Prova 2018 not found!");
        return;
    }

    console.log(`Found prova ID: ${prova2018.id}\n`);

    let updated = 0;
    for (let num = 1; num <= 70; num++) {
        const question = await prisma.questao.findFirst({
            where: {
                prova_id: prova2018.id,
                numero_base: num
            }
        });

        if (question) {
            await prisma.questao.update({
                where: { id: question.id },
                data: {
                    alternativa_correta_base: gabarito[num],
                    comentario: `Gabarito oficial BB 2018: ${gabarito[num]}`
                }
            });
            updated++;
            if (updated % 10 === 0) {
                console.log(`✅ Updated ${updated}/70 questions...`);
            }
        }
    }

    console.log(`\n✅ Complete! Updated ${updated}/70 questions with correct gabaritos`);
}

updateAllGabaritos()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
