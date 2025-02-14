import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";
import { eq, sql, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);
    const offset = (page - 1) * pageSize;

    const location = searchParams.get("location");
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    const filters = [];
    if (location) filters.push(eq(hackathons.location, location));
    if (date) filters.push(eq(hackathons.date, date));
    if (status) filters.push(eq(hackathons.status, status));

    const hackathonList = await db
    .select()
    .from(hackathons)
    .where(filters.length ? and(...filters) : undefined) 
    .limit(pageSize)
    .offset(offset);
    const totalHackathons = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(hackathons)
      .where(filters.length ? and(...filters) : undefined) ;

    return NextResponse.json({
      hackathons: hackathonList,
      total: totalHackathons[0]?.count ?? 0,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Error en GET /api/hackathons:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
