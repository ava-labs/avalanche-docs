"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validación para el código OTP
const verifySchema = z.object({
  code: z.string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d+$/, "El código debe contener solo números"),
});

export function VerifyEmail({ email, onBack }: { email: string; onBack: () => void }) {
  const [message, setMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const formMethods = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendCooldown]);

  const handleVerify = async (values: z.infer<typeof verifySchema>) => {
    setIsVerifying(true);
    setMessage(null);

    const result = await signIn("credentials", {
      email,
      otp: values.code,
      redirect: true,
      callbackUrl: "/",
    });

    setIsVerifying(false);

    if (result?.error) {
      setMessage("¡Ups! Ese código es incorrecto. Intenta de nuevo.");
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setMessage(null);

    try {
      const result = await signIn("credentials", { email, redirect: false });

      if (result?.error?.includes("OTP enviado")) {
        setMessage("Código reenviado. Revisa tu correo.");
        setResendCooldown(30);
      } else {
        setMessage("Error al reenviar el código. Intenta de nuevo.");
      }
    } catch (error) {
      setMessage("Error al reenviar el código. Intenta de nuevo.");
      console.error("Error al reenviar:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Verifica tu correo</h1>
        <p className="text-muted-foreground text-center mb-6">
          Ingresa el código de 6 dígitos que enviamos a <strong>{email}</strong>. Expira en 3 minutos.
        </p>

        <Form {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleVerify)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de 6 dígitos</Label>
              <Input
                id="code"
                type="text"
                placeholder="------"
                maxLength={6}
                {...formMethods.register("code")}
                className="w-full text-center text-lg font-mono"
              />
              {formMethods.formState.errors.code && (
                <p className="text-destructive text-sm">
                  {formMethods.formState.errors.code.message}
                </p>
              )}
            </div>

            {message && (
              <p className={message.includes("Error") || message.includes("incorrecto") ? 
                  "text-destructive text-center" : 
                  "text-success text-center"}
              >
                {message}
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isVerifying}
            >
              {isVerifying ? "Verificando..." : "Verificar & Continuar"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p>
            ¿No recibiste un código?{" "}
            <Button
              variant="link"
              onClick={handleResend}
              disabled={isResending || resendCooldown > 0}
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
            >
              Reenviar {resendCooldown > 0 ? `(espera ${resendCooldown}s)` : ""}
            </Button>
          </p>
        </div>

        <Button variant="outline" className="w-full mt-4" onClick={onBack}>
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
