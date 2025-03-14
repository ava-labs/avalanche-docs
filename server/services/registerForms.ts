import { RegisterForm } from "@/types/registerForm";
import { hasAtLeastOne, requiredField, validateEntity, Validation } from "./base";
import { revalidatePath } from "next/cache";
import { ValidationError } from "./hackathons";
import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/prisma/prisma";


export const registerValidations: Validation[] = [
    { field: "title", message: "Please provide a title for the hackathon.", validation: (hackathon: RegisterForm) => requiredField(hackathon, "title") },
    { field: "description", message: "A description is required.", validation: (hackathon: RegisterForm) => requiredField(hackathon, "description") },
    { field: "start_date", message: "Please enter a valid date for the hackathon.", validation: (hackathon: RegisterForm) => requiredField(hackathon, "start_date") },
    { field: "end_date", message: "Please enter a valid end date for the hackathon.", validation: (hackathon: RegisterForm) => requiredField(hackathon, "end_date") },
    { field: "location", message: "Please specify the location of the hackathon.", validation: (hackathon: RegisterForm) => requiredField(hackathon, "location") },
    { field: "tags", message: "Please add at least one category or tag.", validation: (hackathon: RegisterForm) => hasAtLeastOne(hackathon, "tags") }
];

export const validateRegisterForm = (registerData: Partial<RegisterForm>): Validation[] => validateEntity(registerValidations, registerData);
export async function createRegisterForm(registerData: Partial<RegisterForm>): Promise<RegisterForm> {
    const errors = validateRegisterForm(registerData);
    console.log(errors)
    if (errors.length > 0) {
        throw new ValidationError("Validation failed", errors)
    }

    const content = { ...registerData } as Prisma.JsonObject
    // const prisma = new PrismaClient();
    const registerFormData = await prisma.registerForm.create({
      data: {
        hackathon: {
          connect: { id: "some-hackathon-id" }, // Conectar con un Hackathon existente
        },
        user: {
            connect: { email: "user@example.com" }, // Conectar usuario existente
          },
        utm: "some-utm",
        city: "Bogota",
        companyName: "My Company",
        dietary: "Vegetarian",
        hackathonParticipation: "Yes",
        interests: ["AI", "Blockchain"].join(","),
        languages: ["JavaScript", "Python"].join(","),
        roles: ["Developer"].join(","),
        name: "John Doe",
        newsletterSubscription: true,
        prohibitedItems: false,
        role: "Frontend Developer",
        termsEventConditions: true,
        tools: ["React", "Next.js"].join(","),
        web3Proficiency: "Intermediate",
      }
    });
      

    // const newHackathon = await prisma.hackathon.create({
    //     data: {
    //         id: hackathonData.id,
    //         title: hackathonData.title!,
    //         description: hackathonData.description!,
    //         start_date: hackathonData.start_date!,
    //         end_date: hackathonData.end_date!,
    //         location: hackathonData.location!,
    //         total_prizes: hackathonData.total_prizes!,
    //         tags: hackathonData.tags!,
    //         timezone: hackathonData.timezone!,
    //         icon: hackathonData.icon!,
    //         banner: hackathonData.banner!,
    //         small_banner: hackathonData.small_banner!,
    //         content: content
    //     },
    // });
     registerData.id= registerFormData.id;
    revalidatePath('/api/hackathons/')
    // return hackathonData as HackathonHeader;
    throw new Error("Not implemented");
}
