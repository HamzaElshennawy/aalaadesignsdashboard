"use client";
import * as React from "react";
import { Image, Link } from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import "@/styles/globals.css";

const formSchema = z.object({
  email: z.string().email(),
});

// 2. Define a submit handler.

const AuthForm = ({ type }: { type: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <>
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link className="cursor-pointer flex items-center gap-1" href="/">
            <Image
              alt="Aalaa Designs Logo"
              height={50}
              src="/logoblack.png"
              width={50}
            />
          </Link>
          <div>
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </h1>
            <p className="text-16 font-normal text-gray-600">
              Link your account
            </p>
          </div>
        </header>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="form-item">
                  <FormLabel className="form-label">Email</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Input
                        className="input-class"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </section>
    </>
  );
};

export default AuthForm;
