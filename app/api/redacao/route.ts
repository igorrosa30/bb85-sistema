import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { tema, conteudo, status } = await req.json();

        const redacao = await prisma.redacao.create({
            data: {
                tema,
                conteudo,
                status: status || 'Rascunho',
            }
        });

        return NextResponse.json(redacao);
    } catch (error) {
        console.error('Error saving redacao:', error);
        return NextResponse.json({ error: 'Error saving redacao' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const redacoes = await prisma.redacao.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(redacoes);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching redacoes' }, { status: 500 });
    }
}
