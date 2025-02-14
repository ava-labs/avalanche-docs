import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      date,
      location,
      total_prizes,
      tags,
      status,
      registration_deadline,
      address,
      agenda,
      partners,
      tracks,
    } = body;

    // Validación de campos obligatorios
    if (!title || !description || !date || !location || !status || !registration_deadline) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Insertar en la BD
    const newHackathon = await db
      .insert(hackathons)
      .values({
        title,
        description,
        date,
        location,
        total_prizes,
        tags,
        status,
        registration_deadline,
        address,
        agenda,
        partners,
        tracks,
      })
      .returning();

    return NextResponse.json(
      { message: "Hackathon creado", hackathon: newHackathon[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/hackathons:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
