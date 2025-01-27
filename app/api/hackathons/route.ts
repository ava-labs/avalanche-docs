import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

const hackathons: HackathonLite[] = Array.from({ length: 50 }, (_, index) => ({
    id: `hackathon-${index + 1}`,
    title: `Hackathon ${index + 1}`,
    description: `This is the description for Hackathon ${index + 1}.`,
    date: `2025-02-${(index % 28) + 1}T10:00:00Z`,
    type: index % 2 === 0 ? "Virtual" : "On-site",
    city: index % 2 === 0 ? "Online" : `City ${index + 1}`,
    total_prizes: 5000.00 + index * 100
}));


export async function GET(req: NextRequest) {

    const { searchParams } = req.nextUrl

    const page = searchParams.get('page') ?? "1";
    const pageSize = searchParams.get('pageSize') ?? "10";

    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(pageSize as string) || 10;


    const startIndex = (pageNumber - 1) * pageSizeNumber;
    const endIndex = startIndex + pageSizeNumber;

    const paginatedHackathons = hackathons.slice(startIndex, endIndex);


    return NextResponse.json({
        hackathons: paginatedHackathons,
        total: hackathons.length
    })


}