import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { tempo_total, percentual_geral, percentual_materia_json, classificacao } = body;

        const simulado = await prisma.simulado.create({
            data: {
                tempo_total,
                percentual_geral,
                percentual_materia_json: JSON.stringify(percentual_materia_json),
                classificacao,
            },
        });

        return NextResponse.json(simulado, { status: 201 });
    } catch (error) {
        console.error('Error creating simulation:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const limit = 10;
        const history = await prisma.simulado.findMany({
            orderBy: { data: 'desc' },
            take: limit,
        });
        return NextResponse.json(history);
    } catch (error) {
        console.error('Error fetching simulation history:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
