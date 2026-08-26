import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaleistats",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="text-stone-200">
        <main className="bg-neutral-900  ">{children}</main>
      </body>
    </html>
  );
}
