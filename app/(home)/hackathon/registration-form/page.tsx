"use client";

import { RegisterForm } from "@/components/hackathons/registration-form/registrationForm";
import { useState } from "react";
export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    console.log("algo")
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Formulario completado:", formData);
      // Enviar datos al servidor
    }
  };

  const handleSaveLater = () => {
    console.log("Progreso guardado:", formData);
    // Lógica para guardar en localStorage o backend
  };

  const handleStepChange = (newStep: number) => {
    setStep(newStep); // Actualiza step en RegisterPage cuando RegisterForm lo solicita
    console.log("Paso cambiado a:", newStep);
  };

  return (
    <main className='container relative max-w-[1400px] rounded-md border border-zinc-800 p-14  '>
      <RegisterForm step={step} onSubmit={handleSubmit} onSaveLater={handleSaveLater} onStepChange={handleStepChange}/>
    </main>
  );
}