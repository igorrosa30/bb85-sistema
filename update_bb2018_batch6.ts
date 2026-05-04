import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2018 - Batch 6: Q61-Q70
// Version: Gabarito 1 (Standard / Agente Tech mix as per DB sequence)
const questionsData = [
    {
        numero: 61,
        materia: "Vendas e Negociação",
        enunciado: "No contexto da gestão de serviços, um banco deseja medir o nível de satisfação dos seus clientes logo após a realização de um atendimento. Qual indicador é comumente utilizado para medir a probabilidade de um cliente indicar os serviços do banco para amigos e familiares?",
        alternativa_A: "Churn rate.",
        alternativa_B: "ROI (Retorno sobre Investimento).",
        alternativa_C: "NPS (Net Promoter Score).",
        alternativa_D: "CPA (Custo por Aquisição).",
        alternativa_E: "KPI (Key Performance Indicator).",
        gabarito: "C"
    },
    {
        numero: 62,
        materia: "Vendas e Negociação",
        enunciado: "Durante um atendimento bancário, qual ação é considerada mais eficaz para aumentar as chances de fechamento de uma venda de produto financeiro?",
        alternativa_A: "Informar ao cliente sobre as metas mensais da agência.",
        alternativa_B: "Focar exclusivamente nas taxas de juros, omitindo outros benefícios.",
        alternativa_C: "Induzir o cliente a adquirir um produto de alta margem independente de sua utilidade.",
        alternativa_D: "Fazer perguntas abertas para identificar as reais necessidades e o perfil do cliente.",
        alternativa_E: "Comparar de forma agressiva os serviços do banco com os da concorrência.",
        gabarito: "D"
    },
    {
        numero: 63,
        materia: "Vendas e Negociação",
        enunciado: "Uma rede bancária deseja aprimorar sua estratégia de telemarketing receptivo. Para que o atendimento seja padronizado e resolutivo, a instituição deve:",
        alternativa_A: "Comprar cadastros de pessoas que não são correntistas.",
        alternativa_B: "Priorizar a quantidade de ligações sobre a qualidade do suporte.",
        alternativa_C: "Focar em técnicas de fechamento rápido para diminuir o tempo de fala.",
        alternativa_D: "Limitar o atendimento apenas a dúvidas básicas, encaminhando tudo para a agência.",
        alternativa_E: "Treinar periodicamente os funcionários na dinâmica do atendimento e padrão de qualidade.",
        gabarito: "E"
    },
    {
        numero: 64,
        materia: "Vendas e Negociação",
        enunciado: "Um gerente de agência, visando melhorar a percepção de qualidade dos clientes sobre os serviços prestados, investe no treinamento dos funcionários da recepção. Essa ação foca qual dimensão da qualidade em serviços?",
        alternativa_A: "Tangibilidade.",
        alternativa_B: "Presteza (ou Empatia).",
        alternativa_C: "Confiabilidade.",
        alternativa_D: "Segurança.",
        alternativa_E: "Garantia.",
        gabarito: "B"
    },
    {
        numero: 65,
        materia: "Vendas e Negociação",
        enunciado: "Em uma estratégia de marketing de serviços, a utilização de crachás, uniformes padronizados e um ambiente limpo visa reduzir a incerteza do cliente. Esse esforço é conhecido como:",
        alternativa_A: "Heterogeneidade.",
        alternativa_B: "Variabilidade.",
        alternativa_C: "Tangibilização do intangível.",
        alternativa_D: "Inseparabilidade.",
        alternativa_E: "Simultaneidade.",
        gabarito: "C"
    },
    {
        numero: 66,
        materia: "Vendas e Negociação",
        enunciado: "Ao finalizar um atendimento de sucesso, o profissional de vendas deve manter o foco na manutenção do relacionamento. Um exemplo de ação recomendada nesse momento é:",
        alternativa_A: "Encaminhar o cliente imediatamente para a saída.",
        alternativa_B: "Ignorar o histórico do cliente e focar em novos prospects.",
        alternativa_C: "Entregar o cartão de visitas e evitar novos contatos para não incomodar.",
        alternativa_D: "Fazer uma nova oferta de produto de alto risco sem planejamento.",
        alternativa_E: "Realçar os benefícios do serviço adquirido e zelar pela manutenção da carteira de cliente.",
        gabarito: "E"
    },
    {
        numero: 67,
        materia: "Vendas e Negociação",
        enunciado: "O nível mais básico de um produto bancário é seu núcleo. Ele representa o benefício intangível que irá solucionar uma necessidade do cliente, tal como a:",
        alternativa_A: "Facilidade de acesso ao internet banking.",
        alternativa_B: "Divulgação do grande número de agências.",
        alternativa_C: "Garantia de estabilidade e segurança financeira futura.",
        alternativa_D: "Promessa de isenção total de tarifas fixas.",
        alternativa_E: "Aparência moderna do layout do cartão de débito.",
        gabarito: "C"
    },
    {
        numero: 68,
        materia: "Vendas e Negociação",
        enunciado: "Clientes que não expressam sua insatisfação ao banco, mas simplesmente deixam de utilizar os serviços ou reduzem seu volume de transações, realizam o que se chama de:",
        alternativa_A: "Reclamações ativas.",
        alternativa_B: "Reclamações passivas (ou silenciamento).",
        alternativa_C: "Satisfação latente.",
        alternativa_D: "Fidelização forçada.",
        alternativa_E: "Marketing boca a boca positivo.",
        gabarito: "B"
    },
    {
        numero: 69,
        materia: "Vendas e Negociação",
        enunciado: "Um funcionário de um banco, ao perceber a dificuldade de gestão de um cliente empreendedor, propõe a ele um curso de capacitação financeira junto com o empréstimo solicitado. Essa atitude visa fortalecer o:",
        alternativa_A: "Marketing transacional.",
        alternativa_B: "Cross-selling agressivo.",
        alternativa_C: "Venda casada proibida.",
        alternativa_D: "Upselling indevido.",
        alternativa_E: "Marketing de relacionamento (Pós-venda e Valor).",
        gabarito: "E"
    },
    {
        numero: 70,
        materia: "Vendas e Negociação",
        enunciado: "A cultura organizacional do Banco do Brasil é pautada por sua missão e visão. O conceito que define a 'razão de ser' de uma organização e orienta suas ações é a:",
        alternativa_A: "Meta trimestral.",
        alternativa_B: "Estrutura hierárquica.",
        alternativa_C: "Vantagem competitiva temporária.",
        alternativa_D: "Missão organizacional.",
        alternativa_E: "Política de dividendos.",
        gabarito: "D"
    }
];

async function updateBatch6() {
    console.log("Updating BB 2018 - Batch 6 (Q61-Q70)...\n");

    const prova2018 = await prisma.prova.findFirst({
        where: { ano: 2018 }
    });

    if (!prova2018) {
        console.log("Prova 2018 not found!");
        return;
    }

    let updatedCount = 0;
    for (const data of questionsData) {
        const question = await prisma.questao.findFirst({
            where: {
                prova_id: prova2018.id,
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
                    comentario: `Gabarito oficial BB 2018 (Vendas): ${data.gabarito}`
                }
            });
            updatedCount++;
            console.log(`✅ Updated Q${data.numero} - ${data.materia}`);
        }
    }

    console.log(`\n✅ Batch 6 complete! All questions for BB 2018 (70/70) are now populated.`);
}

updateBatch6()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
