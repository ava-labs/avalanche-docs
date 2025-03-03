import { Hackathon, HackathonLite, HackathonStatus } from "@/types/hackathons";
import { hasAtLeastOne, requiredField, validateEntity, Validation } from "./base";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const hackathonsValidations: Validation[] = [
    { field: "title", message: "Please provide a title for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "title") },
    { field: "description", message: "A description is required.", validation: (hackathon: Hackathon) => requiredField(hackathon, "description") },
    { field: "start_date", message: "Please enter a valid date for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "start_date") },
    { field: "end_date", message: "Please enter a valid end date for the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "end_date") },
    { field: "location", message: "Please specify the location of the hackathon.", validation: (hackathon: Hackathon) => requiredField(hackathon, "location") },
    { field: "tags", message: "Please add at least one category or tag.", validation: (hackathon: Hackathon) => hasAtLeastOne(hackathon, "tags") }
];

export const validateHackathon = (hackathon: Partial<Hackathon>): Validation[] => validateEntity(hackathonsValidations, hackathon);

class ValidationError extends Error {
    public details: Validation[];
    public cause: string;

    constructor(message: string, details: Validation[]) {
        super(message);
        this.cause = "ValidationError";
        this.details = details;
    }
}





export function getHackathonLite(hackathon: any): HackathonLite {
    delete hackathon.content
    return hackathon;
}

export interface GetHackathonsOptions {
    page?: number;
    pageSize?: number;
    location?: string | null;
    date?: string | null;
    status?: HackathonStatus | null;
    search?: string;
}

export async function getHackathon(id: string) {

    const hackathon = await prisma.hackathon.findUnique({
        where: { id },
    });
    console.log('Imprimiendo')
    if (!hackathon)
        throw new Error("Hackathon not found", { cause: "BadRequest" });

    return hackathon;
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
    if (options.search) filters.title = { contains: options.search, mode: "insensitive" };

    const hackathonList = await prisma.hackathon.findMany({
        where: filters,
        skip: offset,
        take: pageSize,
    });

    const hackathons = hackathonList.map(getHackathonLite);
    let hackathonsLite = hackathons

    if (options.status) {
        switch (options.status) {
            case "UPCOMING":
                hackathonsLite = hackathons.filter(hackathon => hackathon.start_date.getTime() > Date.now());
                break;
            case "ONGOING":
                hackathonsLite = hackathons.filter(hackathon => hackathon.start_date.getTime() <= Date.now() && hackathon.end_date.getTime() >= Date.now());
                break;
            case "ENDED":
                hackathonsLite = hackathons.filter(hackathon => hackathon.end_date.getTime() < Date.now());
                break;
        }
    }

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
    console.log(errors)
    if (errors.length > 0) {
        throw new ValidationError("Validation failed", errors);
    }

    const content = hackathonData as Prisma.JsonObject;
    const newHackathon = await prisma.hackathon.create({
        data: {
            id: hackathonData.id,
            title: hackathonData.title!,
            description: hackathonData.description!,
            start_date: hackathonData.start_date!,
            end_date: hackathonData.end_date!,
            location: hackathonData.location!,
            total_prizes: hackathonData.total_prizes!,
            tags: hackathonData.tags!,
            timezone: hackathonData.timezone!,
            content: content

        },
    });

    hackathonData.id = newHackathon.id;
    return hackathonData as Hackathon;
}


export async function updateHackathon(id: string, hackathonData: Partial<Hackathon>): Promise<Hackathon> {
    const errors = validateHackathon(hackathonData);
    if (errors.length > 0) {
        throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    const existingHackathon = await prisma.hackathon.findUnique({
        where: { id },
    });
    if (!existingHackathon) {
        throw new Error("Hackathon not found");
    }

    const content = hackathonData as Prisma.JsonObject;
    await prisma.hackathon.update({
        where: { id },
        data: {
            id: hackathonData.id,
            title: hackathonData.title!,
            description: hackathonData.description!,
            start_date: hackathonData.start_date!,
            end_date: hackathonData.end_date!,
            location: hackathonData.location!,
            total_prizes: hackathonData.total_prizes!,
            tags: hackathonData.tags!,
            timezone: hackathonData.timezone!,
            content: content

        },
    });

    return hackathonData as Hackathon;
}