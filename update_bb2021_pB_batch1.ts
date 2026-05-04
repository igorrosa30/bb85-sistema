import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2021 - Prova B (Agente Comercial) - Batch 1: Q01-Q15
const questionsData = [
    { numero: 1, materia: "Língua Portuguesa", enunciado: "De acordo com o texto 'O que é o QA...', hoje a valorização do QA tende a superar a do QI e a do QE no ambiente de trabalho porque:", alternativa_A: "as habilidades interpessoais são muito requeridas.", alternativa_B: "o conhecimento tecnológico é cada vez mais necessário.", alternativa_C: "a memória e a habilidade matemática são indicadores exigidos.", alternativa_D: "a capacidade de adaptação faz a diferença entre o homem e a máquina.", alternativa_E: "a automatização requer colaboradores que superem a rapidez e a precisão do algoritmo.", gabarito: "D" },
    { numero: 2, materia: "Língua Portuguesa", enunciado: "Ao abordar perspectivas de evolução na carreira, o texto destaca que:", alternativa_A: "a mudança no mercado de trabalho se dará pela valorização do QI.", alternativa_B: "a capacidade para detecção de padrões será valorizada.", alternativa_C: "habilidades relacionadas ao QA poderão ser aprimoradas.", alternativa_D: "atividades relativas às artes serão excluídas das mudanças.", alternativa_E: "a automatização requer colaboradores que superem a rapidez e a precisão do algoritmo.", gabarito: "C" },
    { numero: 3, materia: "Língua Portuguesa", enunciado: "O trecho que evidencia a razão pela qual novos indicadores passaram a balizar o processo de seleção das empresas é:", alternativa_A: "“Há algum tempo... poderia considerar pedir um teste de QI”.", alternativa_B: "“o QE é visto como um kit de habilidades que pode nos ajudar a ter sucesso”.", alternativa_C: "“A tecnologia mudou bastante a forma como alguns trabalhos são feitos, e a tendência continuará.”", alternativa_D: "“Seu QI o ajuda nas provas pelas quais precisa passar para se qualificar”.", alternativa_E: "“Uma coisa boa do QA é que... ele pode ser desenvolvido.”", gabarito: "C" },
    { numero: 4, materia: "Língua Portuguesa", enunciado: "No parágrafo 5, ao afirmar que 'um algoritmo pode executar essas tarefas com mais rapidez e precisão do que um humano', o texto implica que:", alternativa_A: "as habilidades interpessoais são irrelevantes.", alternativa_B: "o conhecimento tecnológico é a única barreira.", alternativa_C: "a memória humana é superior ao processamento digital.", alternativa_D: "a automatização torna obsoletas funções que envolvem detecção de padrões sugerindo a busca por novas habilidades.", alternativa_E: "a automatização requer colaboradores que superem a rapidez e a precisão do algoritmo.", gabarito: "E" },
    { numero: 5, materia: "Língua Portuguesa", enunciado: "A união dos trechos “as habilidades necessárias para prosperar no mercado de trabalho também estão mudando” e “ter QI, mas nenhum QA, pode ser um bloqueio...” resulta no período sugerido na alternativa:", alternativa_A: "As habilidades... estão mudando, embora ter QI... possa ser um bloqueio.", alternativa_B: "Como as habilidades... estão mudando, ter QI... pode ser um bloqueio.", alternativa_C: "Mesmo que as habilidades... estejam mudando, ter QI... pode ser um bloqueio.", alternativa_D: "As habilidades... estão mudando, desde que ter QI... possa ser um bloqueio.", alternativa_E: "As habilidades... estão mudando, no entanto, ter QI... pode ser um bloqueio.", gabarito: "E" },
    { numero: 6, materia: "Língua Portuguesa", enunciado: "No Texto II ('Privacidade digital'), o fragmento que sustenta a tese de que a privacidade é quase utópica é:", alternativa_A: "“A questão central não se resume somente à política de privacidade das plataformas”.", alternativa_B: "“A segurança da informação já se transformou em uma área estratégica”.", alternativa_C: "“a partir do momento em que um conteúdo é postado, ele faz parte da rede e não é mais do usuário”.", alternativa_D: "“É preciso que tanto clientes como empresas busquem mais informação”.", alternativa_E: "“Precisamos de consciência, senso crítico, responsabilidade e cuidado”.", gabarito: "C" },
    { numero: 7, materia: "Língua Portuguesa", enunciado: "A palavra destacada funciona como elemento de coesão retomando um antecedente em:", alternativa_A: "“O que é o QA” (título).", alternativa_B: "“um algoritmo pode executar essas tarefas...”", alternativa_C: "“trabalhadores que cumprem essas funções...”", alternativa_D: "“Seu QI o ajuda nas provas pelas quais precisa passar...”", alternativa_E: "“Uma coisa boa do QA é que...”", gabarito: "C" },
    { numero: 8, materia: "Língua Portuguesa", enunciado: "O vocábulo destacado NÃO pode ser substituído pelo termo entre parênteses em:", alternativa_A: "“Somos mais de um bilhão de pessoas...” (um milhão).", alternativa_B: "“...conectadas em redes sociais...” (ligadas).", alternativa_C: "“...disponíveis para o público em geral.” (à disposição).", alternativa_D: "“...deve-se ter consciência, bom senso e cautela...” (prudência).", alternativa_E: "“...evitar dores de cabeça...” (preocupações).", gabarito: "A" },
    { numero: 9, materia: "Língua Portuguesa", enunciado: "Em relação à argumentação do Texto II (Privacidade), conclui-se que:", alternativa_A: "a rede mundial é um espaço público de privacidade irrestrita.", alternativa_B: "a falta de consciência é a principal causa da perda de privacidade.", alternativa_C: "o cuidado com as informações é irrelevante.", alternativa_D: "a privacidade digital é uma utopia, reforçada pela permanência do conteúdo.", alternativa_E: "a segurança é responsabilidade exclusiva das plataformas.", gabarito: "D" },
    { numero: 10, materia: "Língua Portuguesa", enunciado: "A colocação pronominal está de acordo com a norma-padrão em:", alternativa_A: "Consideraria-se o QA mais importante que o QI?", alternativa_B: "Se busca investir naquilo que faz a diferença.", alternativa_C: "As mudanças jamais dar-se-ão sem investimento.", alternativa_D: "Os candidatos que saem-se melhor são contratados.", alternativa_E: "Alguns se consideram mais preparados para enfrentar adversidades.", gabarito: "E" },
    { numero: 11, materia: "Língua Inglesa", enunciado: "According to the 2nd paragraph of the text 'Revolution Accelerated', what is the main purpose of the study mentioned?", alternativa_A: "Present the financial results of the banking sector in 2020.", alternativa_B: "Discuss the impact of the pandemic on employees' health.", alternativa_C: "Launch new investment opportunities in banking.", alternativa_D: "Provide insights into banking leaders' approach during the crisis and their future perspectives.", alternativa_E: "Detail the new technologies that will drive banking transformation.", gabarito: "D" },
    { numero: 12, materia: "Língua Inglesa", enunciado: "According to the 2nd paragraph of the text, after the Covid-19 outbreak, banks initially had to face the following number of challenges:", alternativa_A: "1", alternativa_B: "2", alternativa_C: "3", alternativa_D: "4", alternativa_E: "5", gabarito: "C" },
    { numero: 13, materia: "Língua Inglesa", enunciado: "The overall purpose of the text is:", alternativa_A: "To explain how the banking industry works.", alternativa_B: "To discuss the impact of the pandemic on the health system.", alternativa_C: "To launch new investment opportunities.", alternativa_D: "To state that digital transformation in banking has been accelerated by the coronavirus pandemic.", alternativa_E: "To promote new AI technology.", gabarito: "D" },
    { numero: 14, materia: "Língua Inglesa", enunciado: "In the fragment 'They all agree on how they see their industry in the years to come', the pronoun 'They' refers to:", alternativa_A: "the study.", alternativa_B: "the results.", alternativa_C: "banking leaders.", alternativa_D: "Covid-19 crisis.", alternativa_E: "unprecedented times.", gabarito: "C" },
    { numero: 15, materia: "Língua Inglesa", enunciado: "The following sentence from the text is grammatically correct and coherent, EXCEPT:", alternativa_A: "Modern banking technology can help reshape the future of banks.", alternativa_B: "The pandemic brought a number of challenges and opportunities.", alternativa_C: "Banks are best-placed if they commit to end-to-end transformation.", alternativa_D: "AI will be the most game-changing technology.", alternativa_E: "Due to the coronavirus pandemic, banks are not able to meet customers' expectations in the present.", gabarito: "E" }
];

async function updateBatch1() {
    console.log("Updating BB 2021 - Prova B - Batch 1 (Q01-Q15)...");

    const prova2021B = await prisma.prova.findFirst({
        where: { id: 5 }
    });

    if (!prova2021B) {
        console.log("Prova 2021 B (ID 5) not found!");
        return;
    }

    let updatedCount = 0;
    for (const data of questionsData) {
        const question = await prisma.questao.findFirst({
            where: {
                prova_id: prova2021B.id,
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
                    comentario: `Gabarito oficial BB 2021 (Prova B): ${data.gabarito}`
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
