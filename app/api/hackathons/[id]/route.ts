import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";
import { validateHackathon } from "@/services/hackathons";
import { Hackathon } from "@/types/hackathons";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;     
    const hackathon = await db
      .select()
      .from(hackathons)
      .where(eq(hackathons.id, id));

    if (!hackathon.length) {
      return NextResponse.json({ error: "Hackathon not found" }, { status: 404 });
    }

    return NextResponse.json(hackathon[0]); 
  } catch (error) {
    console.error("Error in GET /api/hackathons/[id]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params; 
      let editedHackathon  = (await req.json())as Partial<Hackathon>;      
      const errors = validateHackathon(editedHackathon);
      if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
      }
      const existingHackathon = await db.select().from(hackathons).where(eq(hackathons.id, id));
      if (!existingHackathon.length) {
        return NextResponse.json({ error: "hackaton not found." }, { status: 404 });
      }
  
      const updatedHackathon = await db
        .update(hackathons)
        .set(editedHackathon)
        .where(eq(hackathons.id, id))
        .returning();
  
      return NextResponse.json(updatedHackathon[0]); // Devolver el hackathon actualizado
    } catch (error) {
      console.error("Error in PUT /api/hackathons/[id]:", error);
      return NextResponse.json({ error: `Internal Server Error : ${error}` }, { status: 500 });
    }
  }
