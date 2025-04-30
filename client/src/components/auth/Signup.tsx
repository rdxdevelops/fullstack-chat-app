"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PasswordInput from "../ui/custom/password-input";

const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(50, { message: "Name must not exceed 50 characters." }),
    bio: z
      .string()
      .min(5, { message: "Bio must be at least 25 characters long." })
      .max(200, { message: "Bio must not exceed 120 characters." })
      .optional(),
    username: z
      .string()
      .min(3, { message: "Username must be atleast 3 characters." })
      .max(15, { message: "Username should not exceed 15 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[ !@#$%^&*()_+\-={}|:;\"'<,>.?]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Error will appear on confirmPassword field
  });

const Signup = () => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
  }

  return (
    <div className="my-4 w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* bio field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="A brief description about you."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* username field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* confirm password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
