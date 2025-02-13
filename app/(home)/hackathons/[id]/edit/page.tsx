"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/metadata";
import { useParams } from "next/navigation";
import HackathonForm from "@/components/hackathons/HackathonForm";

type HackathonLite = {
  id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  total_prizes?: number;
  tags: string[];
  status: string;
}

export default function EditHackathonPage() {
  const { id } = useParams()
  const [hackathon, setHackathon] = useState<HackathonLite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      setError("Invalid 'id' param");
      setLoading(false);
      return;
    }

    async function fetchHackathon() {
      try {
        const { data } = await axios.get(`${baseUrl}/api/hackathons/${id}`);
        setHackathon(data);
      } catch (err) {
        const errorMessage =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to fetch hackathon";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchHackathon();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Hackathon</h1>
      <div className="max-w-3xl mx-auto">
        <HackathonForm initialData={hackathon ?? undefined} />
      </div>
    </div>
  );
}