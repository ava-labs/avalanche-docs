import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
export const loginFormSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });
  
export function SignInInputs() {
    const formMethods = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      });
  return (
    <div>
                <Form {...formMethods}>
                <form method="post" className="space-y-6 w-full">
                  <div className="space-y-2">
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                            />
                          </FormControl>
                          <FormDescription className="text-zinc-400">
                            At least 8 characters, 1 number & 1 symbol
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-500 p-2 rounded"
                  >
                    SIGN IN
                  </Button>
                </form>
              </Form>

              <Link href="#" className="text-zinc-400 text-sm text-center">
                Forgot password?
              </Link>
    </div>
  )
}
