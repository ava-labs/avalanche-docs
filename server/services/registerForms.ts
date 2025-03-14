
import { hasAtLeastOne, requiredField, validateEntity, Validation } from './base';
import { revalidatePath } from 'next/cache';
import { ValidationError } from './hackathons';
import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { RegistrationForm } from '@/types/registrationForm';


export const registerValidations: Validation[] = [
    // { field: 'title', message: 'Please provide a title for the hackathon.', validation: (hackathon: RegisterForm) => requiredField(hackathon, 'title') },
    // { field: 'description', message: 'A description is required.', validation: (hackathon: RegisterForm) => requiredField(hackathon, 'description') },
    // { field: 'start_date', message: 'Please enter a valid date for the hackathon.', validation: (hackathon: RegisterForm) => requiredField(hackathon, 'start_date') },
    // { field: 'end_date', message: 'Please enter a valid end date for the hackathon.', validation: (hackathon: RegisterForm) => requiredField(hackathon, 'end_date') },
    // { field: 'location', message: 'Please specify the location of the hackathon.', validation: (hackathon: RegisterForm) => requiredField(hackathon, 'location') },
    // { field: 'tags', message: 'Please add at least one category or tag.', validation: (hackathon: RegisterForm) => hasAtLeastOne(hackathon, 'tags') }
];

export const validateRegisterForm = (registerData: Partial<RegistrationForm>): Validation[] => validateEntity(registerValidations, registerData);
export async function createRegisterForm(registerData: Partial<RegistrationForm>): Promise<RegistrationForm> {
    const errors = validateRegisterForm(registerData);
    console.error(errors)
    if (errors.length > 0) {
        throw new ValidationError('Validation failed', errors)
    }

    const content = { ...registerData } as Prisma.JsonObject

    console.log("content",content)
    const newRegisterFormData = await prisma.registerForm.upsert({
      where: {
          hackathon_id_email: {
              hackathon_id: registerData.hackathon_id as string,
              email: registerData.email as string,
          },
      },
      update: {
          utm: registerData.utm ?? "",
          city: registerData.city ?? "",
          company_name: registerData.company_name ?? null,
          dietary: registerData.dietary ?? null,
          hackathon_participation: registerData.hackathon_participation ?? "",
          interests: (registerData.interests ?? []).join(','),
          languages: (registerData.languages ?? []).join(','),
          roles: (registerData.roles ?? []).join(','),
          name: registerData.name ?? "",
          newsletter_subscription: registerData.newsletter_subscription ?? false,
          prohibited_items: registerData.prohibited_items ?? false,
          role: registerData.role ?? "",
          terms_event_conditions: registerData.terms_event_conditions ?? false,
          tools: (registerData.tools ?? []).join(','),
          web3_proficiency: registerData.web3_proficiency ?? "",
      },
      create: {
          hackathon: {
              connect: { id: registerData.hackathon_id },
          },
          user: {
              connect: { email: registerData.email },
          },
          utm: registerData.utm ?? "",
          city: registerData.city ?? "",
          company_name: registerData.company_name ?? null,
          dietary: registerData.dietary ?? null,
          hackathon_participation: registerData.hackathon_participation ?? "",
          interests: (registerData.interests ?? []).join(','),
          languages: (registerData.languages ?? []).join(','),
          roles: (registerData.roles ?? []).join(','),
          name: registerData.name ?? "",
          newsletter_subscription: registerData.newsletter_subscription ?? false,
          prohibited_items: registerData.prohibited_items ?? false,
          role: registerData.role ?? "",
          terms_event_conditions: registerData.terms_event_conditions ?? false,
          tools: (registerData.tools ?? []).join(','),
          web3_proficiency: registerData.web3_proficiency ?? "",
      },
  });
     registerData.id= newRegisterFormData.id;
    revalidatePath('/api/register-form/')
    return newRegisterFormData as unknown as RegistrationForm;
    
}


export async function getRegisterForm(email:string,hackathon_id:string) {

  const registeredData = await prisma.registerForm.findFirst({
    where: {
        user: {
            email: email,
        },
        hackathon_id: hackathon_id,
    },
});

return registeredData || null;
}