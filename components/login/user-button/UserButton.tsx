'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {  User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserNavClientProps {
    session: Session | null;
  }
export function UserButton({ session }: UserNavClientProps) {
    const isAuthenticated = !!session?.user;
    const handleSignIn = () => {
        setTimeout(() => {
            router.push("/login");
          }, 0);
      };
 
    const router = useRouter();

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {isAuthenticated && session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Foto de Perfil"
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="size-7" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black border-zinc-600 text-white shadow-lg p-1 rounded-md w-48">
            {isAuthenticated ? (
              <>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => router.push("/settings")}>
                 Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/submissions")}>
                  My Submissions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleSignIn}>
                Sign In
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    
  };