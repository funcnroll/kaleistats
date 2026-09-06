import H1 from "@/components/ui/H1";

export default function Page() {
  return (
    <div className="flex min-h-screen -translate-y-63 flex-col items-center justify-center px-4 gap-4 text-center">
      <H1>Access Forbidden</H1>
      <p className="text-xl text-stone-300">
        You don't have permission to view this page.
      </p>
      <p className="text-sm text-stone-400">
        This could be because the link is invalid, expired, or already used.
      </p>
    </div>
  );
}
