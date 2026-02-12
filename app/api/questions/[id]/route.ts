import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper to extract ID from params (Next.js 15+ async params)
async function getParams(context: { params: Promise<{ id: string }> }) {
    return await context.params;
}

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await getParams(context);
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const question = await prisma.questao.findUnique({
            where: { id },
            include: { prova: true },
        });

        if (!question) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        return NextResponse.json(question);
    } catch (error) {
        console.error(`Error fetching question ${context}:`, error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await getParams(context);
        const id = parseInt(params.id);
        const body = await req.json();

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const updatedQuestion = await prisma.questao.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await getParams(context);
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        await prisma.questao.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
