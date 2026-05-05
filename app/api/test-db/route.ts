import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const result: Record<string, unknown> = {
        status: 'unknown',
        timestamp: new Date().toISOString(),
        env: {
            DATABASE_URL_defined: !!process.env.DATABASE_URL,
            DIRECT_URL_defined: !!process.env.DIRECT_URL,
            NODE_ENV: process.env.NODE_ENV,
        },
        counts: {},
        error: null,
    };

    try {
        // Test 1: Raw connection
        await prisma.$queryRaw`SELECT 1`;

        // Test 2: Count rows in each table
        const [questaoCount, provaCount, simuladoCount, respostaCount] = await Promise.all([
            prisma.questao.count(),
            prisma.prova.count(),
            prisma.simulado.count(),
            prisma.respostaUsuario.count(),
        ]);

        result.status = 'connected';
        result.counts = {
            questoes: questaoCount,
            provas: provaCount,
            simulados: simuladoCount,
            respostas: respostaCount,
        };

        return NextResponse.json(result, { status: 200 });
    } catch (error: unknown) {
        result.status = 'error';
        result.error = error instanceof Error
            ? { message: error.message, name: error.name }
            : String(error);

        return NextResponse.json(result, { status: 500 });
    }
}
