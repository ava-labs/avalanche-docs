import { getServerSession } from "next-auth/next";
import { UserButton } from "./UserButton";
import { AuthOptions } from "@/lib/auth/authOptions";


export default async function UserNavServer() {
  const session = await getServerSession(AuthOptions);

  return <UserButton session={session} />;
}