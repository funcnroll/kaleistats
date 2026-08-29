"use client";

import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import Input from "@/components/ui/Input";
import React from "react";

function Page() {
  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col gap-6">
      <H1>Login</H1>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input type="text" placeholder="Username" />
        <Input type="text" placeholder="Password" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Page;
