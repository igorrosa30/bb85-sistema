import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Complete question data for BB 2018 - First batch (Q1-Q5)
const questionsData = [
    {
        numero: 1,
        materia: "Língua Portuguesa",
        enunciado: "De acordo com as exigências da norma-padrão da língua portuguesa, o verbo destacado está corretamente empregado em:",
        alternativa_A: "No mundo moderno, confere-se às grandes metrópoles importante papel no desenvolvimento da economia e da geopolítica mundiais, por estarem no topo da hierarquia urbana.",
        alternativa_B: "Conforme o grau de influência e importância internacional, classificaram-se as 50 maiores cidades em três diferentes classes, a maior parte delas na Europa.",
        alternativa_C: "Há quase duzentos anos, atribuem-se às cidades a responsabilidade de motor propulsor do desenvolvimento e a condição de lugar privilegiado para os negócios e a cultura.",
        alternativa_D: "Em centros com grandes aglomerações populacionais, realiza-se negócios nacionais e internacionais, além de um atendimento bastante diversificado, como jornais, teatros, cinemas, entre outros.",
        alternativa_E: "Em todos os estudos geopolíticos, considera-se as cidades globais como verdadeiros polos de influência internacional, devido à presença de sedes de grandes empresas transnacionais e importantes centros de pesquisas.",
        gabarito: "A"
    },
    {
        numero: 2,
        materia: "Língua Portuguesa",
        enunciado: "A regência do verbo destacado está de acordo com as exigências da norma-padrão da língua portuguesa em:",
        alternativa_A: "Para ganhar espaço no mercado imobiliário, os bancos costumam ampliar prazos e limites e baratear o financiamento da casa própria.",
        alternativa_B: "O planejamento econômico é fundamental para o sucesso de um empreendimento familiar, o que envolve o ato de pesquisar as melhores oportunidades disponíveis.",
        alternativa_C: "Antes de se comprometer com a aquisição de um imóvel acima de sua renda, recomenda-se ao comprador que pesquise melhores condições de mercado.",
        alternativa_D: "A inadimplência ocorre quando o cidadão não acata as cláusulas que determinam os prazos dos empréstimos bancários.",
        alternativa_E: "Grande parte das pessoas que se candidatam a empréstimos bancários aspiram à construção da casa própria.",
        gabarito: "C"
    },
    {
        numero: 3,
        materia: "Língua Portuguesa",
        enunciado: "O pronome destacado foi utilizado na posição correta, segundo as exigências da norma-padrão da língua portuguesa, em:",
        alternativa_A: "Quando as carreiras tradicionais saturam-se, os futuros profissionais têm de recorrer a outras alternativas.",
        alternativa_B: "Caso os responsáveis pela limpeza urbana descuidem-se de sua tarefa, muitas doenças transmissíveis podem proliferar.",
        alternativa_C: "As empresas têm mantido-se atentas às leis de proteção ambiental vigentes no país poderão ser penalizadas.",
        alternativa_D: "Os dirigentes devem esforçar-se para que os funcionários tenham consciência de ações de proteção ao meio ambiente.",
        alternativa_E: "Os trabalhadores das áreas rurais nunca enganaram-se a respeito da importância da agricultura para a subsistência da humanidade.",
        gabarito: "D"
    },
    {
        numero: 5,
        materia: "Língua Portuguesa",
        enunciado: "De acordo com a norma-padrão da língua portuguesa, a pontuação está corretamente empregada em:",
        alternativa_A: "O conjunto de preocupações e ações efetivas, quando atendem, de forma voluntária, aos funcionários e à comunidade em geral, pode ser definido como responsabilidade social.",
        alternativa_B: "As empresas que optam por encampar a prática da responsabilidade social, beneficiam-se de conseguir uma melhor imagem no mercado.",
        alternativa_C: "A noção de responsabilidade social foi muito utilizada em campanhas publicitárias: por isso, as empresas precisam relacionar-se melhor, com a sociedade.",
        alternativa_D: "A responsabilidade social explora um leque abrangente de beneficiários, envolvendo assim: a qualidade de vida o bem-estar dos trabalhadores, a redução de impactos negativos, no meio ambiente.",
        alternativa_E: "Alguns críticos da responsabilidade social defendem a ideia de que: o objetivo das empresas é o lucro e a geração de empregos não a preocupação com a sociedade como um todo.",
        gabarito: "A"
    }
];

async function updateQuestions() {
    console.log("Updating BB 2018 questions - Batch 1 (Q1-Q5)...\n");

    // Find the 2018 prova
    const prova2018 = await prisma.prova.findFirst({
        where: { ano: 2018 }
    });

    if (!prova2018) {
        console.log("Prova 2018 not found!");
        return;
    }

    console.log(`Found prova ID: ${prova2018.id}\n`);

    for (const q of questionsData) {
        // Find the question by numero_base
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
            console.log(`✅ Updated Q${q.numero} (ID ${question.id})`);
        } else {
            console.log(`❌ Question ${q.numero} not found`);
        }
    }

    console.log(`\n✅ Batch 1 complete! Updated ${questionsData.length} questions`);
    console.log(`Remaining: ${70 - questionsData.length} questions`);
}

updateQuestions()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
