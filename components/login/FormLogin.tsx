"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogo } from "./google-logo";
import { AvalancheLoginLogo } from "./AvalancheLoginLogo";
import { WalletLogo } from "./WalletLogo";

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function Formlogin() {
  const formMethods = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-4 pt-10">
        <div className=" p-4">
          <AvalancheLoginLogo className="w-[90%] max-w-[28rem] text-white"></AvalancheLoginLogo>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <div className="text-center">
            <h3 className="font-medium text-2xl">Sign in to your account</h3>
            <p className="text-zinc-400">
              Sign up with email or choose another method.
            </p>
          </div>
          <br></br>
          <Form {...formMethods}>
            <form className="space-y-2.5 w-full max-w-[25rem]">
              {/* Campo de Email */}
              <FormField
                control={formMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-transparent w-full"
                        placeholder="name@example.com"
                        {...field}
                        value={field?.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de Contraseña */}
              <FormField
                control={formMethods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-transparent w-full"
                        placeholder="password"
                        {...field}
                        value={field?.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-400">
                      At least 8 characters, 1 number & 1 symbol
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <br></br>
              <button
                type="submit"
                className="w-full max-w-[400px] bg-red-500 text-white p-2 rounded"
              >
                Login
              </button>
            </form>
          </Form>
          <br></br>
          <p className="text-zinc-400">
            Sign up with email or choose another method.
          </p>
          <br></br>
          <div className="flex items-center justify-center  w-full max-w-[25rem] my-4">
            <hr className="flex-grow border-t border-zinc-600" />
            <span className="px-4 text-zinc-300 text-sm font-medium">
              SIGN IN WITH
            </span>
            <hr className="flex-grow border-t border-zinc-600" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              <GoogleLogo fill="currentColor" />
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              {/* <GithubLogo className="w-5 h-5" fill="currentColor" /> */}
              <span className="text-sm font-medium">Github</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              {/* <XLogo className="w-5 h-5" fill="currentColor" /> */}
              <span className="text-sm font-medium">X</span>
            </button>
          </div>
          <br></br>
          <button className="flex items-center justify-center gap-1 px-4 py-2  bg-zinc-950  text-white rounded w-full max-w-[400px]  border border-red-500 hover:bg-gray-800 transition">
            <WalletLogo fill="currentColor"></WalletLogo>
            <span className="text-sm font-medium">Connect a Wallet</span>
          </button>
          <br></br>
          <footer className="pt-10">
            <p className="text-zinc-400 items-center justify-center w-full max-w-[400px] text-center text-sm font-medium">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline text-white hover:text-gray-300"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline text-white hover:text-gray-300"
              >
                Privacy Policy
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Formlogin;
