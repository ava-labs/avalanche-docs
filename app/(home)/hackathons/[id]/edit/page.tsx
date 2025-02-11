"use client"

import HackathonForm from "@/components/hackathons/HackathonForm";
import { baseUrl } from "@/utils/metadata";
import { useParams } from "next/navigation";

async function fetchHackathon(id: string) {
  const res = await fetch(`${baseUrl}/api/hackathons/${id}`);
  if (!res.ok) throw new Error("Failed to fetch hackathon");
  return res.json();
}

export default async function EditHackathonPage() {
  const { id } = useParams()

  if (!id || Array.isArray(id)) {
    throw new Error("Invalid 'id' param");
  }

  const hackathon = await fetchHackathon(id);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Hackathon</h1>
      <div className="max-w-3xl mx-auto">
        <HackathonForm initialData={hackathon} />
      </div>
    </div>
  );
}