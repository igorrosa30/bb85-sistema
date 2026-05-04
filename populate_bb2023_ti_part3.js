const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const PROVA_ID = 100; // Agente de Tecnologia 2023

    const questions = [
        {
            numero: 55,
            materia: "Tecnologia da Informação",
            enunciado: "O banco de dados de uma empresa que comercializa seguros pessoais possui as seguintes tabelas:\n\nPessoa (email, nome, unidadeFederativaNascimento, faixaEtaria)\nUF (sigla, nome)\nFaixa (nome, menorIdade, maiorIdade)\n\nA coluna \"unidadeFederativaNascimento\" da tabela Pessoa é uma chave estrangeira que referencia a coluna \"sigla\" da tabela UF; a coluna \"faixaEtaria\" da tabela Pessoa é uma chave estrangeira que aponta para a coluna \"nome\" da tabela Faixa.\nA tabela Faixa possui os seguintes dados:\nnome | menorIdade | maiorIdade\nJovens | - não informada - | 19\nAdultos | 20 | 59\nIdosos | 60 | - não informada -\n\nConsidere o seguinte comando:\n\nSELECT COUNT(*)\nFROM Pessoa P, Faixa F\nWHERE P.faixaEtaria = F.nome\nAND P.unidadeFederativaNascimento = 'RJ'\nAND F.maiorIdade <= 19\n\nEsse comando SQL",
            alt_A: "apresenta quantas são as pessoas que estão na tabela Pessoa, que são jovens e que nasceram no estado do Rio de Janeiro.",
            alt_B: "apresenta o nome e o email de jovens nascidos no Rio de Janeiro.",
            alt_C: "agrupa pessoas por faixa etária e mostra quantos são os grupos com pessoas nascidas no Rio de Janeiro.",
            alt_D: "realiza uma operação equivalente à união de dois outros comandos SQL.",
            alt_E: "agrupa pessoas por UF e mostra quantos são os grupos com jovens.",
            correta: "A"
        },
        {
            numero: 56,
            materia: "Tecnologia da Informação",
            enunciado: "O banco de dados de uma empresa de investimentos financeiros possui as seguintes tabelas:\n\nEmpresa (CNPJ, razaoSocial, endereco)\nUF (sigla, nome)\n\nO que o comando SQL \"SELECT CNPJ, sigla FROM Empresa, UF\" recupera desse banco de dados?",
            alt_A: "A sigla da UF das sedes das empresas cadastradas.",
            alt_B: "Alguns pares de CNPJ e sigla, onde o nome da UF é igual à razão social da empresa.",
            alt_C: "O CNPJ das empresas cadastradas cuja sigla de UF esteja na tabela UF.",
            alt_D: "Pares de CNPJ e sigla de todas as empresas cadastradas com as UFs de suas respectivas sedes.",
            alt_E: "Todos os pares de CNPJ e sigla possíveis, de todas as empresas e de todas as UFs cadastradas.",
            correta: "E"
        },
        {
            numero: 57,
            materia: "Tecnologia da Informação",
            enunciado: "Um Sistema Gerenciador de Banco de Dados (SGBD) é um software bastante utilizado em empresas que precisam armazenar, tratar e utilizar dados em geral. O SGBD é especializado em realizar atividades relacionadas aos dados.\nUma das várias funcionalidades que um SGBD pode executar é",
            alt_A: "alertar os administradores da infraestrutura de TI de uma empresa quando há vírus circulando na rede.",
            alt_B: "controlar que usuários podem ter acesso a que dados.",
            alt_C: "estimular os gestores de uma empresa a compartilhar dados em benefício de todos.",
            alt_D: "garantir a sequência de execução de programas, em especial quando há dependências de dados entre eles.",
            alt_E: "identificar que dados importantes ao processo decisório de uma empresa estão ausentes e deveriam ser coletados.",
            correta: "B"
        },
        {
            numero: 58,
            materia: "Tecnologia da Informação",
            enunciado: "A CNAE (Classificação Nacional de Atividades Econômicas), de responsabilidade do IBGE, possui códigos que são utilizados para caracterizar as atividades econômicas no Brasil. Por exemplo: empresas da área de construção de edifícios utilizam o CNAE de código 4120-4/00 para caracterizar a sua atividade econômica principal. Considere que existe um banco de dados em uma empresa, que concede empréstimos a outras empresas, com as seguintes tabelas:\n\nEmpresa (CNPJ, razaoSocial, endereco, atividade)\nCNAE (codigo, descricao)\n\nA coluna \"atividade\" da tabela Empresa é uma chave estrangeira que referencia a coluna \"codigo\" da tabela CNAE.\nQue comando SELECT do SQL retorna apenas o CNPJ e a razão social das empresas cuja atividade econômica principal é a construção de edifícios (código 4120-4/00)?",
            alt_A: "SELECT *\nFROM Empresa E, CNAE C\nWHERE E.atividade = C.codigo",
            alt_B: "SELECT *\nFROM Empresa\nWHERE atividade = 'construção de edifícios'",
            alt_C: "SELECT CNPJ, razaoSocial\nFROM CNAE\nWHERE codigo = '4120-4/00'",
            alt_D: "SELECT CNPJ, razaoSocial\nFROM Empresa E, CNAE C\nWHERE E.atividade = C.codigo\nAND C.codigo = '4120-4/00'",
            alt_E: "SELECT CNPJ, razaoSocial\nFROM Empresa\nWHERE atividade = '4120-4/00'",
            correta: "D"
        },
        {
            numero: 59,
            materia: "Tecnologia da Informação",
            enunciado: "Considere um cenário no qual uma empresa de investimentos financeiros tenha realizado uma campanha para que seus colaboradores indicassem outras pessoas que pudessem vir a estar interessadas em seus produtos e serviços. Esses colaboradores também foram estimulados a informar a sua ligação com as pessoas indicadas (ex: amigo, irmão, primo) e as eventuais ligações entre as pessoas indicadas. Estes relacionamentos são importantes para a definição da próxima campanha dessa empresa.\nO banco de dados NoSQL mais indicado para representar esses dados é o que utiliza o modelo",
            alt_A: "chave/valor",
            alt_B: "orientado a colunas",
            alt_C: "orientado a documentos",
            alt_D: "orientado a grafos",
            alt_E: "relacional",
            correta: "D"
        },
        {
            numero: 60,
            materia: "Tecnologia da Informação",
            enunciado: "O código abaixo está em linguagem TypeScript, cuja tipagem é estática.\n\nlet fraseLegal = 'Bom dia!';\nfraseLegal = 9.5;\n\nAnalisando o código apresentado, tem-se que a TypeScript",
            alt_A: "não realiza a inferência de tipo, por isso, o código apresentado vai rodar sem erro.",
            alt_B: "realiza a inferência de tipo, por isso, o código apresentado vai rodar sem erro.",
            alt_C: "realiza a inferência de tipo, por isso, aceita a atribuição do tipo number para um tipo string sem gerar erro de compilação do código apresentado.",
            alt_D: "realiza a inferência de tipo, por isso, não aceita a atribuição do tipo number para um tipo string, o que vai gerar um erro de compilação do código apresentado.",
            alt_E: "não diferencia valores ponto flutuante (decimal) de valores inteiros, por isso, o código apresentado vai rodar sem erro.",
            correta: "D"
        },
        {
            numero: 61,
            materia: "Tecnologia da Informação",
            enunciado: "Em uma base de dados (dataset) com avaliações sobre a qualidade de um determinado produto, o campo stars tem um valor de 1 a 5. Na fase de pré-processamento, decidiu-se criar o campo sentimento com valores bom ou ruim, e utilizando-se da biblioteca NumPy, escreveu-se o comando abaixo:\n\ndataset['sentimento'] = np.where(dataset['stars'] >= 4, 'bom', 'ruim')\n\nQuanto aos valores do campo sentimento, o referido comando atribuirá o valor",
            alt_A: "bom, para stars entre 2 e 5",
            alt_B: "bom, para stars 4 e 5",
            alt_C: "bom, para stars 3 e 4",
            alt_D: "ruim, para stars 4 e 5",
            alt_E: "ruim, para stars entre 1 e 4",
            correta: "B"
        },
        {
            numero: 62,
            materia: "Tecnologia da Informação",
            enunciado: "Um profissional de TI está trabalhando com um grande banco de dados (Big Data), realizando uma análise prévia da base de dados, com o objetivo de identificar anomalias ou resultados raros, de forma a tratá-los ou descartá-los para utilização.\nEsse profissional está realizando a seguinte tarefa:",
            alt_A: "Agrupamento dos dados",
            alt_B: "Análise de associações dos dados",
            alt_C: "Análise de segmentação dos dados",
            alt_D: "Análise de outliers (pontos fora da curva) ou detecção de desvios",
            alt_E: "Classificação dos dados e das anomalias",
            correta: "D"
        },
        {
            numero: 63,
            materia: "Tecnologia da Informação",
            enunciado: "Para entender como o algoritmo de busca binária se comporta, um estudante de computação resolveu inserir um comando System.out.printf() em um método chamado busca. Esse método, escrito em Java, realiza uma busca binária em um array de números inteiros, ordenados de forma ascendente. O objetivo do printf é exibir, no console, o valor de cada elemento do array visitado pelo algoritmo de busca binária.\nPara testar o código que criou, o estudante escreveu o método main a seguir.\n\npublic class Main {\n    public static void main(String[] args) {\n        int lista[]={5,18,27,33,44,49,54,67,69,72,79,86,87,92};\n        // o array lista possui 14 elementos\n        busca(78, lista);\n    }\n    public static int busca(int val, int lista[]) {\n        // código relativo ao algoritmo de busca binária\n    }\n}\n\nO que será exibido no console quando o método main for executado?",
            alt_A: "54 79 69 72",
            alt_B: "49 72 86 79",
            alt_C: "54 86 69 72 79",
            alt_D: "67 86 72 79",
            alt_E: "54 79 67 69 72",
            correta: "A"
        },
        {
            numero: 64,
            materia: "Tecnologia da Informação",
            enunciado: "Sejam as seguintes classes Java, que ocupam arquivos separados:\n\npublic class CAx {\n    protected int a;\n    protected int b;\n    public CAx() {\n        a*=2;\n        b*=3;\n    }\n    {\n        a=1;\n        b=2;\n    }\n    public int op1(int x) {\n        return op2(x)+op3(x)+b;\n    }\n    public int op2(int x) {\n        return x+a;\n    }\n    public static int op3(int x) {\n        return x*2;\n    }\n}\n\npublic class CBy extends CAx {\n    protected int a;\n    public CBy() {\n        a+=3;\n        b+=3;\n    }\n    public int op2(int x) {\n        return x-a;\n    }\n    public static int op3(int x) {\n        return x*3;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        CAx o=new CBy();\n        System.out.println(o.op1(2));\n    }\n}\n\nO que será exibido no console quando o método main for executado?",
            alt_A: "10",
            alt_B: "12",
            alt_C: "14",
            alt_D: "18",
            alt_E: "20",
            correta: "A"
        },
        {
            numero: 65,
            materia: "Tecnologia da Informação",
            enunciado: "Considere as seguintes classes Java, que ocupam arquivos separados:\n\npublic class Pa {\n    String x,y,z;\n    String r=\"vazio\";\n    public Pa(String s1,String s2, String s3) throws Exception {\n        x=s1; y=s2; z=s3;\n        try {\n            if(x==null || y==null || z==null) throw new Exception();\n        } catch(Exception e) {\n            z=\"a\"; throw e;\n        } finally {\n            if(x==null) x=\"***\";\n            if(y==null) y=\"***\";\n            if(z==null) z=\"***\";\n        }\n    }\n    public String get() { return r; }\n}\n\npublic class Qb extends Pa {\n    public Qb(String s1,String s2, String s3) throws Exception {\n        super(s1,s2,s3);\n        r=x+y+z;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Pa o=null;\n        try {\n            o=new Qb(\"a\", \"\", \"c\");\n        } catch (Exception e) {\n            System.out.print(\"***Erro***\");\n        } finally {\n            if(o!=null) System.out.print(o.get());\n        }\n    }\n}\n\nO que será exibido no console quando o método main for executado?",
            alt_A: "***Erro***",
            alt_B: "***Erro***vac",
            alt_C: "vazio",
            alt_D: "ac",
            alt_E: "a**c",
            correta: "D"
        }
    ];

    for (const q of questions) {
        await prisma.questao.upsert({
            where: { id: 1000 + q.numero },
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

    console.log("Successfully added questions 55-65 to the database.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
