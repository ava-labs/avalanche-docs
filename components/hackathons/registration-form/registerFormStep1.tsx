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
        <div className="w-full h-px bg-zinc-300 mt-2" />{" "}
  
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
                className="bg-transparent placeholder-zinc-600  "
                {...field}
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              This name will be used for your profile and communications.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Email */}
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
                className="bg-transparent placeholder-zinc-600"
              />
            </FormControl>
            <FormMessage className="text-zinc-600">
              This email will be used for login and communications.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* NameCompany (opcional) */}
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
                className="bg-transparent placeholder-zinc-600"
              />
            </FormControl>
            <FormMessage className="text-zinc-400">
              If you are part of a company, mention it here. Otherwise, leave
              blank.
            </FormMessage>
          </FormItem>
        )}
      />

      {/* Rol */}
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
                className="bg-transparent placeholder-zinc-600 "
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* City */}
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City of Residence</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="text-zinc-600">
                  <SelectValue placeholder="Select your city"  className="placeholder-zinc-600"/>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white dark:bg-black border-gray-300 dark:border-zinc-600  placeholder-zinc-600 text-zinc-600 rounded-md shadow-md" >
                {cities.map((city) => (
                  <SelectItem  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" 
                  key={city} value={city}>
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

      {/* password */}
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
                className="bg-transparent placeholder-zinc-600 "
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

      {/* confirm pass */}
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                className="bg-transparent placeholder-zinc-600"
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

      {/* dietary restrictions */}
      <FormField
        control={form.control}
        name="dietary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dietary Restrictions</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter any dietary restrictions (if applicable)"
                className="bg-transparent placeholder-zinc-600"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-zinc-600">
              If you have allergies or dietary needs, please specify them here.
            </FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
