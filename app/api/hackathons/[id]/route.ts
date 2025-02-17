import { NextRequest, NextResponse } from "next/server";
import { getHackathon, updateHackathon } from "@/server/services/hackathons";
import { Hackathon } from "@/types/hackathons";

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
  try {
    const id = req.nextUrl.searchParams.get('id')!;
    const partialEditedHackathon = (await req.json()) as Partial<Hackathon>;

    const updatedHackathon = await updateHackathon(id, partialEditedHackathon);

    return NextResponse.json(updatedHackathon);
  } catch (error) {
    console.error("Error in PUT /api/hackathons/[id]:", error);
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
  }
}