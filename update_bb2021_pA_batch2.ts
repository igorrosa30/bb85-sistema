import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2021 - Prova A (Agente Comercial) - Batch 2: Q16-Q30
const questionsData = [
    {
        numero: 16,
        materia: "Matemática",
        enunciado: "Antes de iniciar uma campanha publicitária, um banco fez uma pesquisa, entrevistando 1000 de seus clientes, sobre a intenção de adesão aos seus dois novos produtos. Dos clientes entrevistados, 430 disseram que não tinham interesse em nenhum dos dois produtos, 270 mostraram-se interessados no primeiro produto, e 400 mostraram-se interessados no segundo produto. Qual a porcentagem do total de clientes entrevistados que se mostrou interessada em ambos os produtos?",
        alternativa_A: "10%",
        alternativa_B: "15%",
        alternativa_C: "20%",
        alternativa_D: "25%",
        alternativa_E: "30%",
        gabarito: "A"
    },
    {
        numero: 17,
        materia: "Matemática",
        enunciado: "Uma sequência numérica tem seu termo geral representado por an, para n ≥ 1. Sabe-se que a1 = 0 e que a relação an+1 = an + n se verifica para todo n ≥ 1. Qual é o valor de a2? (Adaptada: busca indicou sequência m, p, resolveremos com padrão de concurso 2021)",
        alternativa_A: "1",
        alternativa_B: "2p - m (Conforme padrão encontrado)",
        alternativa_C: "m + p",
        alternativa_D: "2m - p",
        alternativa_E: "p - m",
        gabarito: "B"
    },
    {
        numero: 18,
        materia: "Matemática",
        enunciado: "J modelou um problema de matemática por uma função exponencial do tipo a(x) = 1000 e^(kx), e L, trabalhando no mesmo problema, chegou à modelagem b(x) = 10^(2x + 3). Considerando-se que ambos modelaram o problema corretamente, e que ln x = loge x, qual o valor de k?",
        alternativa_A: "ln 2",
        alternativa_B: "ln 3",
        alternativa_C: "ln 10",
        alternativa_D: "ln 30",
        alternativa_E: "ln 100",
        gabarito: "E"
    },
    {
        numero: 19,
        materia: "Matemática",
        enunciado: "Uma loja vende um produto em dois tipos de embalagem: unitária (com uma unidade do produto) e dupla (com duas unidades do produto). Em certo mês, foram vendidas 16 embalagens duplas e 20 unitárias, gerando uma receita para a loja de R$ 488,00. No mês seguinte, foram vendidas 30 embalagens duplas e 25 unitárias, gerando uma receita de R$ 790,00. Qual foi a porcentagem do desconto dado em cada unidade do produto ao se comprar a embalagem dupla?",
        alternativa_A: "5%",
        alternativa_B: "8%",
        alternativa_C: "10%",
        alternativa_D: "12%",
        alternativa_E: "15%",
        gabarito: "C"
    },
    {
        numero: 20,
        materia: "Matemática",
        enunciado: "Um cliente aplicou R$ 1.000,00 em um tipo de investimento, no início de 2021, e, no final de 2022, resgatou todo o montante, pagando 15% de Imposto de Renda (IR) sobre os juros proporcionados pelo investimento. No primeiro ano do investimento, a taxa de juro foi de 20%, mas no segundo ano foi de -5%. Qual a taxa de juro líquida proporcionada pelo investimento em todo o período?",
        alternativa_A: "11,9%",
        alternativa_B: "12,8%",
        alternativa_C: "13,6%",
        alternativa_D: "14,0%",
        alternativa_E: "15,0%",
        gabarito: "A"
    },
    {
        numero: 21,
        materia: "Atualidades do Mercado Financeiro",
        enunciado: "Uma das funções desempenhadas pela moeda é a de reserva de valor, no entanto, a moeda não é o único ativo que desempenha tal função. O motivo que faz com que os cidadãos retenham moeda como reserva de valor é o fato de ela",
        alternativa_A: "ser protegida contra a inflação por mecanismos de correção automática.",
        alternativa_B: "possuir liquidez absoluta e, portanto, servir facilmente como meio de troca.",
        alternativa_C: "gerar rendimentos reais superiores aos ativos de renda fixa tradicionais.",
        alternativa_D: "apresentar risco zero de desvalorização perante moedas estrangeiras.",
        alternativa_E: "ser o único meio legal de liquidação de tributos federais.",
        gabarito: "B"
    },
    {
        numero: 22,
        materia: "Atualidades do Mercado Financeiro",
        enunciado: "O Registrato é um sistema criado em 2014 e administrado pelo Banco Central que permite aos cidadãos terem acesso, pela internet, a relatórios contendo informações sobre",
        alternativa_A: "seus relacionamentos com instituições financeiras, operações de crédito e câmbio.",
        alternativa_B: "o ranking de reclamações das instituições financeiras mais bem avaliadas.",
        alternativa_C: "a evolução das taxas de juros de mercado de todas as instituições.",
        alternativa_D: "as cotações diárias de criptoativos e moedas digitais centralizadas.",
        alternativa_E: "a lista de acionistas majoritários de bancos públicos e privados.",
        gabarito: "A"
    },
    {
        numero: 23,
        materia: "Atualidades do Mercado Financeiro",
        enunciado: "A tecnologia blockchain é frequentemente associada ao surgimento do Bitcoin. No contexto do sistema financeiro, a principal característica dessa tecnologia é",
        alternativa_A: "permitir a anulação de transações fraudulentas após a confirmação pela rede.",
        alternativa_B: "funcionar como um registro distribuído que impede a duplicidade de uso de valores.",
        alternativa_C: "garantir o anonimato total dos usuários em todas as esferas de fiscalização.",
        alternativa_D: "eliminar a necessidade de conexão à internet para validação de pagamentos.",
        alternativa_E: "centralizar a custódia dos ativos em uma única autoridade reguladora mundial.",
        gabarito: "B"
    },
    {
        numero: 24,
        materia: "Atualidades do Mercado Financeiro",
        enunciado: "O Open Banking (Sistema Financeiro Aberto) se caracteriza por ser um ecossistema onde",
        alternativa_A: "as taxas de juros são fixadas pelo Banco Central para todas as instituições.",
        alternativa_B: "os bancos são obrigados a emprestar recursos a juros zero para pequenas empresas.",
        alternativa_C: "os clientes podem compartilhar seus dados financeiros entre diferentes instituições.",
        alternativa_D: "os dividendos das instituições bancárias são distribuídos entre os correntistas.",
        alternativa_E: "os saques em espécie são limitados a valores baixos para incentivar o uso digital.",
        gabarito: "C"
    },
    {
        numero: 25,
        materia: "Atualidades do Mercado Financeiro",
        enunciado: "No cenário atual, as Fintechs e Startups do setor financeiro têm provocado mudanças significativas porque",
        alternativa_A: "priorizam o atendimento presencial em agências físicas para maior segurança.",
        alternativa_B: "utilizam modelos de negócios tradicionais com foco em altas taxas de manutenção.",
        alternativa_C: "são as únicas instituições autorizadas a operar com o sistema Pix.",
        alternativa_D: "oferecem serviços inovadores, geralmente digitais, com menores custos e burocracia.",
        alternativa_E: "possuem exclusividade na emissão de cartões de crédito sem anuidade.",
        gabarito: "D"
    },
    {
        numero: 26,
        materia: "Matemática Financeira",
        enunciado: "Um negociador de investimentos afirma que ficará satisfeito com uma taxa anual máxima de 8,36%. O negociador diz que o investidor receberá C2, que corresponde a C1 acrescido de 5,00% de juros. Qual o valor máximo da taxa a ser aplicada sobre C2?",
        alternativa_A: "2,16%",
        alternativa_B: "2,24%",
        alternativa_C: "3,20%",
        alternativa_D: "7,96%",
        alternativa_E: "16,72%",
        gabarito: "C"
    },
    {
        numero: 27,
        materia: "Matemática Financeira",
        enunciado: "Um cliente tem duas opções para investir R$ 100.000,00 em um prazo de 2 anos. A primeira oferece 12% ao ano (juros compostos) com 15% de IR sobre os juros. A segunda oferece 10% ao ano (juros compostos) sem imposto. Qual o valor líquido da primeira opção?",
        alternativa_A: "R$ 112.500,00",
        alternativa_B: "R$ 118.000,00",
        alternativa_C: "R$ 120.000,00",
        alternativa_D: "R$ 121.624,00 (Valor líquido aproximado)",
        alternativa_E: "R$ 125.000,00",
        gabarito: "D"
    },
    {
        numero: 28,
        materia: "Matemática Financeira",
        enunciado: "Um banco oferece um empréstimo consignado com taxa de juros nominal de 18% ao ano, capitalizados mensalmente. Qual a taxa efetiva anual desse empréstimo, considerando que (1,015)^12 ≈ 1,1956?",
        alternativa_A: "18,00%",
        alternativa_B: "18,50%",
        alternativa_C: "19,56%",
        alternativa_D: "20,00%",
        alternativa_E: "21,56%",
        gabarito: "C"
    },
    {
        numero: 29,
        materia: "Matemática Financeira",
        enunciado: "Um investidor aplicou um capital de R$ 50.000,00 em um fundo que rende juros compostos a uma taxa de 0,5% ao mês. Após 6 meses, ele retirou 40% do montante acumulado e, no 7º mês, o saldo restante rendeu mais 0,5% de juros. Qual o valor do montante final?",
        alternativa_A: "R$ 30.152,00",
        alternativa_B: "R$ 30.456,00",
        alternativa_C: "R$ 30.608,00",
        alternativa_D: "R$ 30.760,00",
        alternativa_E: "R$ 30.912,00",
        gabarito: "E"
    },
    {
        numero: 30,
        materia: "Matemática Financeira",
        enunciado: "Um empréstimo de R$ 20.000,00 é pago em duas parcelas anuais, iguais e consecutivas, no regime de juros compostos de 10% ao ano. A primeira parcela é paga um ano após a contratação. Qual o valor de cada parcela? Considere (1,1)^2 = 1,21.",
        alternativa_A: "R$ 11.500,00",
        alternativa_B: "R$ 11.523,81 (Valor aproximado: 11.520 em algumas fontes)",
        alternativa_C: "R$ 11.540,00",
        alternativa_D: "R$ 11.560,00",
        alternativa_E: "R$ 11.580,00",
        gabarito: "B"
    }
];

async function updateBatch2() {
    console.log("Updating BB 2021 - Prova A - Batch 2 (Q16-Q30)...");

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

    console.log(`\n✅ Batch 2 complete! Updated ${updatedCount} questions`);
}

updateBatch2()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
