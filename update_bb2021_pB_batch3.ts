import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2021 - Prova B (Agente Comercial) - Batch 3: Q31-Q70
const questionsData = [
    { numero: 31, materia: "Conhecimentos Bancários", enunciado: "A pandemia do coronavírus alterou significativamente as relações sociais. Medidas como Quantitative Easing (QE), ou Flexibilização Quantitativa, buscam:", alternativa_A: "Diminuir o volume de reservas bancárias.", alternativa_B: "Aumentar a taxa básica de juros de curto prazo.", alternativa_C: "Reduzir o balanço dos bancos centrais.", alternativa_D: "Comprar títulos públicos e outros ativos no mercado.", alternativa_E: "Limitar a oferta de crédito.", gabarito: "D" },
    { numero: 32, materia: "Conhecimentos Bancários", enunciado: "As Instituições Financeiras Não Bancárias (IFNBs) são importantes intermediárias. Dentre as funções das IFNBs, destaca-se:", alternativa_A: "Oferecer contas correntes para o público em geral.", alternativa_B: "Atuar na intermediação de títulos e valores mobiliários.", alternativa_C: "Concessão de crédito de curto prazo como principal atividade.", alternativa_D: "Ser regulada exclusivamente pelo CMN sem o BC.", alternativa_E: "Manter reservas compulsórias junto ao Banco Central.", gabarito: "B" },
    { numero: 33, materia: "Conhecimentos Bancários", enunciado: "No sistema de metas de inflação, o Copom do Banco Central reúne-se periodicamente. É atribuição do Copom:", alternativa_A: "formular as normas aplicáveis ao SFN.", alternativa_B: "determinar o papel do Banco Central no mercado cambial.", alternativa_C: "autorizar o funcionamento de instituições.", alternativa_D: "regulamentar o mercado de valores mobiliários.", alternativa_E: "definir a taxa Selic meta.", gabarito: "E" },
    { numero: 34, materia: "Conhecimentos Bancários", enunciado: "A CVM é o órgão responsável por disciplinar o mercado de valores mobiliários. Uma de suas competências é:", alternativa_A: "Estabelecer as diretrizes da política monetária.", alternativa_B: "Conceder autorização para funcionamento de bancos comerciais.", alternativa_C: "Fiscalizar as companhias abertas e os fundos de investimento.", alternativa_D: "Realizar o controle da inflação via juros.", alternativa_E: "Gerenciar as dívidas do Governo Federal.", gabarito: "C" },
    { numero: 35, materia: "Conhecimentos Bancários", enunciado: "De acordo com a Carta Circular nº 4.001 sobre prevenção à lavagem de dinheiro, é INCORRETO afirmar que as instituições devem:", alternativa_A: "identificar e qualificar seus clientes.", alternativa_B: "dispensar a coleta de informações sobre origem dos recursos em operações de baixo valor.", alternativa_C: "classificar os clientes em categorias de risco.", alternativa_D: "monitorar as operações de forma contínua.", alternativa_E: "registrar as informações e documentos coletados.", gabarito: "B" },
    { numero: 36, materia: "Conhecimentos Bancários", enunciado: "Sobre o Cadastro Positivo, instituído pela Lei nº 12.414/2011, é correto afirmar que:", alternativa_A: "requer autorização expressa prévia para inclusão do consumidor.", alternativa_B: "permite a consulta de dados de bons pagadores para subsidiar decisões de crédito.", alternativa_C: "exclui automaticamente dívidas com atraso superior a 5 dias.", alternativa_D: "é gerido exclusivamente pelo Banco Central do Brasil.", alternativa_E: "proíbe o compartilhamento de informações entre instituições financeiras.", gabarito: "B" },
    { numero: 37, materia: "Conhecimentos Bancários", enunciado: "Um anúncio sobre financiamento de veículos no site do BB destaca 'financiamento com taxas reduzidas'. A modalidade em que o devedor transfere a propriedade do bem ao credor como garantia é:", alternativa_A: "alienação fiduciária.", alternativa_B: "aval.", alternativa_C: "penhor mercantil.", alternativa_D: "fiança.", alternativa_E: "hipoteca.", gabarito: "A" },
    { numero: 38, materia: "Conhecimentos Bancários", enunciado: "O Índice Big Mac é usado para explicar a Paridade do Poder de Compra. Se o Big Mac no Brasil custa menos em dólares que nos EUA, o Real está:", alternativa_A: "sobrevalorizado.", alternativa_B: "valorizado.", alternativa_C: "subvalorizado.", alternativa_D: "no ponto de paridade real.", alternativa_E: "com inflação em queda.", gabarito: "C" },
    { numero: 39, materia: "Conhecimentos Bancários", enunciado: "Operações bancárias onde os recursos são captados dos clientes (como CDB) são chamadas de:", alternativa_A: "operações ativas.", alternativa_B: "operações acessórias.", alternativa_C: "operações passivas.", alternativa_D: "prestação de serviços.", alternativa_E: "operações de tesouraria.", gabarito: "C" },
    { numero: 40, materia: "Conhecimentos Bancários", enunciado: "Qual o órgão máximo do Sistema Financeiro Nacional, responsável por formular a política da moeda e do crédito?", alternativa_A: "Banco Central do Brasil.", alternativa_B: "CVM.", alternativa_C: "BNDES.", alternativa_D: "Conselho Monetário Nacional (CMN).", alternativa_E: "Ministério da Economia.", gabarito: "D" },
    { numero: 41, materia: "Conhecimentos de Informática", enunciado: "O Mozilla Firefox apresenta funcionalidades como o seu histórico de navegação. Inclui(em)-se no histórico do Firefox:", alternativa_A: "a Configuração de zoom.", alternativa_B: "o Certificado OCSP.", alternativa_C: "o Protocolo HTTPS.", alternativa_D: "as páginas visitadas.", alternativa_E: "a versão do navegador.", gabarito: "D" },
    { numero: 42, materia: "Conhecimentos de Informática", enunciado: "Do ponto de vista técnico, arquivos em sistemas computacionais são:", alternativa_A: "abstrações feitas pelo sistema operacional das características lógicas das informações.", alternativa_B: "coleções de pastas voláteis.", alternativa_C: "sequências de caracteres em vídeo.", alternativa_D: "identificadores de hardware.", alternativa_E: "coleções de drivers do sistema.", gabarito: "A" },
    { numero: 43, materia: "Conhecimentos de Informática", enunciado: "O recurso de segurança que busca garantir que uma transação eletrônica, após realizada, não possa ser negada por quem a fez é:", alternativa_A: "irrefutabilidade.", alternativa_B: "confiabilidade.", alternativa_C: "integridade.", alternativa_D: "confidencialidade.", alternativa_E: "disponibilidade.", gabarito: "A" },
    { numero: 44, materia: "Conhecimentos de Informática", enunciado: "A solução de segurança que monitora o tráfego de entrada e saída, funcionando como um filtro de pacotes, é:", alternativa_A: "firewall.", alternativa_B: "antivírus.", alternativa_C: "proxy.", alternativa_D: "criptografia.", alternativa_E: "certificado digital.", gabarito: "A" },
    { numero: 45, materia: "Conhecimentos de Informática", enunciado: "Qual a principal característica da tecnologia Wiki?", alternativa_A: "Manutenção do conteúdo desde a origem.", alternativa_B: "Impossibilidade de negar autoria.", alternativa_C: "Permissão para que páginas sejam facilmente editadas pelos usuários.", alternativa_D: "Impedimento de acesso não autorizado.", alternativa_E: "Embaralhar informações para torná-las ilegíveis.", gabarito: "C" },
    { numero: 46, materia: "Conhecimentos de Informática", enunciado: "No Microsoft Outlook, para mover e-mails recebidos de um remetente para uma pasta específica, o recurso utilizado é:", alternativa_A: "Filtro.", alternativa_B: "Alerta.", alternativa_C: "Pasta de pesquisa.", alternativa_D: "Regra.", alternativa_E: "Categoria.", gabarito: "D" },
    { numero: 47, materia: "Conhecimentos de Informática", enunciado: "No Windows 10, a opção 'excluir arquivos de otimização de entrega' na Limpeza de Disco refere-se a arquivos:", alternativa_A: "temporários de internet.", alternativa_B: "de registro do sistema.", alternativa_C: "usados pelo Windows Update para otimizar downloads.", alternativa_D: "de cache do Edge.", alternativa_E: "de programas instalados.", gabarito: "C" },
    { numero: 48, materia: "Conhecimentos de Informática", enunciado: "No Microsoft Word, a opção que permite adicionar uma assinatura digital ao documento é:", alternativa_A: "Inserir Guia de Assinatura.", alternativa_B: "Proteger Documento.", alternativa_C: "Assinatura Eletrônica.", alternativa_D: "Propriedades do Documento.", alternativa_E: "Revisar Documento.", gabarito: "A" },
    { numero: 49, materia: "Conhecimentos de Informática", enunciado: "Para ocultar uma coluna no Microsoft Excel, o usuário deve:", alternativa_A: "selecionar a coluna, clicar com o botão direito e escolher 'Ocultar'.", alternativa_B: "arrastar para a esquerda.", alternativa_C: "ir em 'Formatar Células'.", alternativa_D: "clicar em 'Agrupar'.", alternativa_E: "clicar em 'Proteger Planilha'.", gabarito: "A" },
    { numero: 50, materia: "Conhecimentos de Informática", enunciado: "Para limpar cookies e histórico no Google Chrome, o caminho é:", alternativa_A: "Configurações > Privacidade e segurança > Limpar dados de navegação.", alternativa_B: "Histórico > Mostrar histórico completo > Limpar.", alternativa_C: "Configurações > Aparência > Restaurar.", alternativa_D: "Mais ferramentas > Extensões.", alternativa_E: "Configurações > Mecanismo de pesquisa.", gabarito: "A" },
    { numero: 51, materia: "Conhecimentos de Informática", enunciado: "Qual tecnologia possibilita a virtualização de uma ou mais máquinas físicas em uma única máquina virtual no Windows?", alternativa_A: "Hyper-V.", alternativa_B: "VMware.", alternativa_C: "VirtualBox.", alternativa_D: "Máquina virtual.", alternativa_E: "Xen.", gabarito: "A" },
    { numero: 52, materia: "Conhecimentos de Informática", enunciado: "No Windows 10, para criar um atalho para um executável na área de trabalho via menu de contexto do arquivo, seleciona-se:", alternativa_A: "Mover para > Área de Trabalho.", alternativa_B: "Copiar > Colar na Área de Trabalho.", alternativa_C: "Enviar para > Área de trabalho (criar atalho).", alternativa_D: "Fixar em Iniciar.", alternativa_E: "Desafixar da barra de tarefas.", gabarito: "C" },
    { numero: 53, materia: "Conhecimentos de Informática", enunciado: "Um funcionário encaminhou um e-mail suspeito para a TI e o excluiu. Essa boa prática garante a:", alternativa_A: "Confidencialidade.", alternativa_B: "Integridade.", alternativa_C: "Disponibilidade.", alternativa_D: "Autenticidade.", alternativa_E: "Não repúdio.", gabarito: "C" },
    { numero: 54, materia: "Conhecimentos de Informática", enunciado: "No Microsoft Excel, a fórmula para contar quantas vezes 'Aprovado' aparece no intervalo F2:F100 é:", alternativa_A: "=CONT.SE(F2:F100;\"Aprovado\")", alternativa_B: "=CONT.VALORES(F2:F100;\"Aprovado\")", alternativa_C: "=CONTAR.VAZIO(F2:F100;\"Aprovado\")", alternativa_D: "=SOMA(F2:F100;\"Aprovado\")", alternativa_E: "=MÉDIA(F2:F100;\"Aprovado\")", gabarito: "A" },
    { numero: 55, materia: "Conhecimentos de Informática", enunciado: "No Microsoft Word, a trilha para inserir um gráfico é:", alternativa_A: "Inserir > Ilustrações > Gráfico.", alternativa_B: "Inserir > Tabelas > Gráfico.", alternativa_C: "Design > Formatar > Gráfico.", alternativa_D: "Layout > Organizar > Gráfico.", alternativa_E: "Referências > Legendas > Gráfico.", gabarito: "A" },
    { numero: 56, materia: "Vendas e Negociação", enunciado: "Um auditor no Banco C avalia que o contato com os clientes é eventual. Que ação seria adequada para clientes leais e que buscam atendimento diferenciado?", alternativa_A: "Eventos voltados para o público em geral.", alternativa_B: "Estabelecimento de contato individualizado e permanente com os clientes.", alternativa_C: "Ampliação da rede eletrônica.", alternativa_D: "Divulgação de novas oportunidades.", alternativa_E: "Oferta de produtos de baixo custo.", gabarito: "B" },
    { numero: 57, materia: "Vendas e Negociação", enunciado: "Um banco digital oferece vídeos de educação financeira nas redes sociais para atrair novos clientes. Essa estratégia é o:", alternativa_A: "Marketing de permissão.", alternativa_B: "Marketing de conteúdo.", alternativa_C: "Marketing viral.", alternativa_D: "Marketing de busca.", alternativa_E: "Marketing direto.", gabarito: "B" },
    { numero: 58, materia: "Vendas e Negociação", enunciado: "A confiabilidade em serviços bancários é o fator mais importante. Ela se destaca pois:", alternativa_A: "É o único aspecto avaliado após a prestação do serviço.", alternativa_B: "É o único avaliado antes da prestação.", alternativa_C: "Não é percebido pelo cliente.", alternativa_D: "Depende da comunicação do atendente.", alternativa_E: "Não é quantificável.", gabarito: "A" },
    { numero: 59, materia: "Vendas e Negociação", enunciado: "Um gerente envia oferta personalizada de crédito via e-mail. Essa iniciativa é um exemplo de:", alternativa_A: "marketing de relacionamento.", alternativa_B: "marketing de conteúdo.", alternativa_C: "marketing transacional.", alternativa_D: "telemarketing.", alternativa_E: "propaganda.", gabarito: "A" },
    { numero: 60, materia: "Vendas e Negociação", enunciado: "Em uma estratégia para cliente exigente que demanda personalização, é fundamental:", alternativa_A: "campanhas de massa.", alternativa_B: "canais padronizados.", alternativa_C: "automação do atendimento.", alternativa_D: "interação pessoal e contínua com o cliente.", alternativa_E: "foco na venda de produtos de prateleira.", gabarito: "D" },
    { numero: 61, materia: "Vendas e Negociação", enunciado: "Um atendente que privilegia indução, ideias abstratas e teorias bem fundamentadas utiliza qual estilo de aprendizagem?", alternativa_A: "convergente.", alternativa_B: "divergente.", alternativa_C: "assimilador.", alternativa_D: "acomodador.", alternativa_E: "visual.", gabarito: "C" },
    { numero: 62, materia: "Vendas e Negociação", enunciado: "Organizações substituindo o local físico pelo virtual por meio de tecnologias digitais estão operando no:", alternativa_A: "marketing de rede.", alternativa_B: "espaço de mercado (marketspace).", alternativa_C: "marketing de relacionamento.", alternativa_D: "mercado de massa.", alternativa_E: "marketing direto.", gabarito: "B" },
    { numero: 63, materia: "Vendas e Negociação", enunciado: "Uma empresa em recuperação judicial recebe autorização para operar voos. Segundo Porter, essa nova entrada é vista como uma:", alternativa_A: "ameaça de produtos substitutos.", alternativa_B: "rivalidade entre concorrentes.", alternativa_C: "poder de barganha dos fornecedores.", alternativa_D: "ameaça de novos entrantes.", alternativa_E: "poder de barganha dos compradores.", gabarito: "D" },
    { numero: 64, materia: "Vendas e Negociação", enunciado: "A identificação de forças, fraquezas, oportunidades e ameaças faz parte da:", alternativa_A: "Matriz BCG.", alternativa_B: "Análise de Pareto.", alternativa_C: "Matriz de Ansoff.", alternativa_D: "Análise SWOT.", alternativa_E: "Cinco Forças de Porter.", gabarito: "D" },
    { numero: 65, materia: "Vendas e Negociação", enunciado: "Empresas que gerem negócios de forma neutra ou positiva em relação ao tripé da sustentabilidade praticam:", alternativa_A: "Marketing de Rede.", alternativa_B: "Marketing Sustentável.", alternativa_C: "Greenwashing.", alternativa_D: "Marketing de Transação.", alternativa_E: "Marketing de Incentivo.", gabarito: "B" },
    { numero: 66, materia: "Vendas e Negociação", enunciado: "Na hierarquia de Maslow, a busca por seguros e planos de aposentadoria visa atender à necessidade de:", alternativa_A: "auto-realização.", alternativa_B: "fisiologia.", alternativa_C: "afeto/social.", alternativa_D: "estima.", alternativa_E: "segurança.", gabarito: "E" },
    { numero: 67, materia: "Vendas e Negociação", enunciado: "O Código de Ética do BB prega que colaboradores devem agir com transparência e respeito. Isso é fundamental para:", alternativa_A: "a credibilidade e imagem da instituição.", alternativa_B: "o lucro imediato do banco.", alternativa_C: "a redução de impostos federais.", alternativa_D: "a contratação de parentes.", alternativa_E: "a venda casada de produtos.", gabarito: "A" },
    { numero: 68, materia: "Vendas e Negociação", enunciado: "A equação de valor para o cliente é definida pela diferença entre:", alternativa_A: "custo de marketing e preço de venda.", alternativa_B: "benefícios percebidos e sacrifícios realizados.", alternativa_C: "número de agências e número de funcionários.", alternativa_D: "taxas de juros e inflação anual.", alternativa_E: "divisibilidade e tangibilidade.", gabarito: "B" },
    { numero: 69, materia: "Vendas e Negociação", enunciado: "A função da Ouvidoria em um banco é:", alternativa_A: "cobrar dívidas atrasadas.", alternativa_B: "promover novos produtos.", alternativa_C: "mediar conflitos e defender direitos dos clientes.", alternativa_D: "analisar balanços contábeis.", alternativa_E: "contratar novos funcionários.", gabarito: "C" },
    { numero: 70, materia: "Vendas e Negociação", enunciado: "A identificação de um segmento de clientes com alto potencial mas não atendido pela concorrência é parte da estratégia de:", alternativa_A: "segmentação de mercado.", alternativa_B: "posicionamento de mercado.", alternativa_C: "diferenciação de produto.", alternativa_D: "análise da concorrência.", alternativa_E: "pesquisa de mercado.", gabarito: "A" }
];

async function updateBatch3() {
    console.log("Updating BB 2021 - Prova B - Batch 3 (Q31-Q70)...");

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
