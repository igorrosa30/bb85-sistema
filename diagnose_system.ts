
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("--- STARTING SYSTEM DIAGNOSIS ---");

    // 1. Total Questions
    const totalQuestions = await prisma.questao.count();
    console.log(`Total Questions: ${totalQuestions}`);

    // 2. Questions with Images
    const questionsWithImages = await prisma.questao.count({
        where: { imagem_url: { not: null } }
    });
    console.log(`Questions with Images: ${questionsWithImages}`);

    // 3. Questions with Video
    const questionsWithVideo = await prisma.questao.count({
        where: { video_url: { not: null } }
    });
    console.log(`Questions with Video: ${questionsWithVideo}`);

    // 4. Questions with Comments
    const questionsWithComments = await prisma.questao.count({
        where: { comentario: { not: null } }
    });
    console.log(`Questions with Comments: ${questionsWithComments}`);

    // 5. Questions with Detailed Comments
    const questionsWithDetailedComments = await prisma.questao.count({
        where: { comentario_detalhado: { not: null } }
    });
    console.log(`Questions with Detailed Comments: ${questionsWithDetailedComments}`);

    // 6. Exams (Provas)
    const totalProvas = await prisma.prova.count();
    console.log(`Total Provas: ${totalProvas}`);

    // 7. Simulation History
    const totalSimulados = await prisma.simulado.count();
    console.log(`Total Simulados (History): ${totalSimulados}`);

    console.log("--- DIAGNOSIS COMPLETE ---");
}

main()
    .catch(e => {
        console.error("ERROR DURING DIAGNOSIS:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
