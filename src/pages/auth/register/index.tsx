import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Container from "@/components/layout/container";
import { PasswordInput } from "@/components/password-input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import Para from "@/components/ui/para";
import Section from "@/components/ui/section";

import useAuthStore from "@/models/auth";

import { ROUTE_MAP } from "@/data/routes";
import AppError from "@/lib/error";
import { cn, delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Should be more than 2 characters" })
    .max(50, { message: "Should not be more than 50 characters" })
    .trim(),
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    // validate as input changes
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    try {
      setLoading(true);
      await delay();
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate(ROUTE_MAP.HOME);
    } catch (err) {
      const error = new AppError(err);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-2">
      <div className="mb-5">
        <Heading variant="bold" size="md">
          Join Trello
        </Heading>
        <Para className="text-sm">Create an account to get started</Para>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input data-cy="name-input" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input data-cy="email-input" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput data-cy="password-input" placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            data-cy="signup-button"
            loading={loading} type="submit" size="sm" className="w-full">
            Sign up
          </Button>
        </form>
      </Form>
      <div className="relative mt-8">
        <p className=" text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            to={ROUTE_MAP.AUTH.LOGIN}
            className="underline underline-offset-4 hover:text-foreground">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
