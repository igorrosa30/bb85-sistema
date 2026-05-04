const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const PROVA_ID = 100; // Agente de Tecnologia 2023

    const questions = [
        {
            numero: 31,
            materia: "Conhecimentos Bancários",
            enunciado: "Ao decidir pela aplicação em um ativo financeiro, os investidores levam em conta a chamada taxa de juros real ex-ante.\nSe eles considerarem a taxa de juros SELIC, o índice da taxa de juros real ex-ante para os próximos 12 meses é entendido como o índice da",
            alt_A: "SELIC nominal esperada para os próximos 12 meses, descontado o índice da variação cambial esperada para os próximos 12 meses.",
            alt_B: "SELIC nominal esperada para os próximos 12 meses, descontado o índice da inflação esperada para os próximos 12 meses.",
            alt_C: "SELIC nominal acumulada nos últimos 12 meses, descontado o índice de variação cambial acumulada nos últimos 12 meses.",
            alt_D: "SELIC nominal acumulada nos últimos 12 meses, descontado o índice da inflação acumulada nos últimos 12 meses.",
            alt_E: "SELIC nominal acumulada nos últimos 12 meses, descontado o índice de impostos acumulados nos últimos 12 meses, incidentes sobre os rendimentos do ativo.",
            correta: "B"
        },
        {
            numero: 32,
            materia: "Conhecimentos Bancários",
            enunciado: "As operações diárias de compra e venda de divisas estrangeiras (dólares, euros, libras esterlinas, dentre outras) são parte integrante do mercado",
            alt_A: "monetário",
            alt_B: "cambial",
            alt_C: "acionário",
            alt_D: "creditício",
            alt_E: "de trabalho",
            correta: "B"
        },
        {
            numero: 33,
            materia: "Conhecimentos Bancários",
            enunciado: "A equação da paridade dos juros, a descoberto, estabelece que:\n\ntaxa de juros interna - taxa de juros externa = expectativas de depreciação da moeda nacional em relação ao Dólar americano + risco-país\n\nAdmita-se que a deterioração de indicadores macroeconômicos fundamentais no Brasil, como o déficit fiscal e o déficit em transações correntes do balanço de pagamentos, provoque o aumento do risco-país e a fuga de capitais estrangeiros do Brasil.\nSe a equação de paridade dos juros for aplicada ao caso brasileiro, supondo-se que todos os demais indicadores econômicos permaneçam constantes, para que os influxos de capitais estrangeiros no Brasil voltem a se estabilizar, será necessário",
            alt_A: "aumentar o risco-país.",
            alt_B: "aumentar a taxa de juros externa.",
            alt_C: "aumentar a taxa de juros interna.",
            alt_D: "reduzir a taxa de juros interna.",
            alt_E: "depreciar o Real brasileiro em relação ao Dólar americano.",
            correta: "C"
        },
        {
            numero: 34,
            materia: "Conhecimentos Bancários",
            enunciado: "Considere-se a execução, em determinado ano, do orçamento público consolidado do Brasil.\nSe, no final desse mesmo ano, o total das despesas primárias relativas a gastos em custeio e investimento – excluídas as despesas de juros incidentes sobre o estoque da dívida pública – tiver sido superior ao total das receitas de impostos arrecadados, o governo brasileiro terá fechado o ano com",
            alt_A: "déficit fiscal primário",
            alt_B: "déficit fiscal nominal",
            alt_C: "superávit fiscal primário",
            alt_D: "superávit fiscal nominal",
            alt_E: "orçamento equilibrado",
            correta: "A"
        },
        {
            numero: 35,
            materia: "Conhecimentos Bancários",
            enunciado: "Um pesquisador na área de finanças públicas e privadas atua, também, como consultor de negócios. Em determinado momento, recebe proposta para assessorar empresário que deseja constituir sociedade para negociar informações constantes de dados de instituições financeiras. Tal atividade não é autorizada pela legislação.\nO pesquisador aduz que, consoante a Lei Complementar nº 105/2001, devem observar o sigilo em suas operações ativas e passivas e serviços prestados diversas instituições financeiras, dentre as quais administradoras de",
            alt_A: "imóveis urbanos",
            alt_B: "locação de móveis",
            alt_C: "empréstimo de automóveis",
            alt_D: "bens antigos de raridade comprovada",
            alt_E: "mercado de balcão organizado",
            correta: "E"
        },
        {
            numero: 36,
            materia: "Tecnologia da Informação",
            enunciado: "Analise o código a seguir, feito em Python com o Scikit-learn.\n\nimport numpy as np\nimport sklearn.linear_model as skl\nbase = np.array([1, 2, 3, 4, 5, 6])\nx = base.reshape((-1, 1))\ny = base*2+3\n\n# a fazer\nprint('a', model.coef_[0])\nprint('b', model.intercept_)\n\nA partir desse código, um programador quer obter os parâmetros a e b da equação y = ax + b, por meio de uma regressão linear, usando, para isso, os dados nos vetores x e y definidos no programa.\nQual linha de código deve substituir o comentário # a fazer de modo a realizar essa regressão linear?",
            alt_A: "model = skl.lr(x, y)",
            alt_B: "model = skl.lr().fit(x, y)",
            alt_C: "model = skl.LinearRegression(x, y)",
            alt_D: "model = skl.LinearRegression([x, y])",
            alt_E: "model = skl.LinearRegression().fit(x, y)",
            correta: "E"
        },
        {
            numero: 37,
            materia: "Tecnologia da Informação",
            enunciado: "Em um programa em Swift, o programador deseja incluir o resultado de uma operação dentro de uma string.\nNesse contexto, considere o seguinte código:\n\nlet quantidade = 4\nlet valor = 10\n\nDado o código acima, o programador deseja uma string saida cujo valor seja\n\n\"valor total = 40\"\n\nPara isso, o programador deve utilizar o seguinte fragmento de código Swift:",
            alt_A: "let saida := \"valor total = \\(quantidade*valor)\"",
            alt_B: "let saida := \"valor total = \\{quantidade*valor}\"",
            alt_C: "let saida = \"valor total = %[quantidade*valor]\"",
            alt_D: "let saida = \"valor total = \\(quantidade*valor)\"",
            alt_E: "let saida = \"valor total = \\(quantidade*valor)\"",
            correta: "E" // Assuming the standard syntax matches (E) in the options provided.
        },
        {
            numero: 38,
            materia: "Tecnologia da Informação",
            enunciado: "Um programador foi instruído pelo seu gerente a implementar, em Java, uma classe MemoriaCalculoVenda que implementasse a interface MemoriaCalculo, já criada pela organização e que representa as exigências da organização para classes que implementam memórias de cálculo.\nNesse cenário, com que fragmento de código o programador deve começar, de forma correta, a implementação da classe?",
            alt_A: "class MemoriaCalculoVenda extends MemoriaCalculo",
            alt_B: "class MemoriaCalculoVenda implements MemoriaCalculo",
            alt_C: "class MemoriaCalculoVenda imports MemoriaCalculo",
            alt_D: "class MemoriaCalculoVenda inherits MemoriaCalculo",
            alt_E: "class MemoriaCalculoVenda uses MemoriaCalculo",
            correta: "B"
        },
        {
            numero: 39,
            materia: "Tecnologia da Informação",
            enunciado: "No processo de aprendizagem de máquina, busca-se identificar padrões compreensíveis em bases de dados. Desse modo, supõe-se a existência de uma hierarquia de três níveis: a base, com os itens elementares, captados e armazenados por recursos de Tecnologia da Informação; o nível intermediário, no qual esses itens são processados, com significados e contextos bem definidos; e o nível mais alto, contendo os padrões ou os conjuntos cuja formulação pode envolver ou relacionar os níveis inferiores.\nOs três níveis dessa hierarquia, listados, respectivamente, da base para o nível mais alto, são:",
            alt_A: "conhecimento, informação e dado",
            alt_B: "dado, conhecimento e informação",
            alt_C: "dado, informação e conhecimento",
            alt_D: "informação, conhecimento e dado",
            alt_E: "informação, dado e conhecimento",
            correta: "C"
        },
        {
            numero: 40,
            materia: "Tecnologia da Informação",
            enunciado: "Analise com atenção o código a seguir, escrito em TypeScript 4.0.\n\nfunction segredo(a: number[]) {\n    return a.map(x=>x*2);\n}\n\nconsole.log(segredo([1,2,3]));\n\nO que será exibido no console quando o código acima for executado?",
            alt_A: "\"Executed JavaScript Failed:\"",
            alt_B: "[2, 4, 6]",
            alt_C: "[6]",
            alt_D: "6",
            alt_E: "12",
            correta: "B"
        },
        {
            numero: 41,
            materia: "Tecnologia da Informação",
            enunciado: "Uma organização decidiu monitorar a opinião do público sobre ela nas redes sociais. Para isso, processou as mensagens com referências ao seu nome, a fim de possibilitar o uso de uma técnica de processamento de linguagem natural conhecida como análise de sentimentos.\nApós transformar cada mensagem em uma string, um dos passos importantes nessa técnica é a tokenização, que consiste em",
            alt_A: "colocar todos os caracteres da mensagem em minúsculas.",
            alt_B: "colocar todos os verbos da mensagem no infinitivo.",
            alt_C: "dividir o texto da mensagem em palavras isoladas.",
            alt_D: "eliminar todos os marcadores HTML ou XML da mensagem.",
            alt_E: "substituir todos os caracteres acentuados da mensagem por suas versões sem acento.",
            correta: "C"
        },
        {
            numero: 42,
            materia: "Tecnologia da Informação",
            enunciado: "Sabendo que existe, na organização em que trabalha, uma base de dados formada por uma grande tabela que contém apenas o id do cliente e colunas do tipo booleano indicando se um cliente possuía ou já tinha possuído cada produto da organização, um funcionário de TI resolveu dividir os clientes em grupos apenas com base nessa informação, utilizando aprendizado de máquina.\nPara essa tarefa, o funcionário de TI deve utilizar o aprendizado de máquina",
            alt_A: "independente",
            alt_B: "não supervisionado",
            alt_C: "por recompensa",
            alt_D: "por reforço",
            alt_E: "supervisionado",
            correta: "B"
        },
        {
            numero: 43,
            materia: "Tecnologia da Informação",
            enunciado: "Organizações modernas estão sujeitas a uma grande quantidade de dados, principalmente se tratam com grandes quantidades de clientes. Muitas das demandas de tecnologia de informação a que essas organizações estão submetidas passaram a ser organizadas e tratadas dentro do conceito de Big Data.\nAlém do grande volume de dados, o Big Data, em sua definição original, considera também a(s) seguinte(s) propriedade(s):",
            alt_A: "falta de qualidade, apenas",
            alt_B: "variedade, apenas",
            alt_C: "velocidade, apenas",
            alt_D: "variedade e velocidade",
            alt_E: "velocidade e falta de qualidade",
            correta: "D"
        },
        {
            numero: 44,
            materia: "Tecnologia da Informação",
            enunciado: "Ao fazer a preparação para analisar dados em um banco de dados típico de Big Data, um profissional de TI percebeu que o número de atributos, ou colunas, era muito maior do que poderia processar com a ferramenta de análise disponível, sendo necessário, portanto, utilizar uma técnica de redução de dados para prepará-los para análise.\nUma técnica indicada, nesse caso, é a",
            alt_A: "Amostragem Aleatória",
            alt_B: "Amostragem Estratificada",
            alt_C: "Análise de Componentes Principais",
            alt_D: "Deduplicação",
            alt_E: "Imputação",
            correta: "C"
        },
        {
            numero: 45,
            materia: "Tecnologia da Informação",
            enunciado: "Ao programar em Python com Pandas, é possível usar máscaras para selecionar linhas específicas, de acordo com um padrão.\nNesse cenário, analise o seguinte código:\n\nimport pandas as pd\ndata = {'x':[1,2,3], 'y':[3, 7, 11], 'z': [False, True, False]}\ndf = pd.DataFrame(data)\nm = df['z'] == False\nef = df[m]\n# a fazer\nprint(ef)\n\nAo executar esse código, deseja-se obter a seguinte saída:\n\n   x   y\n0  1   3\n2  3  11\n\nO fragmento de código que deve substituir o comentário # a fazer para obter a saída desejada é",
            alt_A: "ff = ef['x','y']",
            alt_B: "ff = ef[] == 'x' or 'y'",
            alt_C: "ff = ef[['x','y']]",
            alt_D: "ff = ef.cols('x','y')",
            alt_E: "ff = ef.cols(['x','y'])",
            correta: "C"
        },
        {
            numero: 46,
            materia: "Tecnologia da Informação",
            enunciado: "Um programador recebeu a incumbência de desenvolver uma aplicação móvel segundo a API 30 do Android, correspondente ao Android 11. Seguindo as melhores práticas, cada tela dessa aplicação, incluindo sua funcionalidade, foi construída como um módulo único e autônomo, totalmente independente de outros módulos similares.\nEsse módulo único e autônomo é conhecido como",
            alt_A: "activity",
            alt_B: "content provider",
            alt_C: "fragment",
            alt_D: "intent",
            alt_E: "manifest",
            correta: "C"
        },
        {
            numero: 47,
            materia: "Tecnologia da Informação",
            enunciado: "O React Native 0.59 introduziu o conceito de Hooks. Entre os Hooks, tem-se o useState, que permite",
            alt_A: "calcular o estado de um CEP ou ZIP de acordo com o Locale.",
            alt_B: "chamar estados específicos do engine React para alterar seu comportamento.",
            alt_C: "declarar uma classe que segue o padrão de design state.",
            alt_D: "criar uma enumeration que representa estados.",
            alt_E: "manter um estado local em uma função de um componente funcional.",
            correta: "E"
        },
        {
            numero: 48,
            materia: "Tecnologia da Informação",
            enunciado: "Durante o desenvolvimento de uma aplicação mobile em Java para Android, um programador detectou a necessidade de alterar o texto de um widget da classe TextView, chamado resultado, para \"Sucesso!\".\nPara realizar essa ação, esse programador deve usar o seguinte fragmento de código:",
            alt_A: "TextView resultado = \"Sucesso!\";",
            alt_B: "resultado := \"Sucesso!\";",
            alt_C: "resultado.setValue(\"Sucesso!\");",
            alt_D: "resultado.setText(\"Sucesso!\");",
            alt_E: "resultado=TextView.setValue(\"Sucesso!\");",
            correta: "D"
        },
        {
            numero: 49,
            materia: "Tecnologia da Informação",
            enunciado: "Ansible é uma ferramenta configurável por playbooks, escritos em YAML.\nUm playbook é composto de",
            alt_A: "plays, que são sequências de modules que, por sua vez, chamam tasks.",
            alt_B: "plays, que são sequências de tasks que, por sua vez, chamam modules.",
            alt_C: "tasks, que são sequências de modules que, por sua vez, chamam plays.",
            alt_D: "tasks, que são sequências de plays que, por sua vez, chamam modules.",
            alt_E: "modules, que são sequências de tasks que, por sua vez, chamam play.",
            correta: "B"
        },
        {
            numero: 50,
            materia: "Tecnologia da Informação",
            enunciado: "Kotlin é uma linguagem de programação usada no desenvolvimento Android.\nEntre suas características, está um grau de compatibilidade com Java, que permite",
            alt_A: "chamar funções feitas em Java, apenas, mas não permite que suas funções Kotlin sejam chamadas por Java.",
            alt_B: "ler dados que foram salvos por apps Java, apenas.",
            alt_C: "ler e escrever dados que podem ser lidos e escritos por apps Java, apenas.",
            alt_D: "ter suas funções chamadas por Java, apenas, mas não consegue chamar funções feitas em Java.",
            alt_E: "construir apps com código parcialmente em Java e parcialmente em Kotlin, sem restrições.",
            correta: "E"
        },
        {
            numero: 51,
            materia: "Tecnologia da Informação",
            enunciado: "A seguir, é apresentado um fragmento de código em Python.\n\nimport numpy as np\nb = np.array([[1,2,3,5]])\nc = b.transpose()\nprint(b.dot(c),sum(b),sum(c))\n\nO fragmento de código acima provoca a seguinte saída:",
            alt_A: "39 [11] [11]",
            alt_B: "39 [1 2 3 5] 11",
            alt_C: "[39] [1 2 3 5] 11",
            alt_D: "[[39]] [11] [11]",
            alt_E: "[[39]] [1 2 3 5] [11]",
            correta: "E"
        },
        {
            numero: 52,
            materia: "Tecnologia da Informação",
            enunciado: "Considere uma empresa que possui dados de clientes, todos bem definidos e estruturados (ex: CPF, nome, e-mail, endereço), armazenados em um banco de dados relacional. Uma oportunidade surge para a empresa enriquecer esse banco de dados com dados de outra natureza, porém não muito bem definidos e pouco estruturados.\nUma solução pode ser adotar um banco de dados NoSQL, de tal forma que:",
            alt_A: "a ausência de um esquema de dados bem definido para os dados necessários de um cliente possa ser corretamente modelada e implementada em um gerenciador de banco de dados adequado.",
            alt_B: "a linguagem SQL utilizada para acesso aos dados dos clientes possa ser substituída por outra linguagem de acesso a dados organizados em tabelas segundo o modelo relacional, porém com maior eficiência.",
            alt_C: "esse novo banco de dados relacional possa ser melhorado, com os dados não muito bem definidos, sem um esquema rígido.",
            alt_D: "o gerenciador de banco de dados relacional utilizado possa ser atualizado para uma versão mais recente, que não utilize a linguagem SQL.",
            alt_E: "os atributos que hoje representam chaves primárias e estrangeiras sejam mais bem controlados.",
            correta: "A"
        },
        {
            numero: 53,
            materia: "Tecnologia da Informação",
            enunciado: "Uma empresa de investimentos financeiros busca identificar novas oportunidades de negócio para pessoas jurídicas, em especial dentre aquelas que têm como característica a adoção de governança ambiental, social e corporativa (conhecida como ESG, uma sigla em inglês). Considere que existe um banco de dados nessa empresa com as seguintes tabelas (todas as chaves primárias são numéricas):\n\nEmpresa (CNPJ, razaoSocial, endereco)\nCaracteristica (cod, sigla, nome)\nTem (CNPJ, cod)\n\nQue comando SELECT do SQL retorna apenas o CNPJ e a razão social das empresas que não têm \"ESG\" como característica?",
            alt_A: "SELECT *\nFROM Empresa\nWHERE Caracteristica.Sigla <> 'ESG'",
            alt_B: "SELECT E.CNPJ, E.razaoSocial\nFROM Empresa E\nJOIN Tem T ON (E.CNPJ = T.CNPJ)\nWHERE Tem.cod = 'ESG'",
            alt_C: "SELECT E.CNPJ, E.razaoSocial\nFROM Empresa E\nJOIN Tem T ON (E.CNPJ = T.CNPJ)\nJOIN Caracteristica C ON (C.cod = T.cod)\nWHERE C.nome <> 'ESG'",
            alt_D: "SELECT E.CNPJ, E.razaoSocial\nFROM Empresa E\nWHERE E.CNPJ NOT IN (\n    SELECT T.CNPJ\n    FROM Tem T\n    JOIN Caracteristica C ON (T.cod = C.cod)\n    WHERE C.sigla = 'ESG'\n)",
            alt_E: "SELECT Empresa.*\nFROM Empresa, Tem\nWHERE Empresa.CNPJ = Tem.cod\nAND Tem.cod <> 'ESG'",
            correta: "D"
        },
        {
            numero: 54,
            materia: "Tecnologia da Informação",
            enunciado: "Um banco de dados (BD) persiste dados de forma organizada e controlada. Em adição, um BD deve prover recursos para permitir que consultas que necessitem de velocidade (baixo tempo de resposta) no acesso aos dados possam ter um bom desempenho.\nUm dos recursos que um profissional de tecnologia da informação tem à disposição para configurar um BD, de modo a melhorar o desempenho de consultas selecionadas, é a criação de",
            alt_A: "regras de integridade",
            alt_B: "visões não materializadas",
            alt_C: "índices",
            alt_D: "sequências",
            alt_E: "gatilhos",
            correta: "C"
        }
    ];

    for (const q of questions) {
        await prisma.questao.upsert({
            where: { id: 1000 + q.numero }, // Using unique IDs for this turn
            update: {
                prova_id: PROVA_ID,
                numero_base: q.numero,
                materia: q.materia,
                enunciado: q.enunciado,
                alternativa_A: q.alt_A,
                alternativa_B: q.alt_B,
                alternativa_C: q.alt_C,
                alternativa_D: q.alt_D,
                alternativa_E: q.alt_E,
                alternativa_correta_base: q.correta
            },
            create: {
                id: 1000 + q.numero,
                prova_id: PROVA_ID,
                numero_base: q.numero,
                materia: q.materia,
                enunciado: q.enunciado,
                alternativa_A: q.alt_A,
                alternativa_B: q.alt_B,
                alternativa_C: q.alt_C,
                alternativa_D: q.alt_D,
                alternativa_E: q.alt_E,
                alternativa_correta_base: q.correta
            }
        });
    }

    console.log("Successfully added questions 31-54 to the database.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
