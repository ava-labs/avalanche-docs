import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";
import { getHackathon, validateHackathon } from "@/server/services/hackathons";
import { Hackathon } from "@/types/hackathons";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const hackathon = await getHackathon(id);

    return NextResponse.json(hackathon);
  } catch (error) {
    console.error("Error in GET /api/hackathons/[id]:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    let editedHackathon = (await req.json()) as Partial<Hackathon>;
    const errors = validateHackathon(editedHackathon);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    const existingHackathon = await db.select().from(hackathons).where(eq(hackathons.id, id));
    if (!existingHackathon.length) {
      return NextResponse.json({ error: "Hackathon not found." }, { status: 404 });
    }

    const updatedHackathon = await db
      .update(hackathons)
      .set(editedHackathon)
      .where(eq(hackathons.id, id))
      .returning();

    return NextResponse.json(updatedHackathon[0]);
  } catch (error) {
    console.error("Error in PUT /api/hackathons/[id]:", error);
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
  }
}
