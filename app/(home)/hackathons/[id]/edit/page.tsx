import HackathonForm from "@/components/hackathons/HackathonForm";

async function fetchHackathon(id: string) {
  const res = await fetch(`http://localhost:3000/api/hackathons/${id}`);
  if (!res.ok) throw new Error("Failed to fetch hackathon");
  return res.json();
}

export default async function EditHackathonPage({ params }: { params: { id: string } }) {
  const hackathon = await fetchHackathon(params.id);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Hackathon</h1>
      <div className="max-w-3xl mx-auto">
        <HackathonForm initialData={hackathon} />
      </div>
    </div>
  );
}