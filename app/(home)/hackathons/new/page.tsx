import HackathonForm from "@/components/hackathons/HackathonForm";

export default function NewHackathonPage() {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Create a New Hackathon</h1>
      <HackathonForm />
    </div>
  );
}
