import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";
import { RegisterFormValues } from "./registrationForm";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterFormStep1({ cities }: { cities: string[] }) {
  const form = useFormContext<RegisterFormValues>();
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Step 1: Personal Information
        </h3>
        <p className="text-zinc-400">
          Provide your personal details to create your Builders Hub profile.
        </p>
        <div className="w-full h-px bg-zinc-800 mt-2" />{" "}
  
      </div>
      {/* Full Name or Nickname */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name or Nickname</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your full name or preferred display name"
                className="bg-transparent "
                {...field}
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              This name will be used for your profile and communications.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Correo electrónico */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your@email.com"
                {...field}
                className="bg-transparent "
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              This email will be used for login and communications.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Nombre de la empresa (opcional) */}
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company (if applicable)</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your company name"
                {...field}
                className="bg-transparent "
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              If you are part of a company, mention it here. Otherwise, leave
              blank.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Rol en la empresa (opcional) */}
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role at Company</FormLabel>
            <FormControl>
              <Input
                placeholder="Your role"
                {...field}
                className="bg-transparent "
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Ciudad de residencia */}
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City of Residence</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-zinc-400">
              Choose your current city of residence.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Contraseña */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter a secure password"
                className="bg-transparent "
                {...field}
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              Must be at least 8 characters, including one uppercase letter, one
              number, and one symbol.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Confirmar Contraseña */}
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                className="bg-transparent "
                type="password"
                placeholder="Re-enter your password"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              {" "}
              Make sure both passwords match.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Restricciones dietéticas (opcional) */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dietary Restrictions</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter any dietary restrictions (if applicable)"
                className="bg-transparent "
                {...field}
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              If you have allergies or dietary needs, please specify them here.
            </FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
