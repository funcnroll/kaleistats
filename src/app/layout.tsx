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
        <main>{children}</main>
      </body>
    </html>
  );
}
