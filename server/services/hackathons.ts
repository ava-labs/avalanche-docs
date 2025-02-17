import { Hackathon, HackathonActivity, HackathonLite, Partner, Track, TrackPrize } from "@/types/hackathons";
import { hasAtLeastOne, requiredField, validateEntity, Validation } from "./base";
import { Prisma, PrismaClient } from "@prisma/client";
import { JsonArray, JsonValue } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();


export const hackathonsValidations: Validation[] = [
    { field: "title", message: "Please provide a title for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "title") },
    { field: "description", message: "A description is required.", validation: (hackathon: Hackathon) => requiredField(hackathon, "description") },
    { field: "date", message: "Please enter a valid date for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "date") },
    { field: "location", message: "Please specify the location of the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "location") },
    { field: "tags", message: "Please add at least one category or tag.", validation: (hackathon: Hackathon) => hasAtLeastOne(hackathon, "tags") }
];

export const validateHackathon = (hackathon: Partial<Hackathon>) => validateEntity(hackathonsValidations, hackathon);




function convertDBToHackathon(hackathon: any): Hackathon {
    console.log(hackathon.agenda)
    console.log(hackathon.partners)
    console.log(hackathon.tracks)

    return {
        ...hackathon,
        agenda: JSON.parse(hackathon.agenda),
        partners: JSON.parse(hackathon.partners),
        tracks: JSON.parse(hackathon.tracks),
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

    console.log(hackathon)
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
    if (options.search) filters.title = { contains: options.search, mode: "insensitive" };

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


    const newHackathon = await prisma.hackathon.create({
        data: {
            ...hackathonData,
            address: hackathonData.address ?? "",
            registration_deadline: hackathonData.registration_deadline ?? new Date(),
            total_prizes: hackathonData.total_prizes ?? 0,
            title: hackathonData.title ?? "",
            description: hackathonData.description ?? "",
            date: hackathonData.date ?? new Date(),
            location: hackathonData.location ?? "",
            tags: hackathonData.tags ?? [],
            status: hackathonData.status ?? "draft",
            agenda: hackathonData.agenda!,
            partners: hackathonData.partners!,
            tracks: hackathonData.tracks!,

        },
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


    const updatedHackathon = await prisma.hackathon.update({
        where: { id },
        data: {
            ...partialEditedHackathon,
            address: partialEditedHackathon.address ?? "",
            registration_deadline: partialEditedHackathon.registration_deadline ?? new Date(),
            total_prizes: partialEditedHackathon.total_prizes ?? 0,
            title: partialEditedHackathon.title ?? "",
            description: partialEditedHackathon.description ?? "",
            date: partialEditedHackathon.date ?? new Date(),
            location: partialEditedHackathon.location ?? "",
            tags: partialEditedHackathon.tags ?? [],
            status: partialEditedHackathon.status ?? "draft",
            agenda: partialEditedHackathon.agenda!,
            partners: partialEditedHackathon.partners!,
            tracks: partialEditedHackathon.tracks!,

        },
    });

    return convertDBToHackathon(updatedHackathon);
}