"use client";

import H1H2Spacing from "@/components/layout/H1H2Spacing";
import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import Input from "@/components/ui/Input";
import React from "react";

function Page() {
  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col">
      <H1H2Spacing>
        <H1>Create Account</H1>
        <h2>Sign up to get started</h2>
      </H1H2Spacing>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input type="text" placeholder="Username" />
        <Input type="text" placeholder="Password" />
        <Input type="text" placeholder="Confirm Password" />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Page;
