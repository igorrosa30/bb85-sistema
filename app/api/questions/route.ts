import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const provaId = searchParams.get('provaId');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const where = provaId ? { prova_id: parseInt(provaId) } : {};

        const questions = await prisma.questao.findMany({
            where,
            take: limit,
            skip: offset,
            include: {
                prova: true,
            },
        });

        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            prova_id,
            numero_base,
            materia,
            subtema,
            peso_materia,
            enunciado,
            imagem_url,
            alternativa_A,
            alternativa_B,
            alternativa_C,
            alternativa_D,
            alternativa_E,
            alternativa_correta_base,
            comentario,
        } = body;

        const question = await prisma.questao.create({
            data: {
                prova_id,
                numero_base,
                materia,
                subtema,
                peso_materia,
                enunciado,
                imagem_url,
                alternativa_A,
                alternativa_B,
                alternativa_C,
                alternativa_D,
                alternativa_E,
                alternativa_correta_base,
                comentario,
            },
        });

        return NextResponse.json(question, { status: 201 });
    } catch (error) {
        console.error('Error creating question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
