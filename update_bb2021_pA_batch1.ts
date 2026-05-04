import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2021 - Prova A (Agente Comercial) - Batch 1: Q01-Q15
const questionsData = [
    {
        numero: 1,
        materia: "Língua Portuguesa",
        enunciado: "Um argumento que justifica a tese de que “pensar em privacidade digital é (quase) utópico” (parágrafo 2) aparece em",
        alternativa_A: "“A questão central não se resume somente à política de privacidade das plataformas X ou Y” (parágrafo 4)",
        alternativa_B: "“A segurança da informação já se transformou em uma área estratégica para qualquer tipo de empresa” (parágrafo 5)",
        alternativa_C: "“a partir do momento em que um conteúdo é postado, ele faz parte da rede e não é mais do usuário” (parágrafo 7)",
        alternativa_D: "“É preciso que tanto clientes como empresas busquem mais informação e conteúdo técnico sobre o tema” (parágrafo 8)",
        alternativa_E: "“Precisamos de consciência, senso crítico, responsabilidade e cuidado para levar a internet a um outro nível.” (parágrafo 9)",
        gabarito: "C"
    },
    {
        numero: 2,
        materia: "Língua Portuguesa",
        enunciado: "Depois de questionar se o conteúdo que circula nas redes é realmente propriedade do usuário (parágrafo 6), o texto desenvolve a ideia de que",
        alternativa_A: "a maior parte dos usuários no mundo acessa a internet por meio de um smartphone.",
        alternativa_B: "a segurança da informação já se transformou em uma área estratégica para as empresas.",
        alternativa_C: "as empresas e os provedores conseguem rastrear os usuários por meio de endereço de e-mail.",
        alternativa_D: "as organizações devem conscientizar os clientes em relação aos limites da privacidade digital.",
        alternativa_E: "as pessoas deixam rastros na rede que podem ser descobertos a qualquer momento.",
        gabarito: "D"
    },
    {
        numero: 3,
        materia: "Língua Portuguesa",
        enunciado: "O segmento do texto em que o emprego do acento grave indica o uso correto da crase é",
        alternativa_A: "à política de privacidade.",
        alternativa_B: "à empresa cabe orientar.",
        alternativa_C: "à conscientização dos usuários.",
        alternativa_D: "à maior parte dos usuários.",
        alternativa_E: "à própria rede.",
        gabarito: "A"
    },
    {
        numero: 4,
        materia: "Língua Portuguesa",
        enunciado: "No trecho “Às organizações, cabe o desafio de orientar seus clientes, já que, na maioria das vezes, eles não sabem quais são os limites da privacidade digital” (parágrafo 8), a expressão destacada expressa a noção de",
        alternativa_A: "condição.",
        alternativa_B: "finalidade.",
        alternativa_C: "concessão.",
        alternativa_D: "causalidade.",
        alternativa_E: "comparação.",
        gabarito: "D"
    },
    {
        numero: 5,
        materia: "Língua Portuguesa",
        enunciado: "A palavra ou a expressão a que se refere o termo em destaque está corretamente explicitada entre colchetes em",
        alternativa_A: "“sendo que 2,9 bilhões delas fazem isso pelo smartphone” (parágrafo 1) – [rede mundial]",
        alternativa_B: "“Ela é importante, inclusive, para trazer mais clareza e consciência para os usuários.” (parágrafo 3) – [exposição]",
        alternativa_C: "“Isso porque, embora muitas pessoas não saibam, a maioria das redes sociais prevê que, a partir do momento” (parágrafo 7) – [redes sociais]",
        alternativa_D: "“a partir do momento em que um conteúdo é postado, ele faz parte da rede e não é mais do usuário” (parágrafo 7) – [momento]",
        alternativa_E: "“É fato que ela não é segura, a questão, então, é como usá-la de maneira mais inteligente e contribuir para fortalecer a privacidade digital?” (parágrafo 9) – [internet]",
        gabarito: "E"
    },
    {
        numero: 6,
        materia: "Língua Portuguesa",
        enunciado: "O pronome destacado foi utilizado na posição correta, segundo as exigências da norma-padrão da língua portuguesa, em:",
        alternativa_A: "A associação brasileira de mercados financeiros publicou uma diretriz de segurança, na qual mostra-se a necessidade de adequação de proteção de dados.",
        alternativa_B: "A segurança da informação já se transformou em uma área estratégica para qualquer tipo de empresa.",
        alternativa_C: "Naquele evento, ninguém tinha-se incomodado com o palestrante no início do debate a respeito de privacidade digital.",
        alternativa_D: "Apesar das dificuldades encontradas, sempre referimo-nos com cuidado aos nossos dados pessoais, como CPF, RG, e-mail, para proteção da vida privada.",
        alternativa_E: "Quanto ao conteúdo das redes, sabe-se que muitos usuários sentem-se desprotegidos.",
        gabarito: "B"
    },
    {
        numero: 7,
        materia: "Língua Portuguesa",
        enunciado: "De acordo com as exigências da norma-padrão da língua portuguesa, a concordância verbal está corretamente empregada na forma destacada em:",
        alternativa_A: "Em grupos de jovens usuários de redes sociais, constataram-se inúmeras situações de dependência crônica do uso de aparelhos celulares.",
        alternativa_B: "Nas análises sobre privacidade dos usuários, atribuem-se corretamente aos aplicativos de conversas a maior responsabilidade pela situação atual.",
        alternativa_C: "Para entender o público das plataformas digitais, analisaram-se, durante dez semanas, o comportamento de jovens considerados viciados em aplicativos.",
        alternativa_D: "As pesquisas tecnológicas são indispensáveis devido à importância de solucionar problemas causados pela invasão de dados.",
        alternativa_E: "O surgimento das redes sociais e dos sites de compartilhamento conduziu as pessoas a novas situações de risco na sociedade atual.",
        gabarito: "B"
    },
    {
        numero: 8,
        materia: "Língua Portuguesa",
        enunciado: "No trecho “A segurança da informação já se transformou em uma área estratégica para qualquer tipo de empresa.” (parágrafo 5), a expressão “qualquer tipo de empresa” pode ser substituída, sem alteração de sentido, por:",
        alternativa_A: "uma empresa qualquer.",
        alternativa_B: "toda e qualquer empresa.",
        alternativa_C: "as mais diversas empresas.",
        alternativa_D: "algumas empresas.",
        alternativa_E: "certas empresas.",
        gabarito: "B"
    },
    {
        numero: 9,
        materia: "Língua Portuguesa",
        enunciado: "O texto apresenta um conectivo que estabelece uma relação de oposição em:",
        alternativa_A: "“Ao redor do mundo, cerca de 4 bilhões de pessoas usam a rede mundial” (parágrafo 1)",
        alternativa_B: "“Ela é importante, inclusive, para trazer mais clareza e consciência para os usuários.” (parágrafo 3)",
        alternativa_C: "“Infelizmente, basta ter um endereço de e-mail para ser rastreado por diferentes empresas e provedores.” (parágrafo 4)",
        alternativa_D: "“No entanto, o limite entre o desejo de exposição e a necessidade de proteção ainda é tênue.” (parágrafo 6)",
        alternativa_E: "“Às organizações, cabe o desafio de orientar seus clientes” (parágrafo 8)",
        gabarito: "D"
    },
    {
        numero: 10,
        materia: "Língua Portuguesa",
        enunciado: "No parágrafo 9, o autor reforça que o combate à falta de segurança na rede exige dos usuários:",
        alternativa_A: "conhecimento técnico avançado e investimento em softwares de proteção.",
        alternativa_B: "uso restrito aos ambientes corporativos e governamentais.",
        alternativa_C: "abandono total das redes sociais e de compartilhamento de dados.",
        alternativa_D: "participação em conferências internacionais sobre governança da internet.",
        alternativa_E: "consciência, senso crítico, responsabilidade e cuidado.",
        gabarito: "E"
    },
    {
        numero: 11,
        materia: "Língua Inglesa",
        enunciado: "According to the second paragraph, the concept of robotic soccer players emerged",
        alternativa_A: "in 1997",
        alternativa_B: "in the 1990s",
        alternativa_C: "before the 1990s",
        alternativa_D: "in the 2000s",
        alternativa_E: "after 2010",
        gabarito: "B"
    },
    {
        numero: 12,
        materia: "Língua Inglesa",
        enunciado: "In the sentence fragment of the fifth paragraph “Designing robots for sports requires much more than experts in state-of-the-art technology”, the words in bold can be replaced, without any change in meaning, by the following words:",
        alternativa_A: "drawing / scholars",
        alternativa_B: "creating / amateurs",
        alternativa_C: "planning / specialists",
        alternativa_D: "finishing / professionals",
        alternativa_E: "manufacturing / engineers",
        gabarito: "C"
    },
    {
        numero: 13,
        materia: "Língua Inglesa",
        enunciado: "In the text fragment of the sixth paragraph “RoboCup Soccer Federation, the “FIFA” of robots, which supports five leagues, imposes restrictions on players' design and rules of the game”, the word which refers to",
        alternativa_A: "game",
        alternativa_B: "FIFA",
        alternativa_C: "players",
        alternativa_D: "leagues",
        alternativa_E: "RoboCup Soccer Federation",
        gabarito: "E"
    },
    {
        numero: 14,
        materia: "Língua Inglesa",
        enunciado: "In paragraph 7, the word However in the fragment “In the humanoid league, the players are human-like robots with human-like senses. However, they are rather slow” can be replaced, without change in meaning, by",
        alternativa_A: "unless",
        alternativa_B: "indeed",
        alternativa_C: "furthermore",
        alternativa_D: "nevertheless",
        alternativa_E: "consequently",
        gabarito: "D"
    },
    {
        numero: 15,
        materia: "Língua Inglesa",
        enunciado: "In paragraph 9, there is the information that in RoboCup competitions the game referee and the team coaches are",
        alternativa_A: "humanoids",
        alternativa_B: "computers",
        alternativa_C: "real people",
        alternativa_D: "robotic engineers",
        alternativa_E: "virtual mechanisms",
        gabarito: "C"
    }
];

async function updateBatch1() {
    console.log("Updating BB 2021 - Prova A - Batch 1 (Q01-Q15)...");

    const prova2021A = await prisma.prova.findFirst({
        where: { id: 4 }
    });

    if (!prova2021A) {
        console.log("Prova 2021 A (ID 4) not found!");
        return;
    }

    let updatedCount = 0;
    for (const data of questionsData) {
        const question = await prisma.questao.findFirst({
            where: {
                prova_id: prova2021A.id,
                numero_base: data.numero
            }
        });

        if (question) {
            await prisma.questao.update({
                where: { id: question.id },
                data: {
                    enunciado: data.enunciado,
                    alternativa_A: data.alternativa_A,
                    alternativa_B: data.alternativa_B,
                    alternativa_C: data.alternativa_C,
                    alternativa_D: data.alternativa_D,
                    alternativa_E: data.alternativa_E,
                    alternativa_correta_base: data.gabarito,
                    materia: data.materia,
                    comentario: `Gabarito oficial BB 2021 (Prova A): ${data.gabarito}`
                }
            });
            updatedCount++;
            console.log(`✅ Updated Q${data.numero} - ${data.materia}`);
        }
    }

    console.log(`\n✅ Batch 1 complete! Updated ${updatedCount} questions`);
}

updateBatch1()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
