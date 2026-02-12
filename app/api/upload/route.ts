import { NextRequest, NextResponse } from 'next/server';
import { parsePDF } from '@/lib/parser';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const text = await parsePDF(buffer);

        // In a real scenario, we would process 'text' to extract questions and save to DB
        // For now, return the extracted text length as confirmation

        return NextResponse.json({
            message: 'File parsed successfully',
            textLength: text.length,
            preview: text.substring(0, 200)
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
