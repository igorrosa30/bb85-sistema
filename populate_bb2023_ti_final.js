const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const PROVA_ID = 100; // Agente de Tecnologia 2023

    const question70 = {
        numero: 70,
        materia: "Tecnologia da Informação",
        enunciado: "Um método Java, chamado converte, deve receber uma string (str) como parâmetro e retornar uma string igual a str, exceto pelas letras minúsculas, que devem ser convertidas em letras maiúsculas.\n\nExemplo:\nString recebida: \"Abc $12d\"\nString retomada: \"ABC $12D\"\n\nQual método realiza essa tarefa?",
        alt_A: "public static String converte(String str) {\n    String r=\"\"; int i=0;\n    do {\n        char x=str.charAt(i);\n        if(Character.isLowerCase(x)) r=r.concat(Character.toString(Character.toUpperCase(x)));\n        else r=r.concat(Character.toString(x));\n        i++;\n    } while(i < str.length());\n    return r;\n}",
        alt_B: "public static String converte(String str) {\n    String r=null; int i=0;\n    while(i < str.length()) {\n        char x=str.charAt(i);\n        if(Character.isLowerCase(x)) r=r.concat(Character.toString(Character.toUpperCase(x)));\n        else r=r.concat(Character.toString(x));\n        i++;\n    }\n    return r;\n}",
        alt_C: "public static String converte(String str) {\n    String r=null; int i=0;\n    while(i < str.length()) {\n        if(str[i].isLowerCase(x)) r=r.concat(Character.toString(Character.toUpperCase(str[i])));\n        else r=r.concat(Character.toString(str[i]));\n        i++;\n    }\n    return r;\n}",
        alt_D: "public static String converte(String str) {\n    String r=\"\";\n    for(char x : str)\n        if(Character.isLowerCase(x)) r=r.concat(Character.toString(Character.toUpperCase(x)));\n        else r=r.concat(Character.toString(x));\n    return r;\n}",
        alt_E: "public static String converte(String str) {\n    String r=\"\";\n    for(int i=0; i < str.length(); i++)\n        if(Character.isLowerCase(str.charAt(i)))\n            r=r+Character.toUpperCase(str.charAt(i));\n        else\n            r=r+str.charAt(i);\n    return r;\n}",
        correta: "E"
    };

    await prisma.questao.upsert({
        where: { id: 1000 + question70.numero },
        update: {
            prova_id: PROVA_ID,
            numero_base: question70.numero,
            materia: question70.materia,
            enunciado: question70.enunciado,
            alternativa_A: question70.alt_A,
            alternativa_B: question70.alt_B,
            alternativa_C: question70.alt_C,
            alternativa_D: question70.alt_D,
            alternativa_E: question70.alt_E,
            alternativa_correta_base: question70.correta
        },
        create: {
            id: 1000 + question70.numero,
            prova_id: PROVA_ID,
            numero_base: question70.numero,
            materia: question70.materia,
            enunciado: question70.enunciado,
            alternativa_A: question70.alt_A,
            alternativa_B: question70.alt_B,
            alternativa_C: question70.alt_C,
            alternativa_D: question70.alt_D,
            alternativa_E: question70.alt_E,
            alternativa_correta_base: question70.correta
        }
    });

    console.log("Successfully added question 70. Exam complete!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
