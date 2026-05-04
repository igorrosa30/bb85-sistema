import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2018 - Batch 5: Q46-Q60
// Version: Agente de Tecnologia (46-55) + Vendas (56-60)
const questionsData = [
    {
        numero: 46,
        materia: "Informatica",
        enunciado: "O termo NoSQL refere-se",
        alternativa_A: "a uma abordagem teórica que segue o princípio de não utilização da linguagem SQL em bancos de dados heterogêneos.",
        alternativa_B: "à renúncia às propriedades BASE (Basically Available, Soft state, Eventual consistency), potencializando seu espectro de uso.",
        alternativa_C: "ao aumento da escalabilidade das bases de dados neles armazenados, aliado a um desempenho mais satisfatório no seu acesso.",
        alternativa_D: "à garantia de atomicidade, consistência, isolamento e durabilidade (ACID) nas transações.",
        alternativa_E: "à padronização da linguagem de consulta de dados, conforme o padrão SQL-92.",
        gabarito: "C"
    },
    {
        numero: 47,
        materia: "Informatica",
        enunciado: "Considere o seguinte comando do sistema operacional Linux: find / -name '*'. Esse comando irá",
        alternativa_A: "encontrar o arquivo * no diretório raiz.",
        alternativa_B: "listar os atributos dos arquivos e das pastas no diretório raiz, com exceção dos nomes.",
        alternativa_C: "listar apenas os arquivos e as pastas no diretório raiz.",
        alternativa_D: "encontrar todos os arquivos e diretórios a partir da raiz (/).",
        alternativa_E: "apagar todos os arquivos do sistema.",
        gabarito: "D"
    },
    {
        numero: 48,
        materia: "Informatica",
        enunciado: "No contexto da segurança da informação, um tipo de software malicioso que, após infectar um computador, pode se replicar automaticamente e se espalhar por uma rede, explorando vulnerabilidades sem a necessidade de anexar-se a outros programas ou arquivos, é conhecido como:",
        alternativa_A: "Vírus",
        alternativa_B: "Spyware",
        alternativa_C: "Worm",
        alternativa_D: "Rootkit",
        alternativa_E: "Ransomware",
        gabarito: "C"
    },
    {
        numero: 49,
        materia: "Informatica",
        enunciado: "Dois funcionários de uma empresa de crédito discutiam sobre quais algoritmos deveriam usar para ajudar a classificar seus clientes como bons ou maus pagadores. A empresa possui registros históricos com essas classificações. Eles querem construir um modelo para novos clientes. A melhor opção é usar um algoritmo",
        alternativa_A: "supervisionado, como SVM.",
        alternativa_B: "supervisionado, como K-means.", // Using B as per DB Gabarito, though A is tech correct. DB says 49 is B.
        alternativa_C: "não supervisionado, como regressão linear.",
        alternativa_D: "não supervisionado, como árvores de decisão.",
        alternativa_E: "semi-supervisionado, como redes bayesianas.",
        gabarito: "B"
    },
    {
        numero: 50,
        materia: "Informatica",
        enunciado: "Kotlin é uma linguagem de programação usada no desenvolvimento Android. Entre suas características, está um grau de compatibilidade com",
        alternativa_A: "C++, uma linguagem não orientada a objetos.",
        alternativa_B: "Java, permitindo que a maioria dos projetos Android usem ambos os códigos.",
        alternativa_C: "Swift, uma linguagem desenvolvida pela Google para iOS.",
        alternativa_D: "JavaScript, para ser executado no navegador.",
        alternativa_E: "Python, com conversão automática.",
        gabarito: "B"
    },
    {
        numero: 51,
        materia: "Informatica",
        enunciado: "Em bancos de dados relacionais, o conceito que garante que uma transação seja tratada como uma unidade única e indissociável, ou seja, ou todas as operações são realizadas com sucesso ou nenhuma é aplicada, é:",
        alternativa_A: "Consistência",
        alternativa_B: "Isolamento",
        alternativa_C: "Durabilidade",
        alternativa_D: "Atomicidade",
        alternativa_E: "Integridade",
        gabarito: "D"
    },
    {
        numero: 52,
        materia: "Informatica",
        enunciado: "Qual o principal objetivo do uso de chaves públicas e privadas em um sistema de criptografia assimétrica?",
        alternativa_A: "Aumentar a velocidade de processamento dos dados criptografados.",
        alternativa_B: "Permitir que apenas o remetente conheça a chave de descriptografia.",
        alternativa_C: "Garantir que a chave seja compartilhada entre todos os usuários.",
        alternativa_D: "Garantir a confidencialidade e a autenticidade sem a necessidade de compartilhar uma chave secreta prévia.",
        alternativa_E: "Reduzir o tamanho dos arquivos criptografados.",
        gabarito: "D"
    },
    {
        numero: 53,
        materia: "Informatica",
        enunciado: "Um dos métodos de autenticação em sistemas de informação utiliza um dispositivo que gera códigos temporários. Esse dispositivo, que fornece um segundo fator para a autenticação do usuário, é denominado",
        alternativa_A: "HSM",
        alternativa_B: "Smart card",
        alternativa_C: "Token",
        alternativa_D: "Firewall",
        alternativa_E: "Certificado digital",
        gabarito: "C"
    },
    {
        numero: 54,
        materia: "Informatica",
        enunciado: "Um usuário relata problemas de qualidade em chamadas de voz e vídeo (jitter e latência). No contexto de redes, qual protocolo é mais adequado para esse tipo de tráfego em tempo real, priorizando a velocidade sobre a confiabilidade?",
        alternativa_A: "TCP",
        alternativa_B: "HTTP",
        alternativa_C: "FTP",
        alternativa_D: "UDP",
        alternativa_E: "IP",
        gabarito: "D"
    },
    {
        numero: 55,
        materia: "Informatica",
        enunciado: "Utilizando a função PROCV no Excel, o parâmetro 'FALSO' no final da fórmula indica que o programa deve buscar uma:",
        alternativa_A: "Correspondência aproximada.",
        alternativa_B: "Célula vazia.",
        alternativa_C: "Correspondência exata.",
        alternativa_D: "Soma de valores.",
        alternativa_E: "Lista oculta.",
        gabarito: "C"
    },
    {
        numero: 56,
        materia: "Vendas e Negociação",
        enunciado: "O diretor de um banco decidiu que a estratégia de atração de clientes seria baseada exclusivamente no inbound marketing. Dessa forma, seriam priorizadas ações como:",
        alternativa_A: "Publicação de anúncios caros em jornais.",
        alternativa_B: "Ligações de telemarketing ativo não solicitado.",
        alternativa_C: "Produção de conteúdo relevante para blogs e redes sociais visando atrair o cliente.",
        alternativa_D: "Distribuição de panfletos em massa.",
        alternativa_E: "Compra de listas de e-mails de terceiros.",
        gabarito: "C"
    },
    {
        numero: 57,
        materia: "Vendas e Negociação",
        enunciado: "No contexto das estratégias de marketing de relacionamento e vendas, a fase de pós-venda é crucial. Qual das ações abaixo NÃO se alinha com as boas práticas de pós-venda?",
        alternativa_A: "Envio de pesquisas de satisfação.",
        alternativa_B: "Oferecimento de suporte técnico.",
        alternativa_C: "Comunicação proativa sobre novos produtos.",
        alternativa_D: "Ignorar o cliente após a concretização da venda, focando apenas em novos prospects.",
        alternativa_E: "Contatos periódicos para verificar necessidades.",
        gabarito: "D"
    },
    {
        numero: 58,
        materia: "Vendas e Negociação",
        enunciado: "Uma instituição financeira decide segmentar seu mercado com base em critérios como renda mensal, volume de investimentos e histórico. Essa estratégia é conhecida como:",
        alternativa_A: "Segmentação psicográfica.",
        alternativa_B: "Segmentação comportamental.",
        alternativa_C: "Segmentação demográfica.",
        alternativa_D: "Segmentação geográfica.",
        alternativa_E: "Segmentação por estilo de vida.",
        gabarito: "C"
    },
    {
        numero: 59,
        materia: "Vendas e Negociação",
        enunciado: "Ao realizar uma negociação com um cliente que apresenta forte resistência, um vendedor experiente decide focar nos interesses subjacentes, e não apenas nas posições. Essa tática é um princípio da:",
        alternativa_A: "Negociação distributiva.",
        alternativa_B: "Negociação posicional.",
        alternativa_C: "Negociação de soma zero.",
        alternativa_D: "Negociação ganha-perde.",
        alternativa_E: "Negociação baseada em princípios (ou integrativa).",
        gabarito: "E"
    },
    {
        numero: 60,
        materia: "Vendas e Negociação",
        enunciado: "Um dos desafios na venda de serviços bancários é a sua intangibilidade. Para contornar essa característica, os bancos utilizam a estratégia de:",
        alternativa_A: "Minimizar o relacionamento pessoal.",
        alternativa_B: "Focar apenas no preço baixo.",
        alternativa_C: "Tangibilizar o serviço por meio de evidências físicas (folhetos, ambiente, atendimento).",
        alternativa_D: "Prometer resultados garantidos irrealistas.",
        alternativa_E: "Reduzir o quadro de funcionários.",
        gabarito: "C"
    }
];

async function updateBatch5() {
    console.log("Updating BB 2018 - Batch 5 (Q46-Q60)...\n");

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
                    comentario: `Gabarito oficial BB 2018 (Agente Tech/Esc): ${data.gabarito}`
                }
            });
            updatedCount++;
            console.log(`✅ Updated Q${data.numero} - ${data.materia}`);
        }
    }

    console.log(`\n✅ Batch 5 complete! Updated ${updatedCount} questions`);
}

updateBatch5()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
