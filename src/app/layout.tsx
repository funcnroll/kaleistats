import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaleistats",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="text-stone-200 bg-neutral-900">
        <main>
          <div className="mx-auto max-w-md px-6 py-12">{children}</div>
        </main>
      </body>
    </html>
  );
}
