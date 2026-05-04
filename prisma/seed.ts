import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando Sincronização Supreme (70 Questões Reais)...')

  // 1. Criar ou Atualizar Perfil do Usuário
  await prisma.userProfile.upsert({
    where: { id: 'unico' },
    update: {},
    create: {
      id: 'unico',
      xp: 0,
      level: 1,
      streak: 0,
      totalQuestoes: 0,
      totalAcertos: 0,
    }
  })

  // 2. Criar a Prova Principal (ID 100 para manter compatibilidade)
  const prova = await prisma.prova.upsert({
    where: { id: 100 },
    update: {},
    create: {
      id: 100,
      ano: 2023,
      cargo: "Escriturário - Agente de Tecnologia",
      tipo_prova: "TI",
      versao: "Gabarito 1"
    }
  })

  const questions = [
    // --- PARTE 1 (1-30) ---
    { numero: 1, materia: "Língua Portuguesa", enunciado: "O trecho do texto que resume o objetivo do \"empreendedorismo social\" é", alt_A: "\"A meta é transformar uma realidade, promover o bem-estar da sociedade e agregar valor com cunho social\". (parágrafo 1)", alt_B: "\"os empreendimentos sociais analisam seu desempenho a partir do impacto social gerado por sua atuação\". (parágrafo 2)", alt_C: "\"ser inovadora; realizável; autossustentável; contar com a participação de diversos segmentos da sociedade\". (parágrafo 4)", alt_D: "\"Quem tem interesse de atuar nessa área precisa trabalhar em grupo e formar parcerias\". (parágrafo 5)", alt_E: "\"o profissional precisa ter flexibilidade e vontade de explorar, pois é possível que ele acabe exercendo um papel que não seja necessariamente na sua área de formação\". (parágrafo 6)", correta: "A" },
    { numero: 2, materia: "Língua Portuguesa", enunciado: "O texto explica que o empreendedorismo social se diferencia do conceito de negócio social porque o primeiro procura", alt_A: "criar profissionais especializados na sua área de atuação.", alt_B: "excluir do processo a parcela mais carente da população.", alt_C: "seguir a lógica tradicional do mercado de ações.", alt_D: "ter como objetivo produzir retorno financeiro.", alt_E: "transformar a sociedade por meio da inovação.", correta: "E" },
    { numero: 3, materia: "Língua Portuguesa", enunciado: "No trecho \"está relacionado ao ato de empreender ou inovar com o objetivo de alavancar causas sociais e ambientais\" (parágrafo 1), a palavra destacada pode ser substituída, sem prejuízo do sentido do texto, por", alt_A: "comprovar", alt_B: "defender", alt_C: "impulsionar", alt_D: "modificar", alt_E: "subsidiar", correta: "C" },
    { numero: 4, materia: "Língua Portuguesa", enunciado: "No trecho \"Ainda que não exista uma concepção única sobre o empreendedorismo social\" (parágrafo 1), a expressão destacada pode ser substituída, sem prejuízo do sentido do texto, por", alt_A: "À medida que", alt_B: "Contanto que", alt_C: "De modo que", alt_D: "Mesmo que", alt_E: "Por causa de", correta: "D" },
    { numero: 5, materia: "Língua Portuguesa", enunciado: "No trecho \"Ainda que não exista uma concepção única\" (parágrafo 1), a palavra destacada pode ser substituída, sem prejuízo do sentido do texto, por", alt_A: "compreensão", alt_B: "conciliação", alt_C: "convivência", alt_D: "capacidade", alt_E: "semelhança", correta: "A" },
    { numero: 6, materia: "Língua Portuguesa", enunciado: "A palavra destacada atende às exigências de concordância de acordo com a norma-padrão da língua portuguesa em:", alt_A: "A administração de empresas de tecnologia e o marketing profissional estão envolvidos na promoção de novos negócios na área econômica.", alt_B: "A assistência social às pessoas carentes e os cuidados com o aparecimento de novas doenças são necessárias para manter a saúde da população.", alt_C: "A iniciativa de implementar mudanças nas empresas e o sucesso ao alcançar êxito são comemoradas pelos funcionários.", alt_D: "O financiamento de projetos e a assistência aos necessitados, desejadas pelos empreendedores sociais, precisam da atenção redobrada dos responsáveis.", alt_E: "A vacinação de toda a população e a intensificação dos estudos sobre a pandemia devem ser implementados pelas autoridades.", correta: "A" },
    { numero: 7, materia: "Língua Portuguesa", enunciado: "No trecho \"os empreendimentos sociais analisam seu desempenho\" (parágrafo 2), a palavra destacada se refere a", alt_A: "problema", alt_B: "comunidade", alt_C: "daquele grupo", alt_D: "retorno financeiro", alt_E: "empreendimentos sociais", correta: "E" },
    { numero: 8, materia: "Língua Portuguesa", enunciado: "De acordo com a norma-padrão da língua portuguesa, o uso do acento grave indicativo da crase é obrigatório na palavra destacada em:", alt_A: "A descrição detalhada de um empreendimento a ser realizado é uma necessidade para a aprovação de sua realização.", alt_B: "A divulgação do concurso levou muitas pessoas a se candidatarem a vaga mais concorrida na empresa.", alt_C: "A tentativa de obter a isenção fiscal é buscada a todo custo pelos responsáveis da instituição.", alt_D: "O sucesso de uma empresa deve ser atribuído a gestores competentes.", alt_E: "O uso de recursos digitais levou os jovens estudiosos a uma nova forma de aprendizagem em diferentes áreas.", correta: "B" },
    { numero: 9, materia: "Língua Portuguesa", enunciado: "O emprego da vírgula atende às exigências da norma-padrão da língua portuguesa em:", alt_A: "A execução de novas tarefas em um supermercado, envolve a disposição dos funcionários de aceitarem as mudanças propostas pelo RH.", alt_B: "Ao consultar os fornecedores de produtos para suas lojas, os responsáveis por esse departamento devem ser cuidadosos.", alt_C: "A escolha do funcionário para proferir uma palestra em nome da empresa, compete à administração da instituição.", alt_D: "O profissional interessado em mudanças na sua área de atuação deve estudar, com antecedência as suas possibilidades de crescimento.", alt_E: "Para desenvolver projetos cabe ao gerente da organização, a iniciativa de implementar novas técnicas à disposição dos empreendedores.", correta: "B" },
    { numero: 10, materia: "Língua Portuguesa", enunciado: "O pronome oblíquo destacado foi colocado na posição correta, segundo as exigências da norma-padrão da língua portuguesa, em:", alt_A: "A área da saúde não encontra-se atendida em regiões afastadas dos grandes centros urbanos nem em comunidades que vivem nas periferias das cidades.", alt_B: "A preocupação com o meio ambiente tem sido um dos segmentos mais relevantes do empreendedorismo social, porque destina-se a transformar positivamente a sociedade.", alt_C: "Governantes que têm como missão viabilizar o acesso universal à educação pública de qualidade sempre preocupam-se com ações de inovação e empreendedorismo.", alt_D: "Para uma iniciativa de empreendedorismo destinada à formação de educadores tornar-se produtiva, é preciso identificar as necessidades do público-alvo de cada comunidade.", alt_E: "Quando os profissionais que atuam na área de empreendedorismo social sentem-se desanimados, é preciso que eles avaliem todo o progresso que ajudaram a desenvolver.", correta: "D" },
    { numero: 11, materia: "Língua Inglesa", enunciado: "The main purpose of the text is to", alt_A: "present a brief history of money.", alt_B: "relate the history of money with wars.", alt_C: "regret society's attitude regarding money.", alt_D: "deny the importance of money to humankind.", alt_E: "describe the relevance of money in the world.", correta: "A" },
    { numero: 12, materia: "Língua Inglesa", enunciado: "In the fragment in the fourth paragraph of the text, \"It was the Lydians... credit for a critical step...\" the words in bold refer to:", alt_A: "BC — coins", alt_B: "600 BC — first", alt_C: "600 BC — coins", alt_D: "Lydians — coins", alt_E: "Lydians — known", correta: "D" },
    { numero: 13, materia: "Língua Inglesa", enunciado: "In the sixth paragraph of the text, the author mentions that paper money first circulated in", alt_A: "Italy", alt_B: "China", alt_C: "England", alt_D: "Australia", alt_E: "Germany", correta: "B" },
    { numero: 14, materia: "Língua Inglesa", enunciado: "In the fragment in the seventh paragraph... \"One of the problems, though...\", the word in bold is associated with:", alt_A: "time", alt_B: "addition", alt_C: "condition", alt_D: "emphasis", alt_E: "opposition", correta: "E" },
    { numero: 15, materia: "Língua Inglesa", enunciado: "In the tenth paragraph, the author predicts that artificial intelligence will be able to", alt_A: "manage bank accounts.", alt_B: "prevent money changes.", alt_C: "eliminate exchange rates.", alt_D: "control financial resources.", alt_E: "avoid inflation and corruption.", correta: "A" },
    { numero: 16, materia: "Matemática", enunciado: "Comissão comandada por Alice, Beatriz e Carla... (Cargos: presidente, gerente, coordenadora)...", alt_A: "gerente, coordenadora e presidente", alt_B: "gerente, presidente e coordenadora", alt_C: "coordenadora, presidente e gerente", alt_D: "presidente, gerente e coordenadora", alt_E: "presidente, coordenadora e gerente", correta: "B" },
    { numero: 17, materia: "Matemática", enunciado: "Fábrica vende 200 malas a R$ 300 cada... Hipótese de aumento de preço... Valor arrecadado y em função de x...", alt_A: "y = - 200x^2 - 5800x + 63600", alt_B: "y = - 200x^2 - 4000x + 63600", alt_C: "y = - 200x^2 - 5800x + 60000", alt_D: "y = - 200x^2 - 4800x + 60800", alt_E: "y = - 200x^2 - 4000x + 60000", correta: "E" },
    { numero: 18, materia: "Matemática", enunciado: "Reclamações em órgão de defesa... 180 no 1º dia, 184 no 2º... Total em agosto (31 dias)?", alt_A: "7.108", alt_B: "7.440", alt_C: "7.860", alt_D: "8.184", alt_E: "8.880", correta: "B" },
    { numero: 19, materia: "Matemática", enunciado: "Pacote com cédulas de 10, 20 e 50... Total 68 cédulas, R$ 1.380... Número de cédulas de 10?", alt_A: "26", alt_B: "31", alt_C: "37", alt_D: "39", alt_E: "42", correta: "B" },
    { numero: 20, materia: "Matemática", enunciado: "H horas e M minutos... 3/7 do tempo passado corresponde ao que falta... H + M?", alt_A: "19", alt_B: "24", alt_C: "37", alt_D: "64", alt_E: "96", correta: "D" },
    { numero: 21, materia: "Atualidades do Mercado Financeiro", enunciado: "A principal característica dos bancos exclusivamente digitais é a", alt_A: "oferta de produtos e serviços por meio digital.", alt_B: "oferta de serviços por meio de agências bancárias.", alt_C: "oferta de todos os serviços operados pelos bancos múltiplos.", alt_D: "ausência de operações com moeda estrangeira.", alt_E: "cobrança de taxas similares às cobradas pelos bancos tradicionais.", correta: "A" },
    { numero: 22, materia: "Atualidades do Mercado Financeiro", enunciado: "No Sistema Financeiro Nacional, identificam-se os bancos-sombra (shadow banks) como bancos que", alt_A: "possuem diversos tipos de carteiras em suas operações ativas.", alt_B: "se especializam em transações financeiras como bancos estrangeiros.", alt_C: "se concentram em transações financeiras no mercado local.", alt_D: "realizam operações financeiras à margem do sistema de regulação e supervisão do BCB.", alt_E: "se associam para prestar serviços financeiros a seus associados.", correta: "D" },
    { numero: 23, materia: "Atualidades do Mercado Financeiro", enunciado: "Preferência por liquidez e práticas de entesouramento... A moeda assume a função de:", alt_A: "meio de financiamento", alt_B: "meio de troca", alt_C: "unidade de conta", alt_D: "escambo", alt_E: "reserva de valor", correta: "E" },
    { numero: 24, materia: "Atualidades do Mercado Financeiro", enunciado: "Plataforma digital que assemelha-se a um shopping virtual é denominada:", alt_A: "startup", alt_B: "marketplace", alt_C: "fintech", alt_D: "mobile banking", alt_E: "internet banking", correta: "B" },
    { numero: 25, materia: "Atualidades do Mercado Financeiro", enunciado: "O uso de blockchain é revolucionário porque:", alt_A: "possibilita o armazenamento de forma distribuída, criptografada e sem intermediação.", alt_B: "envolve múltiplos intermediários mantendo a centralização.", alt_C: "permite a quebra do sigilo bancário.", alt_D: "elimina práticas ilegais por completo.", alt_E: "privilegia a linguagem analógica.", correta: "A" },
    { numero: 26, materia: "Probabilidade e Estatística", enunciado: "Distribuição normal de alturas... 5% acima de 200cm, 2,5% abaixo de 192,8cm... Desvio padrão?", alt_A: "2", alt_B: "4", alt_C: "8", alt_D: "16", alt_E: "64", correta: "B" },
    { numero: 27, materia: "Probabilidade e Estatística", enunciado: "População (2, 5, 10, 15). Média 8, Variância 24,5... Variância da distribuição amostral (n=2)?", alt_A: "3,50", alt_B: "4,94", alt_C: "12,25", alt_D: "24,50", alt_E: "32,67", correta: "C" },
    { numero: 28, materia: "Probabilidade e Estatística", enunciado: "4 celulares esquecidos... Entrega aleatória... Probabilidade de apenas 1 receber o seu?", alt_A: "3/4", alt_B: "2/3", alt_C: "1/2", alt_D: "3/8", alt_E: "1/3", correta: "E" },
    { numero: 29, materia: "Probabilidade e Estatística", enunciado: "Tempo médio de espera: 8m30s (2700 clientes) e 5m30s (1350 clientes)... Média total?", alt_A: "5min 50s", alt_B: "6min 30s", alt_C: "6min 50s", alt_D: "7min 30s", alt_E: "7min 50s", correta: "D" },
    { numero: 30, materia: "Probabilidade e Estatística", enunciado: "Clientes tipo A (propensos a usar cheque especial) e B... P(A)=0,3. P(Use|A)=0,8, P(Use|B)=0,1... Se usou, P(A)?", alt_A: "65%", alt_B: "70%", alt_C: "77%", alt_D: "82%", alt_E: "85%", correta: "C" },

    // --- PARTE 2 (31-54) ---
    { numero: 31, materia: "Conhecimentos Bancários", enunciado: "Taxa de juros real ex-ante SELIC... Índice entendido como:", alt_A: "SELIC nominal - variação cambial esperada.", alt_B: "SELIC nominal - inflação esperada.", alt_C: "SELIC acumulada - variação cambial acumulada.", alt_D: "SELIC acumulada - inflação acumulada.", alt_E: "SELIC acumulada - impostos.", correta: "B" },
    { numero: 32, materia: "Conhecimentos Bancários", enunciado: "Compra e venda de divisas estrangeiras integram o mercado:", alt_A: "monetário", alt_B: "cambial", alt_C: "acionário", alt_D: "creditício", alt_E: "de trabalho", correta: "B" },
    { numero: 33, materia: "Conhecimentos Bancários", enunciado: "Paridade dos juros: J interna - J externa = Depreciação + Risco... Para estabilizar fluxo após aumento de risco?", alt_A: "aumentar risco-país", alt_B: "aumentar taxa externa", alt_C: "aumentar taxa interna", alt_D: "reduzir taxa interna", alt_E: "depreciar Real", correta: "C" },
    { numero: 34, materia: "Conhecimentos Bancários", enunciado: "Despesas primárias superiores às receitas de impostos gera:", alt_A: "déficit fiscal primário", alt_B: "déficit fiscal nominal", alt_C: "superávit fiscal primário", alt_D: "superávit fiscal nominal", alt_E: "equilíbrio", correta: "A" },
    { numero: 35, materia: "Conhecimentos Bancários", enunciado: "Sigilo bancário (LC 105/2001) abrange administradoras de:", alt_A: "imóveis", alt_B: "locação", alt_C: "empréstimo", alt_D: "bens antigos", alt_E: "mercado de balcão organizado", correta: "E" },
    { numero: 36, materia: "Tecnologia da Informação", enunciado: "Python Scikit-learn: obter a e b em y=ax+b via regressão linear...", alt_A: "model = skl.lr(x, y)", alt_B: "model = skl.lr().fit(x, y)", alt_C: "model = skl.LinearRegression(x, y)", alt_D: "model = skl.LinearRegression([x, y])", alt_E: "model = skl.LinearRegression().fit(x, y)", correta: "E" },
    { numero: 37, materia: "Tecnologia da Informação", enunciado: "Swift: incluir resultado de operação dentro de string...", alt_A: "let saida := \"\\(quantidade*valor)\"", alt_B: "let saida := \"\\{...}\"", alt_C: "let saida = \"...%[...]\"", alt_D: "let saida = \"...\\(...)\"", alt_E: "let saida = \"valor total = \\(quantidade*valor)\"", correta: "E" },
    { numero: 38, materia: "Tecnologia da Informação", enunciado: "Java: Classe implementar interface MemoriaCalculo...", alt_A: "extends", alt_B: "implements", alt_C: "imports", alt_D: "inherits", alt_E: "uses", correta: "B" },
    { numero: 39, materia: "Tecnologia da Informação", enunciado: "Hierarquia: Base (TI), Intermediário (significado), Alto (padrões)... Níveis são:", alt_A: "conhecimento, informação, dado", alt_B: "dado, conhecimento, informação", alt_C: "dado, informação, conhecimento", alt_D: "informação, conhecimento, dado", alt_E: "informação, dado, conhecimento", correta: "C" },
    { numero: 40, materia: "Tecnologia da Informação", enunciado: "TypeScript 4.0: a.map(x=>x*2) para [1,2,3] exibe:", alt_A: "Erro", alt_B: "[2, 4, 6]", alt_C: "[6]", alt_D: "6", alt_E: "12", correta: "B" },
    { numero: 41, materia: "Tecnologia da Informação", enunciado: "PLN: Tokenização consiste em:", alt_A: "minúsculas", alt_B: "infinitivo", alt_C: "dividir texto em palavras isoladas", alt_D: "eliminar HTML", alt_E: "remover acentos", correta: "C" },
    { numero: 42, materia: "Tecnologia da Informação", enunciado: "Dividir clientes em grupos (sem labels) usando ML é:", alt_A: "independente", alt_B: "não supervisionado", alt_C: "recompensa", alt_D: "reforço", alt_E: "supervisionado", correta: "B" },
    { numero: 43, materia: "Tecnologia da Informação", enunciado: "Big Data: Além do volume, as outras propriedades do V3 original são:", alt_A: "qualidade", alt_B: "variedade apenas", alt_C: "velocidade apenas", alt_D: "variedade e velocidade", alt_E: "velocidade e qualidade", correta: "D" },
    { numero: 44, materia: "Tecnologia da Informação", enunciado: "Redução de dimensionalidade (muitos atributos) em Big Data:", alt_A: "Amostragem Aleatória", alt_B: "Amostragem Estratificada", alt_C: "Análise de Componentes Principais (PCA)", alt_D: "Deduplicação", alt_E: "Imputação", correta: "C" },
    { numero: 45, materia: "Tecnologia da Informação", enunciado: "Pandas: Selecionar colunas 'x' e 'y' de DataFrame filtrado...", alt_A: "ef['x','y']", alt_B: "ef[] == 'x'...", alt_C: "ef[['x','y']]", alt_D: "ef.cols('x','y')", alt_E: "ef.cols(['x','y'])", correta: "C" },
    { numero: 46, materia: "Tecnologia da Informação", enunciado: "Android 11: Módulo único e autônomo de tela é:", alt_A: "activity", alt_B: "content provider", alt_C: "fragment", alt_D: "intent", alt_E: "manifest", correta: "C" },
    { numero: 47, materia: "Tecnologia da Informação", enunciado: "React Native: useState permite:", alt_A: "CEP", alt_B: "chamar engine", alt_C: "classe state", alt_D: "enum", alt_E: "manter estado local em componente funcional", correta: "E" },
    { numero: 48, materia: "Tecnologia da Informação", enunciado: "Android Java: Alterar texto de TextView para 'Sucesso!'...", alt_A: "resultado = ...", alt_B: ":=", alt_C: ".setValue", alt_D: ".setText(\"Sucesso!\")", alt_E: "=TextView.setValue", correta: "D" },
    { numero: 49, materia: "Tecnologia da Informação", enunciado: "Ansible Playbook composto por:", alt_A: "plays -> modules -> tasks", alt_B: "plays -> tasks -> modules", alt_C: "tasks -> modules -> plays", alt_D: "tasks -> plays -> modules", alt_E: "modules -> tasks -> play", correta: "B" },
    { numero: 50, materia: "Tecnologia da Informação", enunciado: "Kotlin compatibilidade com Java permite:", alt_A: "chamar apenas", alt_B: "ler apenas", alt_C: "ler/escrever apenas", alt_D: "ser chamado apenas", alt_E: "código parcial Java e parcial Kotlin sem restrições", correta: "E" },
    { numero: 51, materia: "Tecnologia da Informação", enunciado: "Python NumPy: b = [[1,2,3,5]], c = b.transpose()... b.dot(c) exibe:", alt_A: "39", alt_B: "[...]", alt_C: "[39]", alt_D: "[[39]] [11] [11]", alt_E: "[[39]] [1 2 3 5] [11]", correta: "E" },
    { numero: 52, materia: "Tecnologia da Informação", enunciado: "NoSQL para dados pouco estruturados em BD Relacional:", alt_A: "modelagem sem esquema rígido", alt_B: "SQL por outra", alt_C: "melhorado relacional", alt_D: "sem SQL", alt_E: "chaves controladas", correta: "A" },
    { numero: 53, materia: "Tecnologia da Informação", enunciado: "SQL: Empresas que NÃO têm 'ESG' como característica (Empresa, Caracteristica, Tem)...", alt_A: "WHERE <> 'ESG'", alt_B: "JOIN Tem...", alt_C: "JOIN Caract...", alt_D: "SELECT ... WHERE E.CNPJ NOT IN (SELECT ... WHERE C.sigla = 'ESG')", alt_E: "WHERE CNPJ = cod", correta: "D" },
    { numero: 54, materia: "Tecnologia da Informação", enunciado: "Melhorar desempenho de consultas selecionadas no BD:", alt_A: "integridade", alt_B: "visões", alt_C: "índices", alt_D: "sequências", alt_E: "gatilhos", correta: "C" },

    // --- PARTE 3 (55-65) ---
    { numero: 55, materia: "Tecnologia da Informação", enunciado: "SQL: COUNT(*) de Pessoas jovens (maiorIdade <= 19) no RJ...", alt_A: "pessoas jovens nascidas no RJ", alt_B: "nome e email", alt_C: "agrupa por faixa", alt_D: "união", alt_E: "agrupa por UF", correta: "A" },
    { numero: 56, materia: "Tecnologia da Informação", enunciado: "SQL: 'SELECT CNPJ, sigla FROM Empresa, UF' sem WHERE recupera:", alt_A: "sigla sede", alt_B: "pares iguais", alt_C: "apenas cadastradas", alt_D: "todas sedes", alt_E: "todos os pares possíveis (Produto Cartesiano)", correta: "E" },
    { numero: 57, materia: "Tecnologia da Informação", enunciado: "Funcionalidade de um SGBD:", alt_A: "vírus", alt_B: "controlar acesso aos dados", alt_C: "estimular gestores", alt_D: "sequência programas", alt_E: "identificar dados ausentes", correta: "B" },
    { numero: 58, materia: "Tecnologia da Informação", enunciado: "SQL: Empresas com atividade '4120-4/00' (Empresa, CNAE)...", alt_A: "JOIN...", alt_B: "WHERE ...", alt_C: "SELECT CNPJ...", alt_D: "SELECT ... FROM Empresa E, CNAE C WHERE E.atividade = C.codigo AND C.codigo = '4120-4/00'", alt_E: "WHERE activity = ...", correta: "D" },
    { numero: 59, materia: "Tecnologia da Informação", enunciado: "NoSQL para representar ligações entre pessoas (relacionamentos):", alt_A: "chave/valor", alt_B: "colunas", alt_C: "documentos", alt_D: "grafos", alt_E: "relacional", correta: "D" },
    { numero: 60, materia: "Tecnologia da Informação", enunciado: "TypeScript: let frase = 'Bom dia!'; frase = 9.5; resulta em:", alt_A: "sem erro", alt_B: "inferência OK", alt_C: "aceita atribuição", alt_D: "erro de compilação (inferência string)", alt_E: "não diferencia decimal", correta: "D" },
    { numero: 61, materia: "Tecnologia da Informação", enunciado: "NumPy: np.where(stars >= 4, 'bom', 'ruim') atribui 'bom' para:", alt_A: "2 a 5", alt_B: "4 e 5", alt_C: "3 e 4", alt_D: "ruim para 4", alt_E: "ruim para 1 a 4", correta: "B" },
    { numero: 62, materia: "Tecnologia da Informação", enunciado: "Big Data: Identificar anomalias ou resultados raros (outliers):", alt_A: "Agrupamento", alt_B: "Associações", alt_C: "Segmentação", alt_D: "Análise de outliers / detecção de desvios", alt_E: "Classificação", correta: "D" },
    { numero: 63, materia: "Tecnologia da Informação", enunciado: "Java: Busca binária por 78 em array de 14 elementos... Visita quais?", alt_A: "54 79 69 72", alt_B: "49 72 86 79", alt_C: "54 86 69 72 79", alt_D: "67 86 72 79", alt_E: "54 79 67 69 72", correta: "A" },
    { numero: 64, materia: "Tecnologia da Informação", enunciado: "Java: Polimorfismo e static em CAx/CBy... o.op1(2) exibe:", alt_A: "10", alt_B: "12", alt_C: "14", alt_D: "18", alt_E: "20", correta: "A" },
    { numero: 65, materia: "Tecnologia da Informação", enunciado: "Java: Exceptions em Qb/Pa... o=new Qb(\"a\", \"\", \"c\") exibe:", alt_A: "Erro", alt_B: "Erro vac", alt_C: "vazio", alt_D: "ac", alt_E: "a**c", correta: "D" },

    // --- PARTE 4 (66-69) ---
    { numero: 66, materia: "Tecnologia da Informação", enunciado: "Java: Pilhas P1, P2, P3... Lógica de transferência... Exibe 4 elementos:", alt_A: "10 15 25 28", alt_B: "10 25 30 40", alt_C: "15 10 28 25", alt_D: "20 35 34 40", alt_E: "40 34 30 60", correta: "A" },
    { numero: 67, materia: "Tecnologia da Informação", enunciado: "Java: Árvore binária percurso Pré-Ordem: 80 84 55 76 72... Qual a árvore?", alt_A: "Árvore (A): Raiz 80, Esq 84 (Filho Esq 55), Dir 76 (Filho Esq 72)", alt_B: "Árvore (B)...", alt_C: "Árvore (C)...", alt_D: "Árvore (D)...", alt_E: "Árvore (E)...", correta: "A" },
    { numero: 68, materia: "Tecnologia da Informação", enunciado: "Diagrama E-R: ET1 (0,1) -- S -- (1,n) XT2... Estado: ET1={e1,e2,e4}, XT2={t1,t2,t3}... Conjunto S?", alt_A: "S={ }", alt_B: "S={ (e1,t1), (e2,t2), (e2,t3) }", alt_C: "S={ (e1,t1), (e2,t2), (e4,t1) }", alt_D: "S={ (e1,t1), (e1,t2), (e4,t3), (e4,t2) }", alt_E: "S={ (e1,t3), (e2,t2), (e4,t1) }", correta: "E" },
    { numero: 69, materia: "Tecnologia da Informação", enunciado: "SQL: Transformação da relação N:N Rel(r1, r2) entre Tx(X1) e Ey(Y1)...", alt_A: "CREATE TABLE REL (X1 PK, Y1 PK, ...)", alt_B: "PK(X1, R1)", alt_C: "PK(Y1, R1)", alt_D: "PK(X1, Y1, R1)", alt_E: "PK(R1)", correta: "A" },
    { numero: 70, materia: "Tecnologia da Informação", enunciado: "Um método Java, chamado converte, deve receber uma string (str) como parâmetro e retornar uma string igual a str, exceto pelas letras minúsculas, que devem ser convertidas em letras maiúsculas.", alt_A: "public static String converte(String str) { ... do { ... } while(i < str.length()); ... }", alt_B: "public static String converte(String str) { ... while(i < str.length()) { ... } ... }", alt_C: "public static String converte(String str) { ... str[i].isLowerCase(x) ... }", alt_D: "public static String converte(String str) { ... for(char x : str) ... }", alt_E: "public static String converte(String str) {\n    String r=\"\";\n    for(int i=0; i < str.length(); i++)\n        if(Character.isLowerCase(str.charAt(i)))\n            r=r+Character.toUpperCase(str.charAt(i));\n        else\n            r=r+str.charAt(i);\n    return r;\n}", correta: "E" }
  ];

  for (const q of questions) {
    await prisma.questao.upsert({
      where: { id: 1000 + q.numero },
      update: {
        prova_id: prova.id,
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
        prova_id: prova.id,
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
    })
  }

  console.log(`🚀 Sincronização Concluída! ${questions.length} questões reais inseridas.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
