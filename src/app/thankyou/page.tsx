import H1 from "@/components/ui/H1";

export default function Page() {
  return (
    <div className="flex min-h-screen -translate-y-63 flex-col items-center justify-center px-4 gap-4 text-center">
      <H1>Thank you for your rating!</H1>
      <p className="text-xl text-stone-300">You may now close this page.</p>
    </div>
  );
}
