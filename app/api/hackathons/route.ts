import { getFilteredHackathons } from '@/server/controllers/hackathons';
import {
  getHackathonLite,
  HackathonsList,
  validateHackathon,
} from '@/server/services/hackathons';
import { Hackathon } from '@/types/hackathons';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = parseInt(searchParams.get('page') ?? '1');
  const pageSize = parseInt(searchParams.get('pageSize') ?? '10');
  const location = searchParams.get('location');
  const date = searchParams.get('date');
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase() || '';

  const { hackathons, total } = getFilteredHackathons({
    page,
    pageSize,
    location,
    date,
    status,
    search,
  });

  const response = NextResponse.json({
    hackathons,
    total,
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function POST(req: Request) {
  try {
    const newHackathon = (await req.json()) as Partial<Hackathon>;

    const errors = validateHackathon(newHackathon);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newId =
      (HackathonsList.length > 0
        ? HackathonsList.reduce(
            (max, item) => Math.max(max, Number(item.id)),
            -Infinity
          )
        : 0) + 1;

    newHackathon.id = String(newId);
    HackathonsList.push(newHackathon as Hackathon);

    return NextResponse.json(newHackathon, { status: 201 });
  } catch (error) {
    console.error('Error in POST /hackathons:', error);
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 }
    );
  }
}
