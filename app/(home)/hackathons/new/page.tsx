import HackathonForm from "@/components/hackathons/HackathonForm";

export default function NewHackathonPage() {
  return (
    <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
      <h1 className="text-xl font-bold mb-4 text-center">Create a New Hackathon</h1>
      <HackathonForm />
    </main>
  );
}
