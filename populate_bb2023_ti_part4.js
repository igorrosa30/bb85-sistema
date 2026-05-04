const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const PROVA_ID = 100; // Agente de Tecnologia 2023

    const questions = [
        {
            numero: 66,
            materia: "Tecnologia da Informação",
            enunciado: "A Figura a seguir exibe o conteúdo de três pilhas: P1, P2 e P3.\n(P1: bottom=40, top=10 | P2: bottom=34, top=15 | P3: bottom=20, top=35)\n\nAdmita que um método Java, chamado exibePilha, receba essas três pilhas como parâmetros e execute os seguintes passos:\n\n1. Cria duas pilhas auxiliares, A1 e A2, inicialmente vazias;\n2. Remove um elemento de P1 e o insere em A1. Em seguida, remove um elemento de P2 e o insere em A1. Repete esses dois procedimentos até que P1 e P2 fiquem, ambas, vazias;\n3. Remove um elemento de P3 e o insere em A1. Repete esse procedimento até que P3 fique vazia;\n4. Remove um elemento de A1 e o insere em A2. Repete esse procedimento até que A1 fique vazia;\n5. Remove um elemento de A2 e o exibe no console. Repete esse procedimento 4 vezes.\n\nO que será exibido no console, quando o método exibePilha for executado, tendo P1, P2 e P3 sido passadas como parâmetros?",
            alt_A: "10 15 25 28",
            alt_B: "10 25 30 40",
            alt_C: "15 10 28 25",
            alt_D: "20 35 34 40",
            alt_E: "40 34 30 60",
            correta: "A"
        },
        {
            numero: 67,
            materia: "Tecnologia da Informação",
            enunciado: "Um estudante de computação decidiu escrever um método Java para exibir, no console, em pré-ordem, os valores dos nós de uma árvore binária recebida como parâmetro. Ao executar esse método, os seguintes valores foram exibidos no console:\n\n80 84 55 76 72\n\nConsiderando os valores exibidos, qual árvore foi recebida como parâmetro?",
            alt_A: "Árvore (A): Raiz 80, Esquerda 84 (com Filho Esquerdo 55), Direita 76 (com Filho Esquerdo 72)",
            alt_B: "Árvore (B): Raiz 80, Esquerda 72 (com Filho Esquerdo 76), Direita 55 (com Filho Direito 84)",
            alt_C: "Árvore (C): Raiz 72, Esquerda 84 (com Filho Esquerdo 55), Direita 76 (com Filho Direito 80)",
            alt_D: "Árvore (D): Raiz 72, Esquerda 84 (com Filho Esquerdo 55), Direita 80 (com Filho Direito 76)",
            alt_E: "Árvore (E): Árvore degenerada (zig-zag) começando em 55-84-72-76-80",
            correta: "A"
        },
        {
            numero: 68,
            materia: "Tecnologia da Informação",
            enunciado: "A Figura abaixo exibe um diagrama E-R que contém duas entidades (ET1 e XT2) e uma relação (S).\nET1 (0,1) -- S -- (1,n) XT2\n\nAdmita a existência de um banco de dados relacional composto pelos conjuntos ET1 e XT2, oriundos do mapeamento das entidades ET1 e XT2. Parte do estado atual desse banco de dados é definido pelos seguintes conjuntos:\nET1={e1,e2,e4}\nXT2={t1,t2,t3}\n\nQual conjunto completa o banco de dados em questão, de modo a atender a todas as regras relativas à relação S?",
            alt_A: "S={ }",
            alt_B: "S={ (e1,t1), (e2,t2), (e2,t3) }",
            alt_C: "S={ (e1,t1), (e2,t2), (e4,t1) }",
            alt_D: "S={ (e1,t1), (e1,t2), (e4,t3), (e4,t2) }",
            alt_E: "S={ (e1,t3), (e2,t2), (e4,t1) }",
            correta: "E"
        },
        {
            numero: 69,
            materia: "Tecnologia da Informação",
            enunciado: "Considere o seguinte diagrama E-R:\nTx (0,n) -- Rel (r1, r2) -- (0,n) Ey\nTx tem atributos X1 (PK), X2, X3. Ey tem atributos Y1 (PK), Y2.\nFoi criado um conjunto de tabelas relacionais, a partir do modelo E-R acima. Uma vez que as regras de transformações de entidades e relações para tabelas relacionais independem dos tipos de dados dos atributos, todos os atributos do modelo E-R acima foram tratados como itens de dados do tipo cadeia de caracteres (TEXT).\n\nQual transformação da relação Rel irá preservar a semântica do diagrama E-R apresentado?",
            alt_A: "CREATE TABLE REL (X1 TEXT NOT NULL, Y1 TEXT NOT NULL, R1 TEXT NOT NULL, R2 TEXT NOT NULL, PRIMARY KEY (X1, Y1), FOREIGN KEY (X1) REFERENCES TX (X1), FOREIGN KEY (Y1) REFERENCES EY (Y1));",
            alt_B: "CREATE TABLE REL (X1 TEXT NOT NULL, Y1 TEXT NOT NULL, R1 TEXT NOT NULL, R2 TEXT NOT NULL, PRIMARY KEY (X1, R1), FOREIGN KEY (X1) REFERENCES TX (X1), FOREIGN KEY (Y1) REFERENCES EY (Y1));",
            alt_C: "CREATE TABLE REL (X1 TEXT NOT NULL, Y1 TEXT NOT NULL, R1 TEXT NOT NULL, R2 TEXT NOT NULL, PRIMARY KEY (Y1, R1), FOREIGN KEY (X1) REFERENCES TX (X1), FOREIGN KEY (Y1) REFERENCES EY (Y1));",
            alt_D: "CREATE TABLE REL (X1 TEXT NOT NULL, Y1 TEXT NOT NULL, R1 TEXT NOT NULL, R2 TEXT NOT NULL, PRIMARY KEY (X1, Y1, R1), FOREIGN KEY (X1) REFERENCES TX (X1), FOREIGN KEY (Y1) REFERENCES EY (Y1));",
            alt_E: "CREATE TABLE REL (X1 TEXT NOT NULL, Y1 TEXT NOT NULL, R1 TEXT NOT NULL, R2 TEXT NOT NULL, PRIMARY KEY (R1), FOREIGN KEY (X1) REFERENCES TX (X1), FOREIGN KEY (Y1) REFERENCES EY (Y1));",
            correta: "A"
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

    console.log("Successfully added questions 66-69 to the database.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
