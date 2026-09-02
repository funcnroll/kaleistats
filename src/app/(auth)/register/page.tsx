"use client";

import H1H2Spacing from "@/components/layout/H1H2Spacing";
import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import Input from "@/components/ui/Input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

function Page() {
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        // Name is not checked in the API
        name: "",
      },
      {
        onSuccess: (ctx) => {
          redirect("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex flex-col">
      <H1H2Spacing>
        <H1>Create Account</H1>
        <h2>Sign up to get started</h2>
      </H1H2Spacing>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="email" type="email" placeholder="Email" required={true} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required={true}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Page;
