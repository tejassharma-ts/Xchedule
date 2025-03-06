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

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await delay();
      await login({ email: values.email, password: values.password });
      toast.success("Logged In successfully");
      // navigate(ROUTE_MAP.HOME);
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
          Welcome Back
        </Heading>
        <Para>Sign in to your account</Para>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button data-cy="login-button" loading={loading} type="submit" size="sm" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>
      <div className="relative mt-8">
        <p className=" text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link
            data-cy="register-button"
            to={ROUTE_MAP.AUTH.REGISTER}
            className="underline underline-offset-4 hover:text-foreground">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
