import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2021 - Prova C (Agente Comercial) - Batch 3: Q31-Q70
const questionsData = [
    { numero: 31, materia: "Conhecimentos Bancários", enunciado: "As relações internacionais implicam relações de trocas entre as moedas. A fim de diminuir o efeito do encarecimento das exportações, o BC poderá:", alternativa_A: "reduzir as taxas de juros básicas.", alternativa_B: "vender dólares no mercado de câmbio.", alternativa_C: "fazer leilões de compra de swap cambial reverso.", alternativa_D: "reduzir a taxa de redesconto.", alternativa_E: "realizar leilões de venda de contratos de swap cambial tradicional.", gabarito: "E" },
    { numero: 32, materia: "Conhecimentos Bancários", enunciado: "O Mercado de Câmbio no Brasil é o ambiente onde se realizam as trocas de moeda estrangeira por moeda nacional. Sobre esse mercado, é correto afirmar que:", alternativa_A: "é livre e não requer regulamentação.", alternativa_B: "as taxas são fixadas pelo Governo Federal.", alternativa_C: "somente bancos comerciais podem operar.", alternativa_D: "opera em regime de taxas de câmbio flutuantes, sob supervisão do Banco Central.", alternativa_E: "proíbe a remessa de lucros para o exterior.", gabarito: "D" },
    { numero: 33, materia: "Conhecimentos Bancários", enunciado: "Sobre o Fundo Garantidor de Créditos (FGC), qual o limite máximo de garantia por CPF e por instituição financeira?", alternativa_A: "R$ 250.000,00.", alternativa_B: "R$ 500.000,00.", alternativa_C: "R$ 1.000.000,00.", alternativa_D: "R$ 60.000,00.", alternativa_E: "Ilimitado.", gabarito: "A" },
    { numero: 34, materia: "Conhecimentos Bancários", enunciado: "O crime de lavagem de dinheiro caracteriza-se por ocultar ou dissimular a natureza, origem ou localização de bens. A fase em que o dinheiro é colocado no sistema econômico é:", alternativa_A: "Ocultação.", alternativa_B: "Integração.", alternativa_C: "Colocação.", alternativa_D: "Dissimulação.", alternativa_E: "Estruturação.", gabarito: "C" },
    { numero: 35, materia: "Conhecimentos Bancários", enunciado: "A principal função da tesouraria de uma instituição financeira é:", alternativa_A: "definir a taxa de juros do cheque especial.", alternativa_B: "escolher os novos logotipos do banco.", alternativa_C: "realizar a cobrança judicial de inadimplentes.", alternativa_D: "gerir o caixa e os riscos financeiros da instituição garantindo liquidez.", alternativa_E: "fiscalizar a corretora de valores mobiliários.", gabarito: "D" },
    { numero: 36, materia: "Conhecimentos Bancários", enunciado: "O Conselho Monetário Nacional (CMN) é o órgão deliberativo máximo do SFN. Dentre suas competências, destaca-se:", alternativa_A: "emitir papel-moeda.", alternativa_B: "fiscalizar as instituições financeiras.", alternativa_C: "executar a política monetária.", alternativa_D: "zelar pela liquidez das instituições financeiras.", alternativa_E: "formular as diretrizes gerais das políticas monetária, cambial e creditícia.", gabarito: "E" },
    { numero: 37, materia: "Conhecimentos Bancários", enunciado: "Um título de capitalização é um produto em que o cliente poupa e concorre a prêmios. Sobre os prazos, o período em que o dinheiro fica retido é o:", alternativa_A: "prazo de sorteio.", alternativa_B: "prazo de pagamento.", alternativa_C: "prazo de carência.", alternativa_D: "prazo de resgate total.", alternativa_E: "prazo de vigência.", gabarito: "C" },
    { numero: 38, materia: "Conhecimentos Bancários", enunciado: "Sobre o funcionamento do Banco Central do Brasil (BCB), é correto afirmar que:", alternativa_A: "é subordinado diretamente ao Banco do Brasil.", alternativa_B: "detém a exclusividade da emissão de papel-moeda.", alternativa_C: "não possui autonomia administrativa.", alternativa_D: "é responsável pela fiscalização da CVM.", alternativa_E: "opera apenas com clientes pessoas físicas.", gabarito: "B" },
    { numero: 39, materia: "Conhecimentos Bancários", enunciado: "O cheque é uma ordem de pagamento à vista. Quando um cheque é emitido com cruzamento, ele:", alternativa_A: "só pode ser pago em dinheiro no caixa.", alternativa_B: "deve ser pago apenas ao portador original.", alternativa_C: "não pode ser endossado.", alternativa_D: "só pode ser pago mediante crédito em conta.", alternativa_E: "torna-se nulo se passar de 30 dias.", gabarito: "D" },
    { numero: 40, materia: "Conhecimentos Bancários", enunciado: "Um investidor que adquiriu um título do Tesouro Nacional e manteve até o vencimento tem:", alternativa_A: "rentabilidade pós-fixada.", alternativa_B: "garantia do FGC.", alternativa_C: "rentabilidade definida no momento da compra.", alternativa_D: "cobrança de IR mensal.", alternativa_E: "recompra a preços de mercado antes do vencimento facultativa.", gabarito: "C" },
    { numero: 41, materia: "Conhecimentos de Informática", enunciado: "Para alterar o buscador padrão no Microsoft Edge ou Mozilla Firefox, deve-se acessar:", alternativa_A: "Nova guia.", alternativa_B: "Histórico.", alternativa_C: "Extensões.", alternativa_D: "Configurações ou Opções.", alternativa_E: "Ajuda.", gabarito: "D" },
    { numero: 42, materia: "Conhecimentos de Informática", enunciado: "Sobre a segurança no Windows 10, o recurso que protege o computador contra vírus e outras ameaças em tempo real é o:", alternativa_A: "Windows Defender Antivírus.", alternativa_B: "Firewall do Windows.", alternativa_C: "BitLocker.", alternativa_D: "SmartScreen.", alternativa_E: "Windows Hello.", gabarito: "A" },
    { numero: 43, materia: "Conhecimentos de Informática", enunciado: "No gerenciamento de pastas e arquivos no Windows, a ação de mover um arquivo de uma pasta para outra dentro da mesma unidade de disco arrastando o mouse:", alternativa_A: "cria uma cópia do arquivo.", alternativa_B: "remove o arquivo da pasta original e o coloca na nova pasta.", alternativa_C: "cria um atalho no destino.", alternativa_D: "exclui permanentemente o arquivo.", alternativa_E: "comprime o arquivo automaticamente.", gabarito: "B" },
    { numero: 44, materia: "Conhecimentos de Informática", enunciado: "O protocolo utilizado para o envio de e-mails em servidores de correio eletrônico é o:", alternativa_A: "POP3.", alternativa_B: "SMTP.", alternativa_C: "IMAP.", alternativa_D: "HTTP.", alternativa_E: "FTP.", gabarito: "B" },
    { numero: 45, materia: "Conhecimentos de Informática", enunciado: "Um funcionário recebeu e-mail pedindo para clicar em link e preencher dados bancários. Esse golpe é:", alternativa_A: "pharming.", alternativa_B: "phishing.", alternativa_C: "spoofing.", alternativa_D: "spyware.", alternativa_E: "ransomware.", gabarito: "B" },
    { numero: 46, materia: "Conhecimentos de Informática", enunciado: "No Microsoft Excel, a função utilizada para somar um intervalo de células que atendem a um critério específico é:", alternativa_A: "SOMA.", alternativa_B: "SOMASE.", alternativa_C: "CONT.SE.", alternativa_D: "MÉDIA.", alternativa_E: "VLOOKUP.", gabarito: "D" },
    { numero: 47, materia: "Conhecimentos de Informática", enunciado: "Qual o buscador padrão de internet utilizado pela maioria dos navegadores modernos se não for alterado?", alternativa_A: "Yahoo.", alternativa_B: "Bing.", alternativa_C: "DuckDuckGo.", alternativa_D: "Baidu.", alternativa_E: "Google.", gabarito: "E" },
    { numero: 48, materia: "Conhecimentos de Informática", enunciado: "O comando utilizado no Linux para exibir o conteúdo de um diretório é o:", alternativa_A: "ls.", alternativa_B: "cd.", alternativa_C: "pwd.", alternativa_D: "rm.", alternativa_E: "mkdir.", gabarito: "A" },
    { numero: 49, materia: "Conhecimentos de Informática", enunciado: "No Microsoft Word, para deixar um texto selecionado em negrito, utiliza-se o atalho:", alternativa_A: "Ctrl + I.", alternativa_B: "Ctrl + N.", alternativa_C: "Ctrl + S.", alternativa_D: "Ctrl + B.", alternativa_E: "Ctrl + U.", gabarito: "B" },
    { numero: 50, materia: "Conhecimentos de Informática", enunciado: "Para realizar uma análise de dados quantitativos discretos em uma tabela, devem ser usadas:", alternativa_A: "médias móveis.", alternativa_B: "somas das médias.", alternativa_C: "variações ao longo do tempo.", alternativa_D: "médias históricas.", alternativa_E: "frequência de uma variável em intervalos de valores.", gabarito: "E" },
    { numero: 51, materia: "Conhecimentos de Informática", enunciado: "A arquitetura de redes onde todos os computadores podem atuar como cliente ou servidor é chamada de:", alternativa_A: "Cliente-Servidor.", alternativa_B: "Estrela.", alternativa_C: "Anel.", alternativa_D: "Ponto-a-ponto (P2P).", alternativa_E: "Barramento.", gabarito: "B" },
    { numero: 52, materia: "Conhecimentos de Informática", enunciado: "Sobre o uso de cookies em navegadores web, é correto afirmar que eles:", alternativa_A: "são pequenos arquivos usados por sites para armazenar informações sobre a navegação.", alternativa_B: "vírus que danificam o hardware.", alternativa_C: "programas para acelerar a internet.", alternativa_D: "emails não solicitados.", alternativa_E: "senhas criptografadas do banco.", gabarito: "B" },
    { numero: 53, materia: "Conhecimentos de Informática", enunciado: "A principal diferença entre a internet e uma intranet é que a intranet:", alternativa_A: "é uma rede privada restrita a membros de uma organização.", alternativa_B: "não utiliza o protocolo TCP/IP.", alternativa_C: "não permite o envio de e-mails.", alternativa_D: "é acessível por qualquer pessoa no mundo.", alternativa_E: "é usada apenas para jogos online.", gabarito: "A" },
    { numero: 54, materia: "Conhecimentos de Informática", enunciado: "Um subconjunto de dados extraído de uma população maior para análise é conhecido como:", alternativa_A: "censo.", alternativa_B: "variável.", alternativa_C: "população.", alternativa_D: "parâmetro.", alternativa_E: "amostra.", gabarito: "E" },
    { numero: 55, materia: "Conhecimentos de Informática", enunciado: "No Linux, para agendar a execução automática e periódica de um programa, utiliza-se o comando:", alternativa_A: "curl.", alternativa_B: "touch.", alternativa_C: "timedatectl.", alternativa_D: "jobs.", alternativa_E: "cron.", gabarito: "E" },
    { numero: 56, materia: "Vendas e Negociação", enunciado: "Ao comparar o atendimento de dois bancos onde um identifica problemas antes do cliente, o empreendedor compara:", alternativa_A: "Presteza e tangibilidade.", alternativa_B: "Empatia e segurança.", alternativa_C: "Confiabilidade e responsividade.", alternativa_D: "Presteza e segurança.", alternativa_E: "Confiabilidade e empatia.", gabarito: "C" },
    { numero: 57, materia: "Vendas e Negociação", enunciado: "A estratégia de marketing que foca na construção de relacionamentos duradouros e lucrativos com os clientes é o:", alternativa_A: "Marketing de transação.", alternativa_B: "Marketing direto.", alternativa_C: "Marketing social.", alternativa_D: "Marketing de nicho.", alternativa_E: "Marketing de relacionamento.", gabarito: "E" },
    { numero: 58, materia: "Vendas e Negociação", enunciado: "No processo de vendas, a etapa que consiste em identificar clientes potenciais qualificados é a:", alternativa_A: "Abordagem.", alternativa_B: "Prospecção.", alternativa_C: "Apresentação.", alternativa_D: "Fechamento.", alternativa_E: "Pós-venda.", gabarito: "B" },
    { numero: 59, materia: "Vendas e Negociação", enunciado: "O uso de personagens famosos em campanhas publicitárias para gerar identificação com a marca é uma estratégia de:", alternativa_A: "Propaganda.", alternativa_B: "Promoção de vendas.", alternativa_C: "Merchandising.", alternativa_D: "Relações públicas.", alternativa_E: "Venda pessoal.", gabarito: "A" },
    { numero: 60, materia: "Vendas e Negociação", enunciado: "A estratégia baseada na interação total entre canais on-line e off-line é denominada:", alternativa_A: "Marketing de permissão.", alternativa_B: "Marketing de atração.", alternativa_C: "Marketing viral.", alternativa_D: "Marketing de conteúdo.", alternativa_E: "Omnichannel.", gabarito: "E" },
    { numero: 61, materia: "Vendas e Negociação", enunciado: "Um banco age mediante autorização contratual para cobrir saldo devedor do cartão. Essa ação demonstra:", alternativa_A: "falta de ética.", alternativa_B: "abuso de poder.", alternativa_C: "venda casada.", alternativa_D: "estratégia de retenção.", alternativa_E: "procedimento operacional autorizado.", gabarito: "E" },
    { numero: 62, materia: "Vendas e Negociação", enunciado: "O 'share of mind' em marketing refere-se à:", alternativa_A: "parcela de lucro de uma empresa.", alternativa_B: "lembrança da marca na mente do consumidor.", alternativa_C: "quantidade de funcionários motivados.", alternativa_D: "participação física no mercado.", alternativa_E: "capacidade de produção industrial.", gabarito: "B" },
    { numero: 63, materia: "Vendas e Negociação", enunciado: "Qual o principal objetivo da segmentação de mercado?", alternativa_A: "tratar todos os clientes da mesma forma.", alternativa_B: "reduzir os custos de produção em 50%.", alternativa_C: "agrupar consumidores com características semelhantes para melhor atendê-los.", alternativa_D: "eliminar a concorrência direta.", alternativa_E: "vender produtos apenas em lojas físicas.", gabarito: "C" },
    { numero: 64, materia: "Vendas e Negociação", enunciado: "No telemarketing, quando o cliente liga para a empresa para tirar dúvidas ou fazer solicitações, o serviço é classificado como:", alternativa_A: "atendimento passivo.", alternativa_B: "venda direta.", alternativa_C: "marketing de interrupção.", alternativa_D: "telemarketing ativo.", alternativa_E: "telemarketing receptivo.", gabarito: "E" },
    { numero: 65, materia: "Vendas e Negociação", enunciado: "Empresa que exerce impacto líquido positivo sobre o tripé da sustentabilidade é classificada como:", alternativa_A: "neutra.", alternativa_B: "reparadora.", alternativa_C: "sustentável.", alternativa_D: "fundamental.", alternativa_E: "insustentável.", gabarito: "A" },
    { numero: 66, materia: "Vendas e Negociação", enunciado: "O marketing de serviços é caracterizado pela sua intangibilidade. Por essa razão, as empresas devem:", alternativa_A: "vender o serviço apenas para quem já é cliente.", alternativa_B: "tangibilizar o intangível por meio de evidências físicas (instalações, etc).", alternativa_C: "cobrar preços mais altos que os produtos físicos.", alternativa_D: "garantir que o serviço nunca varie.", alternativa_E: "eliminar o contato humano.", gabarito: "B" },
    { numero: 67, materia: "Vendas e Negociação", enunciado: "Um conflito em uma equipe de vendas que gera novas ideias e melhora o desempenho é um conflito:", alternativa_A: "disfuncional.", alternativa_B: "pessoal.", alternativa_C: "destrutivo.", alternativa_D: "funcional.", alternativa_E: "ilegal.", gabarito: "D" },
    { numero: 68, materia: "Vendas e Negociação", enunciado: "O pós-venda é fundamental para:", alternativa_A: "reduzir o número de funcionários.", alternativa_B: "fidelizar o cliente e identificar novas necessidades.", alternativa_C: "anular a venda em caso de erro.", alternativa_D: "evitar o pagamento de comissões.", alternativa_E: "vender exclusivamente produtos concorrentes.", gabarito: "B" },
    { numero: 69, materia: "Vendas e Negociação", enunciado: "Gerentes de vendas devem divulgar o código de ética para evitar práticas antiéticas. Isso garante:", alternativa_A: "aumento de impostos.", alternativa_B: "falta de competitividade.", alternativa_C: "redução da qualidade.", alternativa_D: "isolamento da marca.", alternativa_E: "a longevidade e reputação da empresa.", gabarito: "E" },
    { numero: 70, materia: "Vendas e Negociação", enunciado: "Qual o primeiro passo em um processo de negociação bem-sucedido?", alternativa_A: "Planejamento e preparação.", alternativa_B: "Fechamento imediato.", alternativa_C: "Concessão total.", alternativa_D: "Ameaça ao oponente.", alternativa_E: "Fim do contato com o cliente.", gabarito: "A" }
];

async function updateBatch3() {
    console.log("Updating BB 2021 - Prova C - Batch 3 (Q31-Q70)...");

    const prova2021C = await prisma.prova.findFirst({
        where: { id: 6 }
    });

    if (!prova2021C) {
        console.log("Prova 2021 C (ID 6) not found!");
        return;
    }

    let updatedCount = 0;
    for (const data of questionsData) {
        const question = await prisma.questao.findFirst({
            where: {
                prova_id: prova2021C.id,
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
                    comentario: `Gabarito oficial BB 2021 (Prova C): ${data.gabarito}`
                }
            });
            updatedCount++;
            console.log(`✅ Updated Q${data.numero} - ${data.materia}`);
        }
    }

    console.log(`\n✅ Batch 3 complete! Updated ${updatedCount} questions`);
}

updateBatch3()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
