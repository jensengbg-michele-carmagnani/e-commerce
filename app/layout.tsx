import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ModalProvider } from "@/providers/modal-provider";
import ToasterProvider from "@/components/modals/toast-provider";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          form: "w-full",
          formButtonPrimary:
            "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
        },
      }}
    >
      <HydrationOverlay>
        <html lang="en">
          <body>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </body>
        </html>
      </HydrationOverlay>
    </ClerkProvider>
  );
}
