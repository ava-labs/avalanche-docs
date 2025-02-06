import HackathonForm from "@/components/hackathons/HackathonForm";

async function fetchHackathon(id: string) {
  const res = await fetch(`http://localhost:3000/api/hackathons/${id}`);
  if (!res.ok) throw new Error("Failed to fetch hackathon");
  return res.json();
}

export default async function EditHackathonPage({ params }: { params: { id: string } }) {
  const hackathon = await fetchHackathon(params.id);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Edit Hackathon</h1>
      <HackathonForm initialData={hackathon} />
    </div>
  );
}