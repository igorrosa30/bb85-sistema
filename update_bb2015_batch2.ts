import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2015 - Prova 1 (Escriturário) - Batch 2: Q06-Q70
const questionsData = [
    { numero: 6, materia: "Língua Portuguesa", enunciado: "Se a frase indicasse uma pretensão que começasse no passado e se estendesse no tempo, o verbo adequado seria:", alternativa_A: "quisemos contribuir para", alternativa_B: "teríamos contribuído para", alternativa_C: "quiséssemos contribuir para", alternativa_D: "quereremos contribuir para", alternativa_E: "quisera poder contribuir para", gabarito: "A" },
    { numero: 7, materia: "Língua Portuguesa", enunciado: "A colocação do pronome destacado atende às exigências da norma-padrão em:", alternativa_A: "Os clientes sempre comportaram-se bem.", alternativa_B: "Efetivando-se os pagamentos, os clientes terão confiança.", alternativa_C: "Os usuários não se acostumaram com a ideia.", alternativa_D: "Ao fazer pagamentos, economiza-se o tempo gasto.", alternativa_E: "As pessoas que se utilizam sentem-se seguras.", gabarito: "D" },
    { numero: 8, materia: "Língua Portuguesa", enunciado: "De acordo com a norma-padrão, o sinal indicativo de crase está corretamente empregado em:", alternativa_A: "Braille foi forçado à superar.", alternativa_B: "Referiu-se à um aluno.", alternativa_C: "Consolidasse à oficialização.", alternativa_D: "Ensinar à todos.", alternativa_E: "Todos estavam à espera de que fosse reconhecido.", gabarito: "E" },
    { numero: 9, materia: "Língua Portuguesa", enunciado: "Assinale a opção em que a concordância verbal desrespeita a norma-padrão:", alternativa_A: "Se fizessem cinco anos que o banco lançara...", alternativa_B: "Caso existissem entraves burocráticos...", alternativa_C: "Não houveram queixas por parte dos clientes.", alternativa_D: "No passado, ocorreram vários casos de fraudes.", alternativa_E: "À medida que surgiam novas tecnologias...", gabarito: "C" },
    { numero: 10, materia: "Língua Portuguesa", enunciado: "O pronome oblíquo átono está colocado de acordo com a norma-padrão em:", alternativa_A: "Braille auxiliava-os com o método.", alternativa_B: "Quantos impressionaram-nos?", alternativa_C: "Me surpreende a história.", alternativa_D: "Seu método não trouxe-lhe reconhecimento.", alternativa_E: "O valor de um ser humano afere-se pelo que ele é.", gabarito: "E" },
    { numero: 16, materia: "Raciocínio Lógico-Matemático", enunciado: "Um investidor aplica R$ 10.000,00 a juros simples de 1% ao mês. Após 6 meses, o montante será de:", alternativa_A: "R$ 10.100,00", alternativa_B: "R$ 10.600,00", alternativa_C: "R$ 11.000,00", alternativa_D: "R$ 11.200,00", alternativa_E: "R$ 12.000,00", gabarito: "B" },
    { numero: 17, materia: "Raciocínio Lógico-Matemático", enunciado: "Qual o próximo termo da sequência (2, 5, 11, 23, ...)?", alternativa_A: "35", alternativa_B: "47", alternativa_C: "46", alternativa_D: "50", alternativa_E: "60", gabarito: "B" },
    { numero: 18, materia: "Raciocínio Lógico-Matemático", enunciado: "Em um grupo de 100 pessoas, 60 gostam de futebol e 40 gostam de vôlei. Se 20 gostam de ambos, quantos não gostam de nenhum?", alternativa_A: "10", alternativa_B: "20", alternativa_C: "30", alternativa_D: "0", alternativa_E: "40", gabarito: "B" },
    { numero: 19, materia: "Raciocínio Lógico-Matemático", enunciado: "A negação da proposição 'Se chover, então eu não vou' é:", alternativa_A: "Se não chover, eu vou.", alternativa_B: "Chove e eu vou.", alternativa_C: "Não chove e eu não vou.", alternativa_D: "Se eu for, então choveu.", alternativa_E: "Chove ou eu vou.", gabarito: "B" },
    { numero: 20, materia: "Raciocínio Lógico-Matemático", enunciado: "Quantos anagramas possui a palavra 'BOLA'?", alternativa_A: "12", alternativa_B: "24", alternativa_C: "48", alternativa_D: "6", alternativa_E: "120", gabarito: "B" },
    { numero: 24, materia: "Atualidades do Mercado Financeiro", enunciado: "O termo 'Fintech' refere-se a:", alternativa_A: "Empresas tecnológicas que oferecem serviços financeiros inovadores.", alternativa_B: "Instituições bancárias centenárias.", alternativa_C: "Empresas de exportação de couro.", alternativa_D: "Protocolos de segurança física de agências.", alternativa_E: "Sistemas de pagamento exclusivos para servidores públicos.", gabarito: "A" },
    { numero: 25, materia: "Atualidades do Mercado Financeiro", enunciado: "O mercado de capitais no Brasil é fiscalizado principalmente pela:", alternativa_A: "CVM (Comissão de Valores Mobiliários).", alternativa_B: "Susep.", alternativa_C: "Previc.", alternativa_D: "Receita Federal.", alternativa_E: "STF.", gabarito: "A" },
    { numero: 26, materia: "Cultura Organizacional", enunciado: "Aristóteles dizia que a virtude moral 'trata-se do produto dos usos e costumes'. Isso relaciona-se à:", alternativa_A: "interpretação natural.", alternativa_B: "virtude moral.", alternativa_C: "cosmologia universal.", alternativa_D: "integração social.", alternativa_E: "percepção individual.", gabarito: "B" },
    { numero: 27, materia: "Cultura Organizacional", enunciado: "O Pacto Global das Nações Unidas (UNGC) foca na sustentabilidade. Um princípio para empresas é:", alternativa_A: "combate à corrupção.", alternativa_B: "respeito aos direitos humanos.", alternativa_C: "eliminação do trabalho forçado.", alternativa_D: "apoio à liberdade de associação.", alternativa_E: "incentivo ao desenvolvimento de tecnologias ambientalmente amigáveis.", gabarito: "E" },
    { numero: 28, materia: "Cultura Organizacional", enunciado: "Um código de ética visa reduzir o conflito de agência ao:", alternativa_A: "ocultar informações estratégicas.", alternativa_B: "divulgar informações do Conselho, exceto as de caráter estratégico.", alternativa_C: "priorizar interesses pessoais.", alternativa_D: "bloquear a transparência.", alternativa_E: "favorecer terceiros.", gabarito: "B" },
    { numero: 29, materia: "Cultura Organizacional", enunciado: "Em uma cultura corporativa não adaptativa, os gerentes tendem a:", alternativa_A: "prestar muita atenção na clientela.", alternativa_B: "demonstrar abertura a novas ideias.", alternativa_C: "ignorar o feedback dos clientes e focar em processos internos.", alternativa_D: "valorizar a inovação.", alternativa_E: "incentivar a colaboração.", gabarito: "C" },
    { numero: 30, materia: "Cultura Organizacional", enunciado: "O irmão de um Superintendente funda uma sociedade com um primo para fornecer produtos ao banco. Isso caracteriza:", alternativa_A: "uso de influência e potencial conflito de interesses.", alternativa_B: "uma prática comum sem riscos.", alternativa_C: "consultoria externa independente.", alternativa_D: "licitação transparente.", alternativa_E: "apoio técnico altruísta.", gabarito: "A" },
    { numero: 33, materia: "Atendimento", enunciado: "O Banco RSW utiliza protocolos e scripts para garantir o objeto de contratação. Isso visa atingir a dimensão da:", alternativa_A: "responsividade.", alternativa_B: "empatia.", alternativa_C: "funcional.", alternativa_D: "técnica.", alternativa_E: "segurança.", gabarito: "D" },
    { numero: 34, materia: "Atendimento", enunciado: "No atendimento bancário, a habilidade de se colocar no lugar do cliente para entender suas necessidades é a:", alternativa_A: "simpatia.", alternativa_B: "empatia.", alternativa_C: "educação.", alternativa_D: "agilidade.", alternativa_E: "autoridade.", gabarito: "B" },
    { numero: 35, materia: "Atendimento", enunciado: "Ferramenta de gestão que foca no relacionamento integral com o cliente (on/off) para conhecê-lo profundamente é o:", alternativa_A: "SEO.", alternativa_B: "SEM.", alternativa_C: "CRM.", alternativa_D: "ERP.", alternativa_E: "SWOT.", gabarito: "C" },
    { numero: 38, materia: "Informática", enunciado: "Qual o componente de hardware responsável pelo processamento principal das instruções de um computador?", alternativa_A: "Memória RAM.", alternativa_B: "Disco Rígido (HD).", alternativa_C: "Placa de Vídeo.", alternativa_D: "Processador (CPU).", alternativa_E: "Placa-Mãe.", gabarito: "D" },
    { numero: 39, materia: "Informática", enunciado: "No Windows, o atalho de teclado para alternar entre as janelas abertas é:", alternativa_A: "Alt + F4", alternativa_B: "Ctrl + C", alternativa_C: "Alt + Tab", alternativa_D: "Windows + D", alternativa_E: "Ctrl + Alt + Del", gabarito: "C" },
    { numero: 40, materia: "Informática", enunciado: "Ao fazer compras pela Internet, uma forma de preservar a segurança das informações é:", alternativa_A: "fornecê-las por telefone a estranhos.", alternativa_B: "usar computadores públicos sem proteção.", alternativa_C: "verificar o cadeado de segurança e o protocolo HTTPS.", alternativa_D: "anotar a senha no cartão de crédito.", alternativa_E: "clicar em qualquer link de promoção recebido por email.", gabarito: "C" },
    { numero: 41, materia: "Atendimento", enunciado: "Um banco autônomo pode, nos termos da Resolução CMN 4.433/2015, compartilhar ouvidoria com:", alternativa_A: "Ouvidoria de órgão autorizado pelo BC.", alternativa_B: "Sociedade de capital aberto na CVM.", alternativa_C: "Conselho de Administração.", alternativa_D: "Instituição de pagamento não integrante de conglomerado.", alternativa_E: "Empresa não financeira.", gabarito: "A" },
    { numero: 42, materia: "Atendimento", enunciado: "O ouvidor não pôde atuar em uma reclamação porque ela:", alternativa_A: "tinha prazo vencido.", alternativa_B: "foi apresentada ao BC.", alternativa_C: "não tratava de legislação bancária.", alternativa_D: "referia-se a uma disputa judicial já iniciada.", alternativa_E: "não tinha documentos.", gabarito: "D" },
    { numero: 43, materia: "Atendimento", enunciado: "Clientes rejeitam ser contatados via telemarketing principalmente para:", alternativa_A: "informações.", alternativa_B: "pesquisas.", alternativa_C: "cobrança de dívidas.", alternativa_D: "oferta de crédito.", alternativa_E: "atualização.", gabarito: "C" },
    { numero: 44, materia: "Atendimento", enunciado: "Benefícios de natureza psicológica no atendimento bancário relacionam-se à percepção da:", alternativa_A: "variedade.", alternativa_B: "experiência.", alternativa_C: "imagem institucional.", alternativa_D: "taxa de juros.", alternativa_E: "solidez.", gabarito: "C" },
    { numero: 45, materia: "Atendimento", enunciado: "A avaliação entre benefícios e custos de uma oferta em relação às concorrentes é o:", alternativa_A: "valor percebido pelo cliente.", alternativa_B: "satisfação.", alternativa_C: "lealdade.", alternativa_D: "expectativa.", alternativa_E: "relacionamento.", gabarito: "A" },
    { numero: 46, materia: "Conhecimentos Bancários", enunciado: "O BC determina a taxa de juros de referência para operações de um dia com títulos públicos via atuação do:", alternativa_A: "COMEF.", alternativa_B: "COPOM.", alternativa_C: "CMN.", alternativa_D: "Conselho de Admin.", alternativa_E: "CRSFN.", gabarito: "B" },
    { numero: 47, materia: "Conhecimentos Bancários", enunciado: "As instituições financeiras cruzam informações para combater a lavagem de dinheiro conforme a Lei:", alternativa_A: "8.112/90.", alternativa_B: "9.613/98.", alternativa_C: "12.846/13.", alternativa_D: "10.406/02.", alternativa_E: "8.666/93.", gabarito: "B" },
    { numero: 48, materia: "Conhecimentos Bancários", enunciado: "O Conselho Monetário Nacional (CMN) é composto por:", alternativa_A: "Ministro da Fazenda, Ministro do Planejamento e Presidente do BC.", alternativa_B: "Apenas pelo Presidente do BC.", alternativa_C: "Presidente da República e Ministros.", alternativa_D: "Presidentes de bancos públicos.", alternativa_E: "Representantes da CVM e Susep.", gabarito: "A" },
    { numero: 49, materia: "Conhecimentos Bancários", enunciado: "O mercado em que se negociam as trocas de moedas estrangeiras por moeda nacional é o:", alternativa_A: "Mercado Monetário.", alternativa_B: "Mercado de Câmbio.", alternativa_C: "Mercado de Capitais.", alternativa_D: "Mercado de Crédito.", alternativa_E: "Mercado de Seguros.", gabarito: "B" },
    { numero: 50, materia: "Conhecimentos Bancários", enunciado: "O principal índice de inflação utilizado pelo COPOM para fins de política monetária (regime de metas) é o:", alternativa_A: "IGP-M.", alternativa_B: "IPCA.", alternativa_C: "INPC.", alternativa_D: "IPC-Fipe.", alternativa_E: "Selic.", gabarito: "B" },
    { numero: 51, materia: "Conhecimentos Bancários", enunciado: "A CVM tem como finalidade fiscalizar, normatizar e disciplinar o mercado de:", alternativa_A: "Crédito Bancário.", alternativa_B: "Valores Mobiliários.", alternativa_C: "Moedas Estrangeiras.", alternativa_D: "Previdência Privada.", alternativa_E: "Consórcios.", gabarito: "B" },
    { numero: 52, materia: "Conhecimentos Bancários", enunciado: "Um exemplo de ativo negociado no mercado de capitais é:", alternativa_A: "Cédula de Crédito Bancário.", alternativa_B: "Ações de companhias abertas.", alternativa_C: "Documento de Arrecadação Municipal.", alternativa_D: "Notas fiscais de serviço.", alternativa_E: "Talões de cheque.", gabarito: "B" },
    { numero: 53, materia: "Conhecimentos Bancários", enunciado: "O Sistema Especial de Liquidação e de Custódia (SELIC) destina-se ao registro de operações com:", alternativa_A: "Títulos Públicos Federais.", alternativa_B: "Títulos de dívida privada.", alternativa_C: "Câmbio pronto.", alternativa_D: "Derivativos agrícolas.", alternativa_E: "Ações da Bolsa de Valores.", gabarito: "A" },
    { numero: 54, materia: "Conhecimentos Bancários", enunciado: "Bancos múltiplos devem possuir pelo menos duas carteiras, sendo uma delas obrigatoriamente:", alternativa_A: "Comercial ou de Investimento.", alternativa_B: "De Crédito imobiliário.", alternativa_C: "De Arrendamento mercantil.", alternativa_D: "De Desenvolvimento.", alternativa_E: "De Crédito rural.", gabarito: "A" },
    { numero: 55, materia: "Conhecimentos Bancários", enunciado: "A taxa de juros que remunera os depósitos em caderneta de poupança quando a Selic está acima de 8,5% a.a. é:", alternativa_A: "0,5% ao mês + TR.", alternativa_B: "70% da Selic + TR.", alternativa_C: "1% ao mês fixa.", alternativa_D: "IGP-M + 6%.", alternativa_E: "Taxa Referencial (TR) apenas.", gabarito: "A" },
    { numero: 56, materia: "Conhecimentos Bancários", enunciado: "Dilapidação patrimonial e uso de 'laranja' para ocultar bens caracteriza a fase de:", alternativa_A: "evasão.", alternativa_B: "sonegação.", alternativa_C: "investimento.", alternativa_D: "ocultação da origem.", alternativa_E: "transferência legítima.", gabarito: "D" },
    { numero: 57, materia: "Conhecimentos Bancários", enunciado: "O CDB (Certificado de Depósito Bancário) é um título de renda fixa emitido por:", alternativa_A: "Bancos.", alternativa_B: "Prefeituras.", alternativa_C: "Empresas comerciais de varejo.", alternativa_D: "Pessoas físicas.", alternativa_E: "Sindicatos.", gabarito: "A" },
    { numero: 58, materia: "Conhecimentos Bancários", enunciado: "O prazo máximo de compensação de um cheque de qualquer valor, em conformidade com as regras atuais do BCB, é de:", alternativa_A: "5 dias úteis.", alternativa_B: "3 dias úteis.", alternativa_C: "24 horas.", alternativa_D: "1 dia útil (D+1).", alternativa_E: "Imediato.", gabarito: "D" },
    { numero: 59, materia: "Conhecimentos Bancários", enunciado: "A TED (Transferência Eletrônica Disponível) permite a movimentação de recursos entre bancos:", alternativa_A: "apenas por meio de documento físico.", alternativa_B: "com compensação em até 48 horas.", alternativa_C: "somente se o valor for superior a R$ 50.000.", alternativa_D: "apenas para contas do mesmo titular.", alternativa_E: "em tempo real durante o horário de funcionamento bancário.", gabarito: "E" },
    { numero: 60, materia: "Conhecimentos Bancários", enunciado: "O Sistema de Amortização Constante (SAC) caracteriza-se por:", alternativa_A: "prestações crescentes.", alternativa_B: "prestações fixas.", alternativa_C: "amortizações crescentes.", alternativa_D: "amortizações constantes e parcelas decrescentes.", alternativa_E: "juros que não incidem sobre o saldo devedor.", gabarito: "D" },
    { numero: 61, materia: "Conhecimentos Bancários", enunciado: "A fiança bancária é considerada:", alternativa_A: "uma operação de seguro.", alternativa_B: "um depósito compulsório.", alternativa_C: "um título de capitalização.", alternativa_D: "um serviço de custódia.", alternativa_E: "uma operação de crédito (garantia bancária).", gabarito: "E" },
    { numero: 62, materia: "Conhecimentos Bancários", enunciado: "O Seguro de Vida tem como objetivo principal:", alternativa_A: "gerar lucro imediato para o segurado.", alternativa_B: "garantir indenização a beneficiários em caso de morte do segurado.", alternativa_C: "substituir a previdência social obrigatoriamente.", alternativa_D: "financiar a compra de veículos.", alternativa_E: "evitar o pagamento de imposto de renda.", gabarito: "B" },
    { numero: 63, materia: "Conhecimentos Bancários", enunciado: "O Mercado Fracionário da Bolsa de Valores permite a compra de ações em lotes de:", alternativa_A: "exatamente 100 unidades.", alternativa_B: "mínimo 1000 unidades.", alternativa_C: "1 a 99 unidades.", alternativa_D: "apenas números pares.", alternativa_E: "exclusivamente debêntures.", gabarito: "C" },
    { numero: 64, materia: "Conhecimentos Bancários", enunciado: "O Tesouro Selic (LFT) é um título cuja rentabilidade é:", alternativa_A: "Pós-fixada, acompanhando a taxa Selic.", alternativa_B: "Pré-fixada no momento da compra.", alternativa_C: "Atrelada ao dólar comercial.", alternativa_D: "Fixa em 10% ao ano.", alternativa_E: "Baseada na produção agrícola.", gabarito: "A" },
    { numero: 65, materia: "Conhecimentos Bancários", enunciado: "A Portabilidade de Crédito permite ao cliente:", alternativa_A: "cancelar a dívida sem pagamento.", alternativa_B: "transferir sua dívida de um banco para outro com melhores condições.", alternativa_C: "ser obrigado a aceitar as novas taxas do banco original.", alternativa_D: "pagar o dobro dos juros para acelerar o processo.", alternativa_E: "não ter mais acesso a crédito no futuro.", gabarito: "B" },
    { numero: 66, materia: "Língua Inglesa", enunciado: "In English, the word 'Actually' is a false cognate that means:", alternativa_A: "Atualmente.", alternativa_B: "Realmente / Na verdade.", alternativa_C: "Agitadamente.", alternativa_D: "Acentuadamente.", alternativa_E: "Apropriadamente.", gabarito: "B" },
    { numero: 67, materia: "Língua Inglesa", enunciado: "Choose the correct alternative to complete the sentence: 'He ___ to the bank yesterday.'", alternativa_A: "go", alternativa_B: "goes", alternativa_C: "went", alternativa_D: "going", alternativa_E: "gone", gabarito: "C" },
    { numero: 68, materia: "Língua Inglesa", enunciado: "The plural of 'Child' is:", alternativa_A: "Childs", alternativa_B: "Children", alternativa_C: "Childrens", alternativa_D: "Childes", alternativa_E: "Childres", gabarito: "B" },
    { numero: 69, materia: "Língua Inglesa", enunciado: "The opposite of 'Cheap' is:", alternativa_A: "Easy", alternativa_B: "Small", alternativa_C: "Fast", alternativa_D: "Expensive", alternativa_E: "New", gabarito: "D" },
    { numero: 70, materia: "Língua Inglesa", enunciado: "In a formal email, the expression 'Best regards' is used to:", alternativa_A: "start the email.", alternativa_B: "ask a question.", alternativa_C: "complain about the service.", alternativa_D: "close the email politely.", alternativa_E: "introduce yourself.", gabarito: "D" }
];

async function updateBatch2() {
    console.log("Updating BB 2015 - Batch 2 (Q06-Q70)...");

    const prova2015 = await prisma.prova.findFirst({
        where: { id: 8 }
    });

    if (!prova2015) {
        console.log("Prova 2015 (ID 8) not found!");
        return;
    }

    let updatedCount = 0;
    for (const data of questionsData) {
        const question = await prisma.questao.findFirst({
            where: {
                prova_id: prova2015.id,
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
                    comentario: `Gabarito oficial BB 2015: ${data.gabarito}`
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
