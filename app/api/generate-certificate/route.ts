import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

const courseMapping: Record<string, string> = {
  'avalanche-fundamentals': 'Avalanche Fundamentals',
};

function getCourseName(courseId: string): string {
  return courseMapping[courseId] || courseId;
}

export async function POST(req: NextRequest) {
  try {
    const { courseId, userName } = await req.json();
    if (!courseId || !userName) { return NextResponse.json({ error: 'Missing required fields' }, { status: 400 }); }
    const courseName = getCourseName(courseId);
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host') || 'localhost:3000';
    const serverUrl = `${protocol}://${host}`;
    const templateUrl = `${serverUrl}/certificates/AvalancheAcademy_Certificate.pdf`;
    const templateResponse = await fetch(templateUrl);

    if (!templateResponse.ok) { throw new Error(`Failed to fetch template`); }

    const templateArrayBuffer = await templateResponse.arrayBuffer();
    const pdfDoc = await PDFDocument.load(templateArrayBuffer);
    const form = pdfDoc.getForm();

    try {
      // fills the form fields in our certificate template
      form.getTextField('FullName').setText(userName);
      form.getTextField('Class').setText(courseName);
      form.getTextField('Awarded').setText(new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
      form.getTextField('Id').setText(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    } catch (error) {
      throw new Error('Failed to fill form fields');
    }
    
    form.flatten();
    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${courseId}_certificate.pdf`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate certificate, contact the Avalanche team.', details: (error as Error).message },
      { status: 500 }
    );
  }
}