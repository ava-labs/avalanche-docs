import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";
import { validateHackathon } from "@/services/hackathons";
import { Hackathon } from "@/types/hackathons";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params; // Obtener el ID de la URL
  
      // Obtener datos del request
      let editedHackathon  = (await req.json())as Partial<Hackathon>;
  
      // Validar datos antes de actualizar
      
      const errors = validateHackathon(editedHackathon);
      if (errors.length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
      }
  
      // Verificar si el Hackathon existe antes de actualizar
      const existingHackathon = await db.select().from(hackathons).where(eq(hackathons.id, id));
      if (!existingHackathon.length) {
        return NextResponse.json({ error: "hackaton not found." }, { status: 404 });
      }
  
      // Actualizar el hackathon en la base de datos
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
