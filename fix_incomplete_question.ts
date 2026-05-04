import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixIncompleteQuestion() {
    console.log("Searching for incomplete question...");

    // Find the question with incomplete enunciado
    const incompleteQuestion = await prisma.questao.findFirst({
        where: {
            enunciado: {
                contains: "Texto a ser transcrito"
            }
        },
        include: {
            prova: true
        }
    });

    if (!incompleteQuestion) {
        console.log("Question not found!");
        return;
    }

    console.log(`Found question ID: ${incompleteQuestion.id}`);
    console.log(`Current enunciado: ${incompleteQuestion.enunciado}`);

    // Update with correct enunciado
    const correctEnunciado = "De acordo com as exigências da norma-padrão da língua portuguesa, o verbo destacado está corretamente empregado em:";

    const correctAlternatives = {
        A: "No mundo moderno, conferem-se às grandes metrópoles importante papel no desenvolvimento da economia e da geopolítica mundiais, por estarem no topo da hierarquia urbana.",
        B: "Conforme o grau de influência e importância internacional, classificou-se as 50 maiores cidades em três diferentes classes, a maior parte delas na Europa.",
        C: "Há quase duzentos anos, atribuem-se às cidades a responsabilidade de motor propulsor do desenvolvimento e a condição de lugar privilegiado para os negócios e a cultura.",
        D: "Em centros com grandes aglomerações populacionais, realiza-se negócios nacionais e internacionais, além de um atendimento bastante diversificado, como jornais, teatros, cinemas, entre outros.",
        E: "Em todos os estudos geopolíticos, considera-se as cidades globais como verdadeiros polos de influência internacional, devido à presença de sedes de grandes empresas transnacionais e importantes centros de pesquisas."
    };

    await prisma.questao.update({
        where: { id: incompleteQuestion.id },
        data: {
            enunciado: correctEnunciado,
            alternativa_A: correctAlternatives.A,
            alternativa_B: correctAlternatives.B,
            alternativa_C: correctAlternatives.C,
            alternativa_D: correctAlternatives.D,
            alternativa_E: correctAlternatives.E,
            alternativa_correta_base: "C",
            comentario: "Gabarito oficial BB 2018"
        }
    });

    console.log("✅ Question updated successfully!");
}

fixIncompleteQuestion()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
