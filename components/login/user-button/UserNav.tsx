import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserButton } from "./UserButton";


export default async function UserNavServer() {
  const session = await getServerSession(authOptions);

  return <UserButton session={session} />;
}