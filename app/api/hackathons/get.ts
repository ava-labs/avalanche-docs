import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db/db";
import { hackathons } from "@/drizzle/schema/schema";
import { eq, sql, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

    if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
      return NextResponse.json(
        { error: "Pagination params invalid" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * pageSize;

    const location = searchParams.get("location");
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    const filters = [];
    if (location) filters.push(eq(hackathons.location, location));
    if (date) filters.push(eq(hackathons.date, date));
    if (status) filters.push(eq(hackathons.status, status));

    const whereCondition = filters.length ? and(...filters) : undefined;

    const hackathonList = await db
      .select()
      .from(hackathons)
      .where(whereCondition)
      .limit(pageSize)
      .offset(offset);
    const totalResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(hackathons)
      .where(whereCondition);

    const totalHackathons = totalResult[0]?.count ?? 0;

    return NextResponse.json({
      hackathons: hackathonList,
      total: totalHackathons,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Error in GET /api/hackathons:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
