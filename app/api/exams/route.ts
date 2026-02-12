import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const exams = await prisma.prova.findMany({
            orderBy: { ano: 'desc' },
            include: {
                _count: {
                    select: { questions: true }, // Verify usage of 'questions' relation name
                },
            },
        });
        return NextResponse.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        // Fallback if relation name 'questions' is different (in schema it is 'questoes')
        try {
            const examsFallback = await prisma.prova.findMany({
                orderBy: { ano: 'desc' },
                include: {
                    _count: {
                        select: { questoes: true },
                    },
                },
            });
            return NextResponse.json(examsFallback);
        } catch (e) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { ano, cargo, tipo_prova, versao } = body;

        const exam = await prisma.prova.create({
            data: {
                ano,
                cargo,
                tipo_prova,
                versao,
            },
        });

        return NextResponse.json(exam, { status: 201 });
    } catch (error) {
        console.error('Error creating exam:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
