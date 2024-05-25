import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/frontend/components/AppWrapper";
import { ClientOnly } from "@/frontend/components/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZK Twitter",
  description: "ZK Twitter"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <AppWrapper>{children}</AppWrapper>
        </ClientOnly>
      </body>
    </html>
  );
}
