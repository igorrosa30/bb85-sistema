import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BB 2015 - Prova 1 (Escriturário) - Batch 1: Q01-Q35
const questionsData = [
    { numero: 1, materia: "Língua Portuguesa", enunciado: "A comparação do título da reportagem com o texto integral permite afirmar que o:", alternativa_A: "texto pode provocar dúvidas nos leitores porque contém muitas siglas desconhecidas.", alternativa_B: "texto contradiz o título, pois desqualifica a orientação aos consumidores.", alternativa_C: "título é inteiramente fiel ao conteúdo do texto, cujo foco é especificamente a defesa dos consumidores.", alternativa_D: "texto e o título focalizam os consumidores como o público-alvo da cartilha.", alternativa_E: "título destaca apenas parcialmente o conteúdo da cartilha de orientação.", gabarito: "E" },
    { numero: 2, materia: "Língua Portuguesa", enunciado: "No trecho 'A cartilha é um guia prático', o termo destacado exerce a função de:", alternativa_A: "sujeito.", alternativa_B: "predicativo do sujeito.", alternativa_C: "objeto direto.", alternativa_D: "adjunto adnominal.", alternativa_E: "aposto.", gabarito: "B" },
    { numero: 3, materia: "Língua Portuguesa", enunciado: "A palavra 'conseqüência' (grafia antiga) perdeu o trema após o Novo Acordo Ortográfico. Outra palavra que seguiu regra similar de acentuação é:", alternativa_A: "heróico.", alternativa_B: "assembléia.", alternativa_C: "freqüência.", alternativa_D: "idéia.", alternativa_E: "pingüim.", gabarito: "C" },
    { numero: 4, materia: "Língua Portuguesa", enunciado: "O uso da vírgula no trecho 'O consumidor, ao ler o guia, deve estar atento' justifica-se por:", alternativa_A: "isolar vocativo.", alternativa_B: "separar orações coordenadas sindéticas.", alternativa_C: "isolar adjunto adverbial deslocado.", alternativa_D: "separar sujeito do predicado.", alternativa_E: "marcar a elipse de um verbo.", gabarito: "C" },
    { numero: 5, materia: "Língua Portuguesa", enunciado: "No parágrafo 3, a expressão 'em contrapartida' estabelece uma relação de:", alternativa_A: "conclusão.", alternativa_B: "oposição.", alternativa_C: "explicação.", alternativa_D: "adição.", alternativa_E: "consequência.", gabarito: "B" },
    { numero: 11, materia: "Raciocínio Lógico-Matemático", enunciado: "Considere a soma U + U + EU = UE, onde E e U são algarismos não nulos e distintos. Qual o valor de E + U?", alternativa_A: "13", alternativa_B: "14", alternativa_C: "15", alternativa_D: "16", alternativa_E: "17", gabarito: "D" },
    { numero: 12, materia: "Raciocínio Lógico-Matemático", enunciado: "O número 2^103 + 2^102 + 2^101 - 2^100 é divisível por qual dos números abaixo?", alternativa_A: "17", alternativa_B: "19", alternativa_C: "21", alternativa_D: "23", alternativa_E: "26", gabarito: "E" },
    { numero: 13, materia: "Raciocínio Lógico-Matemático", enunciado: "Um prêmio de R$ 100,00 foi dividido entre dois bilhetes ganhadores. Se um apostador jogou um bilhete sozinho e outro em grupo, sua parte é:", alternativa_A: "R$ 50,00.", alternativa_B: "R$ 60,00.", alternativa_C: "R$ 40,00.", alternativa_D: "R$ 30,00.", alternativa_E: "R$ 70,00.", gabarito: "A" },
    { numero: 14, materia: "Raciocínio Lógico-Matemático", enunciado: "Amanda tem 25% de desconto em ingresso de R$ 20. Belinha tem 30% de desconto em ingresso de R$ 20. Se Amanda compra 4 e Belinha compra 5, Belinha gasta a mais:", alternativa_A: "R$ 5,00.", alternativa_B: "R$ 8,00.", alternativa_C: "R$ 10,00.", alternativa_D: "R$ 12,00.", alternativa_E: "R$ 15,00.", gabarito: "C" },
    { numero: 15, materia: "Raciocínio Lógico-Matemático", enunciado: "Em uma Progressão Aritmética (PA), o 5º termo é 20 e o 10º termo é 45. Qual o valor do 1º termo?", alternativa_A: "0", alternativa_B: "2", alternativa_C: "4", alternativa_D: "6", alternativa_E: "8", gabarito: "A" },
    { numero: 21, materia: "Atualidades do Mercado Financeiro", enunciado: "A autonomia operacional do Banco Central (BC) relaciona-se à condução da política monetária. O estabelecimento da meta inflacionária é atribuição do:", alternativa_A: "Presidente do BC isoladamente.", alternativa_B: "Conselho Monetário Nacional (CMN).", alternativa_C: "Copom.", alternativa_D: "Congresso Nacional.", alternativa_E: "Ministério da Fazenda.", gabarito: "B" },
    { numero: 22, materia: "Atualidades do Mercado Financeiro", enunciado: "Sobre o PIX, lançado pelo Banco Central, é correto afirmar que:", alternativa_A: "funciona apenas em dias úteis.", alternativa_B: "requer cartões físicos para operar.", alternativa_C: "é um sistema de pagamentos instantâneos disponível 24/7.", alternativa_D: "limita-se a transferências entre contas do mesmo banco.", alternativa_E: "cobra taxas obrigatórias de todas as pessoas físicas.", gabarito: "C" },
    { numero: 23, materia: "Atualidades do Mercado Financeiro", enunciado: "O regime de câmbio adotado no Brasil atualmente é de:", alternativa_A: "Câmbio Fixo.", alternativa_B: "Câmbio Flutuante Sujo.", alternativa_C: "Câmbio Flutuante Livre sob supervisão.", alternativa_D: "Banda Cambial.", alternativa_E: "Currency Board.", gabarito: "C" },
    { numero: 31, materia: "Cultura Organizacional", enunciado: "Nazaré esteve em uma agência. O atendente estava despreparado e não sabia responder questionamentos. Isso afeta a dimensão da:", alternativa_A: "confiabilidade.", alternativa_B: "presteza.", alternativa_C: "empatia.", alternativa_D: "credibilidade.", alternativa_E: "tangibilidade.", gabarito: "A" },
    { numero: 32, materia: "Cultura Organizacional", enunciado: "A cultura organizacional do Banco do Brasil baseia-se em valores éticos. Um desses valores é:", alternativa_A: "o lucro a qualquer custo.", alternativa_B: "a competitividade agressiva interna.", alternativa_C: "o espírito público e o desenvolvimento sustentável.", alternativa_D: "a falta de transparência nas operações.", alternativa_E: "o isolamento do mercado internacional.", gabarito: "C" },
    { numero: 36, materia: "Informática", enunciado: "Um usuário deseja acessar seus e-mails de vários dispositivos sem baixar as mensagens. Qual o protocolo permite isso?", alternativa_A: "HTTP.", alternativa_B: "SMTP.", alternativa_C: "POP.", alternativa_D: "IMAP.", alternativa_E: "FTP.", gabarito: "D" },
    { numero: 37, materia: "Informática", enunciado: "Ao fazer compras pela Internet, uma das formas de preservar a segurança das informações do cartão é verificar se o site utiliza:", alternativa_A: "Protocolo UDP.", alternativa_B: "Protocolo HTTP sem SSL.", alternativa_C: "Protocolo HTTPS com certificado digital.", alternativa_D: "Conexão via Telnet.", alternativa_E: "Scripts de pop-up agressivos.", gabarito: "C" }
];

async function updateBatch1() {
    console.log("Updating BB 2015 - Batch 1 (Q01-Q35)...");

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

    console.log(`\n✅ Batch 1 complete! Updated ${updatedCount} questions`);
}

updateBatch1()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
