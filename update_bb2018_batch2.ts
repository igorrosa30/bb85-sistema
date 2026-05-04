import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2018 - Batch 2: Q4 + Q6-Q15 (11 questions)
const questionsData = [
    {
        numero: 4,
        materia: "Língua Portuguesa",
        enunciado: "De acordo com a norma-padrão da língua portuguesa, o uso do acento grave indicativo da crase é obrigatório na palavra destacada em:",
        alternativa_A: "Os pais, inseguros na sua tarefa de educar, não percebem que falta de limites e superproteção comprometem a formação dos filhos.",
        alternativa_B: "A indisciplina nas salas de aula aumentou a partir do momento em que as mídias divulgaram a necessidade de dar maior liberdade aos estudantes.",
        alternativa_C: "A atenção e a motivação são condições que levam a pessoa a pensar e agir de forma satisfatória para desenvolver o processo de aprendizagem.",
        alternativa_D: "As famílias e as escolas encontram-se, na atualidade, frente a jovens com quem não conseguem estabelecer um diálogo produtivo.",
        alternativa_E: "As escolas chegaram a etapa em que os professores estão cada vez mais com dificuldade para exercer o seu importante papel de ensinar.",
        gabarito: "E"
    },
    {
        numero: 6,
        materia: "Língua Inglesa",
        enunciado: "Text: Bank Clerk Job Description\n\nThe main purpose of the text is to",
        alternativa_A: "introduce the many categories of bank clerks one can find in a financial institution.",
        alternativa_B: "present an overview of the career of a bank clerk to an eventual future professional.",
        alternativa_C: "denounce the disadvantages associated with the clerk profession.",
        alternativa_D: "discuss all the benefits offered to employees who work in a bank.",
        alternativa_E: "ask for changes in the way bank recruiters select their future employees.",
        gabarito: "B"
    },
    {
        numero: 7,
        materia: "Língua Inglesa",
        enunciado: "In the sentence of the text \"Generally, loan clerks are on the high end of this range, whereas general office clerks are on the lower end\", the word whereas",
        alternativa_A: "expresses a contrast.",
        alternativa_B: "highlights a problem.",
        alternativa_C: "imposes a condition.",
        alternativa_D: "introduces an example.",
        alternativa_E: "points out a solution.",
        gabarito: "D"
    },
    {
        numero: 8,
        materia: "Língua Inglesa",
        enunciado: "The fragment \"Banks simplify people's lives, but the business of banking is anything but simple\" means that banking is a(n)",
        alternativa_A: "ordinary occupation.",
        alternativa_B: "elementary job.",
        alternativa_C: "complex activity.",
        alternativa_D: "trivial profession.",
        alternativa_E: "easy business.",
        gabarito: "C"
    },
    {
        numero: 9,
        materia: "Língua Inglesa",
        enunciado: "In the sentence of the text \"Generally, loan clerks are on the high end of this range, whereas general office clerks are on the lower end\" (lines 78-80), the word whereas",
        alternativa_A: "expresses a contrast.",
        alternativa_B: "highlights a problem.",
        alternativa_C: "imposes a condition.",
        alternativa_D: "introduces an example.",
        alternativa_E: "points out a solution.",
        gabarito: "A"
    },
    {
        numero: 10,
        materia: "Língua Inglesa",
        enunciado: "According to the text, for banks to provide training for their employees, it is necessary that these employees",
        alternativa_A: "have a college degree.",
        alternativa_B: "pay for the training.",
        alternativa_C: "are new employees.",
        alternativa_D: "have previous experience.",
        alternativa_E: "are recruited from high schools.",
        gabarito: "C"
    },
    {
        numero: 11,
        materia: "Matemática",
        enunciado: "Para x maior que 0, seja Sx a soma dos termos da progressão geométrica infinita (x, x²/2, x³/4, x⁴/8, ...). O número real x para o qual se tem Sx = 1/4 é",
        alternativa_A: "1/8",
        alternativa_B: "1/4",
        alternativa_C: "1/2",
        alternativa_D: "1",
        alternativa_E: "2",
        gabarito: "B"
    },
    {
        numero: 12,
        materia: "Matemática",
        enunciado: "O dono de uma loja deu um desconto de 20% sobre o preço de venda (preço original) de um de seus produtos e, ainda assim, obteve um lucro de 4% sobre o preço de custo desse produto. Se vendesse pelo preço original, qual seria o lucro obtido sobre o preço de custo?",
        alternativa_A: "24%",
        alternativa_B: "30%",
        alternativa_C: "32%",
        alternativa_D: "36%",
        alternativa_E: "40%",
        gabarito: "B"
    },
    {
        numero: 13,
        materia: "Matemática",
        enunciado: "Sabe-se que g é uma função par e está definida em todo domínio da função f, e a função f pode ser expressa por f(x) = x² + k·x·g(x). Se f(1) = 7, qual o valor de f(-1)?",
        alternativa_A: "-7",
        alternativa_B: "-1",
        alternativa_C: "1",
        alternativa_D: "3",
        alternativa_E: "7",
        gabarito: "E"
    },
    {
        numero: 14,
        materia: "Matemática",
        enunciado: "Considere o conjunto A cujos 5 elementos são números inteiros, e o conjunto B formado por todos os possíveis produtos de três elementos de A. Se B = {-30, -20, -12, 0, 30}, qual o valor da soma de todos os elementos de A?",
        alternativa_A: "-2",
        alternativa_B: "-1",
        alternativa_C: "0",
        alternativa_D: "1",
        alternativa_E: "2",
        gabarito: "D"
    },
    {
        numero: 15,
        materia: "Matemática",
        enunciado: "Uma sequência numérica tem seu termo geral representado por aₙ, para n ≥ 1. Sabe-se que a₁ = 0 e que a sequência cujo termo geral é bₙ = aₙ₊₁ - aₙ, n ≥ 1, é uma progressão aritmética cujo primeiro termo é b₁ = 9 e cuja razão é igual a 4. Qual é o valor de a₁₀?",
        alternativa_A: "234",
        alternativa_B: "252",
        alternativa_C: "270",
        alternativa_D: "288",
        alternativa_E: "306",
        gabarito: "B"
    }
];

async function updateBatch2() {
    console.log("Updating BB 2018 - Batch 2 (Q4, Q6-Q15)...\n");

    const prova2018 = await prisma.prova.findFirst({
        where: { ano: 2018 }
    });

    if (!prova2018) {
        console.log("Prova 2018 not found!");
        return;
    }

    console.log(`Found prova ID: ${prova2018.id}\n`);

    for (const q of questionsData) {
        const question = await prisma.questao.findFirst({
            where: {
                prova_id: prova2018.id,
                numero_base: q.numero
            }
        });

        if (question) {
            await prisma.questao.update({
                where: { id: question.id },
                data: {
                    enunciado: q.enunciado,
                    alternativa_A: q.alternativa_A,
                    alternativa_B: q.alternativa_B,
                    alternativa_C: q.alternativa_C,
                    alternativa_D: q.alternativa_D,
                    alternativa_E: q.alternativa_E,
                    alternativa_correta_base: q.gabarito,
                    materia: q.materia,
                    comentario: `Gabarito oficial BB 2018: ${q.gabarito}`
                }
            });
            console.log(`✅ Updated Q${q.numero} (ID ${question.id}) - ${q.materia}`);
        }
    }

    console.log(`\n✅ Batch 2 complete! Updated ${questionsData.length} questions`);
    console.log(`Total complete: ${4 + questionsData.length}/70 (${((4 + questionsData.length) / 70 * 100).toFixed(1)}%)`);
}

updateBatch2()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
