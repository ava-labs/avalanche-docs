"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, GalleryVerticalEnd, Loader2 } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "./AdminSidebar";
import General from "./sections/General";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import type { Hackathon } from "@/types/hackathons";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export const hackathonAdminFormSchema = z.object({
  name: z.string().min(1, "The hackathon needs a name"),
  description: z
    .string()
    .min(10, "The description must be at least 10 characters")
    .max(500, "The description cannot exceed 500 characters"),
  logo: z.any().optional(),
  banner: z.any().optional(),

  format: z.enum(["on-site", "virtual", "hybrid"]).optional(),
  location: z.string(),

  registrationDeadline: z.date().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  timeZone: z.string().optional(),

  totalPrizePool: z.string().optional(),

  visibility: z.enum(["public", "private"]).default("public"),

  status: z.enum(["draft", "live", "ended"]).default("draft"),
});

export default function HackathonForm({
  initialData,
  isEditing = false,
}: {
  initialData?: Hackathon;
  isEditing?: boolean;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof hackathonAdminFormSchema>) {
    try {
      setIsLoading(true);
      const payload = {
        ...initialData,
        tags: ["AI", "Gaming"],
        date: new Date().toISOString(),
        title: values.name,
        description: values.description,
        location: values.location,
        registration_deadline: values.registrationDeadline,
      };
      if (isEditing) {
        await axios.put(`/api/hackathons/${initialData!.id}`, payload);
        toast({
          title: "Hackathon updated successfully",           
        });
      } else {
        await axios.post(`/api/hackathons/`, payload);
        toast({
          title: "Hackathon created successfully",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to update hackathon",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const form = useForm<z.infer<typeof hackathonAdminFormSchema>>({
    resolver: zodResolver(hackathonAdminFormSchema),
    defaultValues: {
      name: initialData?.title,
      description: initialData?.description,
      location: initialData?.location,
      registrationDeadline: initialData?.registration_deadline
        ? new Date(initialData.registration_deadline)
        : undefined,
    },
  });

  return (
    <section className="px-8 py-6">
      <h1 className="font-medium text-lg text-zinc-50">
        Hackathon Admin Panel
      </h1>
      <p className="text-zinc-400">
        Edit and manage all aspects of your hackathon in one place.
      </p>
      <hr className="my-4 border-t border-zinc-800" />
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="py-2 px-3 flex flex-row items-center gap-2 rounded-md border-zinc-800 border">
          <GalleryVerticalEnd className="w-4 h-4 stroke-white" />
          Hackathon Admin Panel
        </div>
        <div className="flex gap-4 justify-end items-center">
          <Button
            variant="secondary"
            onClick={form.handleSubmit(onSubmit)}
            className="bg-red-500 hover:bg-red-600 py-2 px-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save All Changes"
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/hackathons/${initialData?.id ?? ""}`)}
          >
            View Public Page
          </Button>
          <Button variant="secondary">Publish</Button>
          <div className="border-l border-zinc-800 h-8"></div>
          <Badge variant="outline" className="px-3 flex items-center gap-2">
            Status: Live
            <Circle className="w-3 h-3 stroke-green-500" />
          </Badge>
        </div>
      </div>
      <div className="relative">
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset className="p-2 pl-6  max-h-[70vh] overflow-y-auto">
            <Form {...form}>
              <form className="pb-24" onSubmit={form.handleSubmit(onSubmit)}>
                <General form={form} />
              </form>
            </Form>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>
  );
}
