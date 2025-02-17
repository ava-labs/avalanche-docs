import { Hackathon, HackathonActivity, HackathonLite, Partner, Track, TrackPrize } from "@/types/hackathons";
import { hasAtLeastOne, requiredField, validateEntity, Validation } from "./base";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const hackathonsValidations: Validation[] = [
    { field: "title", message: "Please provide a title for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "title") },
    { field: "description", message: "A description is required.", validation: (hackathon: Hackathon) => requiredField(hackathon, "description") },
    { field: "date", message: "Please enter a valid date for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "date") },
    { field: "location", message: "Please specify the location of the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "location") },
    { field: "tags", message: "Please add at least one category or tag.", validation: (hackathon: Hackathon) => hasAtLeastOne(hackathon, "tags") }
];

export const validateHackathon = (hackathon: Partial<Hackathon>) => validateEntity(hackathonsValidations, hackathon);


function convertHackathonToDB(hackathon: Partial<Hackathon>) {
    return {
        ...hackathon,
        address: hackathon.address ?? "",
        registration_deadline: hackathon.registration_deadline ?? new Date(),
        total_prizes: hackathon.total_prizes ?? 0,
        title: hackathon.title ?? "",
        description: hackathon.description ?? "",
        date: hackathon.date ?? new Date(),
        location: hackathon.location ?? "",
        tags: hackathon.tags ?? [],
        status: hackathon.status ?? "draft",
        agenda: hackathon.agenda ? JSON.stringify(hackathon.agenda) : JSON.stringify([]),
        partners: hackathon.partners ? JSON.stringify(hackathon.partners) : JSON.stringify([]),
        tracks: hackathon.tracks ? JSON.stringify(hackathon.tracks) : JSON.stringify([]),
    };
}

function convertDBToHackathon(hackathon: any): Hackathon {
    console.log(hackathon.agenda)
    console.log(hackathon.partners)
    console.log(hackathon.tracks)
    return {
        ...hackathon,
        agenda: hackathon.agenda && hackathon.agenda.toString() != "[]" ? JSON.parse(hackathon.agenda.toString()) as HackathonActivity[] : [],
        partners: hackathon.partners && hackathon.partners.toString() !== "[]" ? JSON.parse(hackathon.partners.toString()) as Partner[] : [],
        tracks: hackathon.tracks && hackathon.tracks.toString() != "[]" ? JSON.parse(hackathon.tracks.toString()) as Track[] : [],
    };
}


export function getHackathonLite(hackathon: any): HackathonLite {
    const { ...hackathonLite } = hackathon;
    return hackathonLite;
}

export interface GetHackathonsOptions {
    page?: number;
    pageSize?: number;
    location?: string | null;
    date?: string | null;
    status?: string | null;
    search?: string;
}

export async function getHackathon(id: string) {
    const hackathon = await prisma.hackathon.findUnique({
        where: { id },
    });

    if (!hackathon)
        throw new Error("Hackathon not found", { cause: "BadRequest" });

    return convertDBToHackathon(hackathon);
}

export async function getFilteredHackathons(options: GetHackathonsOptions) {

    if (options.page && options.page < 1 || options.pageSize && options.pageSize < 1)
        throw new Error("Pagination params invalid", { cause: "BadRequest" });

    console.log('GET hackathons with options:', options);
    const page = options.page ?? 1;
    const pageSize = options.pageSize ?? 10;
    const offset = (page - 1) * pageSize;

    const filters: any = {};
    if (options.location) filters.location = options.location;
    if (options.date) filters.date = options.date;
    if (options.status) filters.status = options.status;

    const hackathonList = await prisma.hackathon.findMany({
        where: filters,
        skip: offset,
        take: pageSize,
    });

    const hackathonsLite = hackathonList.map(getHackathonLite);
    const totalHackathons = await prisma.hackathon.count({
        where: filters,
    });

    return {
        hackathons: hackathonsLite,
        total: totalHackathons,
        page,
        pageSize,
    };
}


export async function createHackathon(hackathonData: Partial<Hackathon>): Promise<Hackathon> {
    const errors = validateHackathon(hackathonData);
    if (errors.length > 0) {
        throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    const newHackathonData = convertHackathonToDB(hackathonData);

    const newHackathon = await prisma.hackathon.create({
        data: newHackathonData,
    });

    return convertDBToHackathon(newHackathon);
}


export async function updateHackathon(id: string, partialEditedHackathon: Partial<Hackathon>): Promise<Hackathon> {
    const errors = validateHackathon(partialEditedHackathon);
    if (errors.length > 0) {
        throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    const existingHackathon = await prisma.hackathon.findUnique({
        where: { id },
    });
    if (!existingHackathon) {
        throw new Error("Hackathon not found");
    }

    const editedHackathon = convertHackathonToDB(partialEditedHackathon);

    const updatedHackathon = await prisma.hackathon.update({
        where: { id },
        data: editedHackathon,
    });

    return convertDBToHackathon(updatedHackathon);
}