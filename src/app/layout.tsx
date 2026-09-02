import type { Metadata } from "next";
import "./globals.css";
import AuthNath from "@/components/layout/AuthNav";

export const metadata: Metadata = {
  title: "Kaleistats",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-neutral-900 text-stone-200 flex flex-col">
        <main className="flex-1 flex items-start justify-center pt-16 px-4">
          <AuthNath />
          {children}
        </main>
      </body>
    </html>
  );
}
