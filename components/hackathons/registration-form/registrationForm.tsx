"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RegisterFormStep1 from "./registerFormStep1";
import { RegisterFormStep2 } from "./registrationFormStep2";
import { cn } from "@/utils/cn";
import { RegisterFormStep3 } from "./registration-form-step-3";


export const registerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo electrónico inválido"),
  companyName: z.string().optional(),
  role: z.string().optional(),
  city: z.string().min(1, "La ciudad es requerida"),
  interests: z.array(z.string()), // Cambiado a array de strings
  web3Proficiency: z.string(),
  tools: z.array(z.string()), // Cambiado a array de strings
  roles: z.array(z.string()).optional(),
  languages: z.array(z.string()), // Cambiado a array de strings
  hackathonParticipation: z.string(),
  githubPortfolio: z.string().url("Ingresa un enlace válido de GitHub o Portfolio").optional(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe incluir una letra mayúscula")
    .regex(/[0-9]/, "Debe incluir un número")
    .regex(/[^A-Za-z0-9]/, "Debe incluir un símbolo"),
  confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  termsEventConditions: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar los Términos y Condiciones del Evento para continuar.",
  }),
  newsletterSubscription: z.boolean().optional(),
  prohibitedItems: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar no traer items prohibidos para continuar.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],

});


export type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({
  step = 1,
  onSubmit,
  onSaveLater,
  onStepChange,
}: {
  step: number;
  onSubmit: (data: RegisterFormValues) => void; // Corregido para usar RegisterFormValues
  onSaveLater: () => void;
  onStepChange: (newStep: number) => void;
}) {
  const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao"];

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

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      role: "",
      city: "",
      password: "",
      confirmPassword: "",
      
    },
  });

  const onSubmitHandler = (data: RegisterFormValues) => {
    onSubmit(data);
  };

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 3) {
      onStepChange(newStep)
    }
  };

  const handleNextClick = () => {
    if (step < 3) {
      onStepChange(step + 1); // Notifica al padre para avanzar al siguiente paso
      console.log("Avanzando al siguiente paso solicitado:", step + 1);
    }
    form.handleSubmit(onSubmitHandler)(); // Esto disparará handleSubmit en RegisterPage
  };
  const handlePreviousClick=()=>{
    if (step > 1) {
      onStepChange(step - 1); // Notifica al padre para avanzar al siguiente paso
      
    }
  }
  return (
    <div className="w-full items-center justify-center ">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Builders Hub - Registration Page (Step {step}/3)
      </h2>
      {/* Barra de progreso (línea blanca) */}
      <div className="relative w-full h-1 bg-white dark:bg-zinc-800 mb-4">
        <div
          className={`absolute h-full bg-zinc-800  dark:bg-white ${progressPosition()} w-1/3 transition-all duration-300`}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-6"
        >
          {step === 1 && <RegisterFormStep1 cities={cities} />}
          {step === 2 && <RegisterFormStep2 />}
          {step === 3 && <RegisterFormStep3 />}

          <div className="flex-1 bg-zinc-800 px-4 gap-[10px]">
            <Separator />
          </div>

          <div className=" mt-8 gap-[10px] pt-8  flex justify-between items-center pl-0 border-gray-800">
            <div className="flex gap-x-4">
              <Button
                variant="outline"
                type="submit"
                className={cn(
                  step === 3 ? "block" : "hidden",
                  "bg-red-500 hover:bg-red-600"
                )}
              >
                Save & Exit
              </Button>
              <Button
                variant="outline"
                type="submit"
                className={cn(
                  step != 3 ? "block" : "hidden",
                  "bg-red-500 hover:bg-red-600"
                )}
              >
                Continue
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onSaveLater}
                className={cn(
                  step != 3 ? "block" : "hidden",
                  "bg-white text-black border border-gray-300 hover:text-black hover:bg-gray-100"
                )}
              >
                Save & Continue Later
              </Button>
            </div>
            <div className="flex items-center space-x-1 text-white">
              <PaginationPrevious
                className={cn(
                  step > 1 ? "flex" : "hidden",
                  "text-white hover:text-gray-200"
                )}
                onClick={handlePreviousClick}
                hidden={step < 2}
              />
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={step === page}
                        onClick={() => handleStepChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
              <PaginationNext
                className={cn(
                  step < 3 ? "flex" : "hidden",
                  "text-white hover:text-gray-200"
                )}
                onClick={handleNextClick}
                hidden={step == 3}
              />
              <span className=" font-Aeonik font-normal text-sm leading-[16.8px] tracking-normal w-full">
                Step {step} of 3
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}