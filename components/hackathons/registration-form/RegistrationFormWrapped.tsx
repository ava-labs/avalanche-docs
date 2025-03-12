"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { RegisterForm } from "./RegistrationForm";

export default function RegistrationFormWrapped() {
  return (
    <div>
      <SessionProvider>
        <RegisterForm />
      </SessionProvider>
    </div>
  );
}
