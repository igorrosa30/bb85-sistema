import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script to populate video_url for questions by searching YouTube
 * Uses question enunciado to create targeted search URLs
 */
async function populateVideoUrls() {
    console.log("Starting YouTube URL population...");

    const questions = await prisma.questao.findMany({
        select: {
            id: true,
            enunciado: true,
            materia: true,
            numero_base: true,
            prova: {
                select: {
                    ano: true,
                    cargo: true
                }
            }
        }
    });

    console.log(`Found ${questions.length} questions to process`);

    let updated = 0;
    for (const q of questions) {
        // Extract first 100 characters of enunciado for search
        const enunciadoSnippet = q.enunciado.substring(0, 100).trim();

        // Create search query combining multiple relevant terms
        const searchTerms = [
            "Banco do Brasil",
            "Cesgranrio",
            q.prova?.ano || "2023",
            q.materia,
            `questão ${q.numero_base}`,
            enunciadoSnippet
        ].join(" ");

        // Create YouTube search URL
        const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerms)}`;

        // Update database
        await prisma.questao.update({
            where: { id: q.id },
            data: { video_url: videoUrl }
        });

        updated++;
        if (updated % 50 === 0) {
            console.log(`Updated ${updated}/${questions.length} questions...`);
        }
    }

    console.log(`✅ Successfully updated ${updated} questions with YouTube search URLs`);
}

populateVideoUrls()
    .catch(e => {
        console.error("Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
