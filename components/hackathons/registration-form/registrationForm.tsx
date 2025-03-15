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
import { RegistrationForm } from "@/types/registrationForm";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  company_name: z.string().optional(),
  role: z.string().optional(),
  city: z.string().min(1, "City is required"),
  interests: z.array(z.string()).min(1, "Interests are required"),
  web3_proficiency: z.string().min(1, "web3 proficiency is required"),
  tools: z.array(z.string()).min(1, "Tools are required"),
  roles: z.array(z.string()).min(1, "Roles are required"),
  languages: z.array(z.string()).min(1, "Languages are required"),
  hackathon_participation: z.string().min(1, "Hackathon participation is required"),
  dietary: z.string().optional().default(""),
  github_portfolio: z.string().optional().default(""),
  terms_event_conditions: z.boolean().refine((value) => value === true, {
    message: "You must accept the Event Terms and Conditions to continue.",
  }),
  newsletter_subscription: z.boolean().refine((value) => value === true, {
    message: "This field is required.",
  }),
  prohibited_items: z.boolean().refine((value) => value === true, {
    message: "You must agree not to bring prohibited items to continue.",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { data: session, status } = useSession();
  const currentUser: User | undefined = session?.user;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const cities = ["Bogota", "Medellin", "Valencia", "Londres", "Bilbao"];

  let hackathon_id = searchParams?.hackaId ?? "";
  let utm = searchParams?.utm ?? "";
  const [hackathon, setHackathon] = useState<HackathonHeader | null>(null);
  const [formLoaded, setRegistrationForm] = useState<RegistrationForm | null>(null);

  async function getHackathon() {
    if (!hackathon_id) return;

    try {
      const response = await axios.get(`/api/hackathons/${hackathon_id}`);
      setHackathon(response.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  async function getRegisterFormLoaded() {
    if (!hackathon_id || !currentUser?.email) return;

    try {
      const response = await axios.get(
        `/api/register-form?hackathonId=${hackathon_id}&email=${currentUser.email}`
      );
      const loadedData = response.data;
      
      if (loadedData) {
        // Función auxiliar para normalizar valores de arreglo
        const parseArrayField = (value: string | string[] | undefined): string[] => {
          if (!value) return [];
          if (Array.isArray(value)) return value; // Si ya es un arreglo, úsalo directamente
          if (typeof value === "string") {
            // Intenta parsear como JSON primero
            try {
              const parsed = JSON.parse(value);
              return Array.isArray(parsed) ? parsed : value.split(",");
            } catch {
              // Si no es JSON, asume que es una cadena separada por comas
              return value.split(",");
            }
          }
          return [];
        };
        
        form.reset({
          name: loadedData.name || currentUser.name || "",
          email: loadedData.email || currentUser.email || "",
          company_name: loadedData.company_name || "",
          role: loadedData.role || "",
          city: loadedData.city || "",
          dietary: loadedData.dietary || "",
          interests: parseArrayField(loadedData.interests),
          web3_proficiency: loadedData.web3_proficiency || "",
          tools: parseArrayField(loadedData.tools),
          roles: parseArrayField(loadedData.roles),
          languages: parseArrayField(loadedData.languages),
          hackathon_participation: loadedData.hackathon_participation || "",
          github_portfolio: loadedData.github_portfolio || "",
          terms_event_conditions: loadedData.terms_event_conditions || false,
          newsletter_subscription: loadedData.newsletter_subscription || false,
          prohibited_items: loadedData.prohibited_items || false,
        });
  
        setRegistrationForm(loadedData);
      }
      else {
        loadFormFromLocalStorage(); 
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  async function saveRegisterForm(data: RegisterFormValues) {
    try {
      console.info("saving data");
      const response = await axios.post(`/api/register-form/`, data);
      console.info("data saved", response);
    } catch (err) {
      console.info("dio error");
      console.error("API Error:", err);
    }
  }

  useEffect(() => {
    getHackathon();
    if (status === "authenticated" && currentUser) {
      getRegisterFormLoaded(); 
    }
  }, [hackathon_id,status, currentUser]);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      company_name: "",
      role: "",
      city: "",
      dietary: "",
      interests: [],
      web3_proficiency: "",
      tools: [],
      roles: [],
      languages: [],
      hackathon_participation: "",
      github_portfolio: "",
      terms_event_conditions: false,
      newsletter_subscription: false,
      prohibited_items: false,
    },
  });

  useEffect(() => {
    if (status === "authenticated" && currentUser) {
      form.reset({
        name: currentUser.name || "",
        email: currentUser.email || ''
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
      fieldsToValidate = [
        "name",
        "email",
        "company_name",
        "dietary",
        "role",
        "city",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "web3_proficiency",
        "tools",
        "roles",
        "languages",
        "interests",
        "hackathon_participation",
        "github_portfolio",
      ];
    } else if (step === 3) {
      fieldsToValidate = [
        "newsletter_subscription",
        "terms_event_conditions",
        "prohibited_items",
      ];
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
     
      setFormData((prevData) => ({ ...prevData, ...data }));
      const finalData = {
        ...data,
        hackathon_id: hackathon_id || "",
        utm: utm,
        interests: data.interests ?? [],
        languages: data.languages ?? [],
        roles: data.roles ?? [],
        tools: data.tools,
      };
      await saveRegisterForm(finalData);
      // Aquí puedes enviar los datos a la API
    }
  };

  const onSaveLater = () => {
    const finalData = {
      ...form.getValues(),
      hackathon_id: hackathon_id || "",
      utm: utm,
   
    };
    localStorage.setItem("formData", JSON.stringify(finalData));
    
  };
  const loadFormFromLocalStorage = () => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const dataJson:any = JSON.parse(savedData);
        const parsedData: RegisterFormValues = JSON.parse(savedData);
        utm = dataJson.utm;
        hackathon_id = dataJson.hackathon_id;
        form.reset(parsedData);
        console.log("Form loaded from localStorage:", parsedData);
      } catch (err) {
        console.error("Error parsing localStorage data:", err);
      }
    } else {
      console.log("No form data found in localStorage");
    }
  };
  return (
    <div className="w-full items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        {hackathon
          ? `${hackathon.title} (Step ${step}/3)`
          : `Builders Hub - Registration Page (Step ${step}/3)`}
      </h2>

      {/* Barra de progreso */}
      <div className="relative w-full h-1 bg-zinc-300 dark:bg-zinc-900 mb-4">
        <div
          className={`absolute h-full bg-zinc-800 dark:bg-zinc-300 ${progressPosition()} w-1/3 transition-all duration-300`}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <RegisterFormStep1 cities={cities} user={session?.user} />
          )}
          {step === 2 && <RegisterFormStep2 />}
          {step === 3 && <RegisterFormStep3 />}

          <Separator className="border-red-300 dark:border-red-300 mt-4" />

          <div className="mt-8 flex justify-between items-center">
            <div className="flex gap-x-4">
              {step === 3 && (
                <Button
                  variant="outline"
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-red-500 hover:bg-red-600"
                >
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
