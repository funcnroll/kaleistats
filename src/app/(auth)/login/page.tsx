"use client";

import Button from "@/components/ui/Button";
import H1 from "@/components/ui/H1";
import Input from "@/components/ui/Input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: (ctx) => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <H1>Login</H1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="email" name="email" placeholder="Email" required={true} />
        <Input
          type="password"
          placeholder="Password"
          required={true}
          name="password"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Page;
