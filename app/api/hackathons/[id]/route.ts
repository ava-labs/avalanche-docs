import { HackathonsList } from "@/types/hackathons";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const hackathon = HackathonsList.find(hackathon => hackathon.id === id);
    return NextResponse.json(hackathon)

}
