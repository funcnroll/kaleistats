import H1 from "@/components/ui/H1";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 gap-4 text-center">
      <H1>Thank you for your rating!</H1>
      <p className="text-xl text-stone-300">You may now close this page.</p>
    </div>
  );
}
