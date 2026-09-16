import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXUS",
  description: "Advanced LLM Application Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}