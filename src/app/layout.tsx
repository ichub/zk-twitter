import { AppWrapper } from "@/frontend/components/AppWrapper";
import { ClientOnly } from "@/frontend/components/ClientOnly";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body
        className={cn(
          "w-screen h-screen min-h-screen min-w-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ClientOnly>
          <AppWrapper>{children}</AppWrapper>
        </ClientOnly>
      </body>
    </html>
  );
}
