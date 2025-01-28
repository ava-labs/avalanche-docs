import { HackathonsList, HackathonLite, getHackathonLite, Hackathon } from "@/types/hackathons";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const { searchParams } = req.nextUrl

    const page = searchParams.get('page') ?? "1";
    const pageSize = searchParams.get('pageSize') ?? "10";

    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const status = searchParams.get('status');

    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(pageSize as string) || 10;


    const startIndex = (pageNumber - 1) * pageSizeNumber;
    const endIndex = startIndex + pageSizeNumber;

    const filetredHackathons = HackathonsList.filter(hackathon => {
        let mateched = true;
        if (location)
            mateched &&= hackathon.location === location;
        if (date)
            mateched &&= hackathon.date === date;
        if (status)
            mateched &&= hackathon.status == status;
        return mateched;
    });
    const paginatedHackathons : Hackathon[] = filetredHackathons.slice(startIndex, endIndex);

    const hackathonsLite: HackathonLite[] = paginatedHackathons.map(getHackathonLite);


    return NextResponse.json({
        hackathons: hackathonsLite,
        total: filetredHackathons.length
    })


}
