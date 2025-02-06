"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HackathonFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    date: string;
    location: string;
    tags: string[];
    status: string;
  };
}

export default function HackathonForm({ initialData }: HackathonFormProps) {
  const isEditing = !!initialData;
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [tags, setTags] = useState(initialData?.tags.join(", ") || "");
  const [status, setStatus] = useState(initialData?.status || "Upcoming");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !date || !location || !tags.trim()) {
      console.log(title, description, date, location, tags);
      alert("All fields are required.");
      return;
    }

    const payload = {
      title,
      description,
      date,
      location,
      tags: tags.split(",").map((tag) => tag.trim()),
      status,
    };

    try {
      const res = await fetch(`/api/hackathons${isEditing ? `/${initialData.id}` : ""}`, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save hackathon");

      alert(`Hackathon ${isEditing ? "updated" : "created"} successfully!`);
      router.push("/hackathons");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Hackathon Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(selectedDate) => setDate(selectedDate?.toISOString() || "")}
          className="rounded-md border"
        />

        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />

        {/* Tags Input Field */}
        <Input
          placeholder="Add all tags separated by a comma (e.g., Web3, AI, Hackathon)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />

        {/* Status Dropdown */}
        <Select onValueChange={setStatus} defaultValue={status}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ended">Ended</SelectItem>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit">{isEditing ? "Update Hackathon" : "Create Hackathon"}</Button>
      </form>
    </div>
  );
}
