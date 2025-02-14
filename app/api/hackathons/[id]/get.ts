import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;     
    const hackathon = await db
      .select()
      .from(hackathons)
      .where(eq(hackathons.id, id));

    if (!hackathon.length) {
      return NextResponse.json({ error: "Hackathon no encontrado" }, { status: 404 });
    }

    return NextResponse.json(hackathon[0]); // Retornar el hackathon encontrado
  } catch (error) {
    console.error("Error en GET /api/hackathons/[id]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
