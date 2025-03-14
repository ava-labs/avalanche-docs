import { createRegisterForm } from "@/server/services/registerForms";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newHackathon = await createRegisterForm(body);

    return NextResponse.json(
      { message: 'registration form created', hackathon: newHackathon },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error POST /api/register-form:', error.message);
    const wrappedError = error as Error;
    return NextResponse.json(
      { error: wrappedError },
      { status: wrappedError.cause == 'ValidationError' ? 400 : 500 }
    );
  }
}