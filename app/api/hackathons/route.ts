import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";
import { getFilteredHackathons, GetHackathonsOptions } from "@/server/services/hackathons";


export async function GET(req: NextRequest) {
  try {


    const searchParams = req.nextUrl.searchParams;
    const options: GetHackathonsOptions = {
      page: Number(searchParams.get("page") || 1),
      pageSize: Number(searchParams.get("pageSize") || 10),
      location: searchParams.get("location") || undefined,
      date: searchParams.get("date") || undefined,
      status: searchParams.get("status") || undefined,
      search: searchParams.get("search") || undefined,
    }
    const response = await getFilteredHackathons(options);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in GET /api/hackathons:", error);
    const wrappedError = error as Error
    return NextResponse.json(
      { error: wrappedError.message },
      { status: wrappedError.cause == "BadRequest" ? 400 : 500 }
    );
  }
}




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


    if (!title || !description || !date || !location || !status || !registration_deadline) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }


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
