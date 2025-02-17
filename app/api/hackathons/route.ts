import { NextRequest, NextResponse } from "next/server";
import { createHackathon, getFilteredHackathons, GetHackathonsOptions } from "@/server/services/hackathons";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    };
    const response = await getFilteredHackathons(options);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error GET /api/hackathons:", error);
    const wrappedError = error as Error;
    return NextResponse.json(
      { error: wrappedError.message },
      { status: wrappedError.cause == "BadRequest" ? 400 : 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newHackathon = await createHackathon(body);

    return NextResponse.json(
      { message: "Hackathon created", hackathon: newHackathon },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error POST /api/hackathons:", error);
    const wrappedError = error as Error;
    return NextResponse.json(
      { error: wrappedError.message },
      { status: wrappedError.cause == "BadRequest" ? 400 : 500 }
    );
  }
}
