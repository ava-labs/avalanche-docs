import { NextRequest, NextResponse } from "next/server";
import { getHackathon, validateHackathon } from "@/server/services/hackathons";
import { Hackathon } from "@/types/hackathons";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {

  try {
    const id = req.nextUrl.searchParams.get('id');
    const hackathon = await getHackathon(id!)

    return NextResponse.json(hackathon);
  } catch (error) {
    console.error("Error in GET /api/hackathons/[id]:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const prisma = new PrismaClient();
  try {

    const id = req.nextUrl.searchParams.get('id')!;
    let editedHackathon = (await req.json()) as Partial<Hackathon>;
    const errors = validateHackathon(editedHackathon);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const existingHackathon = await prisma.hackathon.findUnique({
      where: { id },
    });
    if (!existingHackathon) {
      return NextResponse.json({ error: "Hackathon not found." }, { status: 404 });
    }

    const updatedHackathon = await prisma.hackathon.update({
      where: { id },
      data: editedHackathon,
    });

    return NextResponse.json(updatedHackathon);
  } catch (error) {
    console.error("Error in PUT /api/hackathons/[id]:", error);
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
  }
}