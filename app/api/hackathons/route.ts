import {
  HackathonsList,
  HackathonLite,
  getHackathonLite,
  Hackathon,
} from "@/types/hackathons";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "10";

  const location = searchParams.get("location");
  const date = searchParams.get("date");
  const status = searchParams.get("status");

  const pageNumber = parseInt(page as string) || 1;
  const pageSizeNumber = parseInt(pageSize as string) || 10;

  const startIndex = (pageNumber - 1) * pageSizeNumber;
  const endIndex = startIndex + pageSizeNumber;

  const filteredHackathons = HackathonsList.filter((hackathon) => {
    let matched = true;
    if (location) {
      if (location === "InPerson") {
        matched &&= hackathon.location.toLowerCase() !== "online"; // Exclude "online"
      } else {
        matched &&= hackathon.location === location; // Regular filtering
      }
    }
    if (date) matched &&= hackathon.date === date;
    if (status) matched &&= hackathon.status == status;
    return matched;
  });

  const paginatedHackathons: Hackathon[] = filteredHackathons.slice(
    startIndex,
    endIndex
  );
  const hackathonsLite: HackathonLite[] =
    paginatedHackathons.map(getHackathonLite);

  const response = NextResponse.json({
    hackathons: hackathonsLite,
    total: filteredHackathons.length,
  });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
