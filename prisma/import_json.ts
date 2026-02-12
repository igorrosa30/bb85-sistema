import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    const jsonPath = path.join(__dirname, '../../bb85-flask-v5/data/banco_dados.json');
    if (!fs.existsSync(jsonPath)) {
        console.error('JSON database not found at:', jsonPath);
        return;
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const questions = data.questoes || [];

    console.log(`Starting import of ${questions.length} questions...`);

    // Group questions by Prova
    const provasMap = new Map();

    for (const q of questions) {
        const key = `${q.ano}-${q.prova || 'A'}-${q.versao || '1'}`;
        if (!provasMap.has(key)) {
            provasMap.set(key, {
                ano: q.ano,
                cargo: 'Escriturário - Agente Comercial', // Default cargo
                tipo_prova: q.prova || 'A',
                versao: q.versao || '1',
                questoes: []
            });
        }
        provasMap.get(key).questoes.push(q);
    }

    let provaCount = 0;
    let questaoCount = 0;

    for (const [key, pData] of provasMap.entries()) {
        console.log(`Creating Prova: ${key}`);

        const prova = await prisma.prova.create({
            data: {
                ano: pData.ano,
                cargo: pData.cargo,
                tipo_prova: pData.tipo_prova,
                versao: pData.versao,
                questoes: {
                    create: pData.questoes.map((q: any) => ({
                        numero_base: q.id % 100, // Approximate question number
                        materia: q.materia,
                        subtema: '',
                        peso_materia: 1.0,
                        enunciado: q.enunciado,
                        imagem_url: q.imagem || null,
                        alternativa_A: q.alternativas.A,
                        alternativa_B: q.alternativas.B,
                        alternativa_C: q.alternativas.C,
                        alternativa_D: q.alternativas.D,
                        alternativa_E: q.alternativas.E,
                        alternativa_correta_base: q.correta,
                        comentario: q.comentario,
                        comentario_detalhado: q.comentario_detalhado || null,
                        video_url: q.video_url || null
                    }))
                }
            }
        });
        provaCount++;
        questaoCount += pData.questoes.length;
    }

    console.log(`Import finished! Created ${provaCount} Provas and ${questaoCount} Questões.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
