import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper to extract ID from params
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

        const exam = await prisma.prova.findUnique({
            where: { id },
            include: {
                questoes: true, // Correct relation name from schema
            },
        });

        if (!exam) {
            return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
        }

        return NextResponse.json(exam);
    } catch (error) {
        console.error('Error fetching exam:', error);
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

        await prisma.prova.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        console.error('Error deleting exam:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
