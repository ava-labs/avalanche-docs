"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterFormStep3 } from "./RegisterFormStep3";
import { RegisterFormStep2 } from "./RegisterFormStep2";
import RegisterFormStep1 from "./RegisterFormStep1";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { HackathonHeader } from "@/types/hackathons";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  companyName: z.string().optional(),
  role: z.string().optional(),
  city: z.string().min(1, "City is required"),
  interests: z.array(z.string()).min(1, "Interests are required"),
  web3Proficiency: z.string(),
  tools: z.array(z.string()),
  roles: z.array(z.string()).optional(),
  languages: z.array(z.string()),
  hackathonParticipation: z.string(),
  dietary: z.string().optional(),
  githubPortfolio: z.string().url("Set a valid URL").optional(),
  termsEventConditions: z.boolean().refine((value) => value === true, {
    message: "You must accept the Event Terms and Conditions to continue.",
  }),
  newsletterSubscription: z.boolean().optional(),
  prohibitedItems: z.boolean().refine((value) => value === true, {
    message: "You must agree not to bring prohibited items to continue.",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { data: session, status } = useSession();
  const currentUser: User | undefined = session?.user;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const cities = ["Bogota", "Medellin", "Valencia", "Londres", "Bilbao"];
  const searchParams = useSearchParams();
  const hackathonId = searchParams.get("hackaId");
  const utm = searchParams.get("utm")??"";
  const [hackathon, setHackathon] = useState<HackathonHeader | null>(null);

  async function getHackathon() {
    if (!hackathonId) return;

    try {
      const response = await axios.get(`/api/hackathons/${hackathonId}`);
      setHackathon(response.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  async function saveRegisterForm(data: RegisterFormValues) {
    try {
      const response = await axios.post(`/api/register-form/`, data);

  
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  useEffect(() => {
    getHackathon();
  }, [hackathonId]);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      companyName: "",
      role: "",
      city: "",
      dietary:"",
      interests: [],
      web3Proficiency: "",
      tools: [],
      roles: [],
      languages: [],
      hackathonParticipation: "",
      githubPortfolio: "",
      termsEventConditions: false,
      newsletterSubscription: false,
      prohibitedItems: false,

    },
  });

  useEffect(() => {
    if (status === "authenticated" && currentUser) {
      form.reset({
        name: currentUser.name || "",
        email: currentUser.email || "",
        companyName: "",
        role: "",
        city: "",
      });
    }
  }, [status, currentUser, form]);

  const progressPosition = () => {
    switch (step) {
      case 1:
        return "left-0";
      case 2:
        return "left-1/2 transform -translate-x-1/2";
      case 3:
        return "right-0";
      default:
        return "left-0";
    }
  };

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 3) {
      setStep(newStep);
    }
  };

  const onNextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormValues)[] = [];
  
    if (step === 1) {
    

      fieldsToValidate = ["name", "email", "companyName", "dietary","role","city"];
    } else if (step === 2) {
      fieldsToValidate = ["web3Proficiency", "tools", "roles", "languages","interests","hackathonParticipation","githubPortfolio"];
    } else if (step === 3) {
      fieldsToValidate = ["newsletterSubscription", "termsEventConditions", "prohibitedItems"];
    }
  
    const isValid = await form.trigger(fieldsToValidate); 
  
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const onSubmit =async (data: RegisterFormValues) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.info("ya ya ")
      setFormData((prevData) => ({ ...prevData, ...data }));
         const finalData = {
      ...data,
      hackathonId: hackathonId || "",
      utm: utm,
      interests: data.interests ??[],
      languages: data.languages ??[],
      roles: data.roles ??[] ,
      tools: data.tools,
    };
    await saveRegisterForm(finalData);
      // Aquí puedes enviar los datos a la API
    }
  };

  const onSaveLater = () => {
    console.log("Saving data for later:", form.getValues());
    localStorage.setItem("formData", JSON.stringify(form.getValues()));
  };

  return (
    <div className="w-full items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        {hackathon ? `${hackathon.title} (Step ${step}/3)` : `Builders Hub - Registration Page (Step ${step}/3)`}
      </h2>

      {/* Barra de progreso */}
      <div className="relative w-full h-1 bg-zinc-300 dark:bg-zinc-900 mb-4">
        <div
          className={`absolute h-full bg-zinc-800 dark:bg-zinc-300 ${progressPosition()} w-1/3 transition-all duration-300`}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && <RegisterFormStep1 cities={cities} user={session?.user} />}
          {step === 2 && <RegisterFormStep2 />}
          {step === 3 && <RegisterFormStep3 />}

          <Separator className="border-red-300 dark:border-red-300 mt-4" />

          <div className="mt-8 flex justify-between items-center">
            <div className="flex gap-x-4">
              {step === 3 && (
                <Button variant="outline" type="submit" className="bg-red-500 hover:bg-red-600">
                  Save & Exit
                </Button>
              )}

              {step !== 3 && (
                <Button
                  variant="outline"
                  type="submit"
                  onClick={onNextStep}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Continue
                </Button>
              )}

              {step !== 3 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSaveLater}
                  className="bg-white text-black border border-gray-300 hover:text-black hover:bg-gray-100"
                >
                  Save & Continue Later
                </Button>
              )}
            </div>

            {/* Paginación */}
            <div className="flex items-center space-x-1">
              {step > 1 && (
                <PaginationPrevious
                  className="dark:hover:text-gray-200 cursor-pointer"
                  onClick={() => setStep(step - 1)}
                />
              )}
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={step === page}
                        className="cursor-pointer"
                        onClick={() => handleStepChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
              {step < 3 && (
                <PaginationNext
                  className="dark:hover:text-gray-200 cursor-pointer"
                  onClick={form.handleSubmit(onSubmit)}
                />
              )}
              <span className="font-Aeonik text-sm">Step {step} of 3</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
