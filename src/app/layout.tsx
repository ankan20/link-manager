import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import ToastProvider from "@/components/ui/ToastProvider";
import { AuthProvider } from "@/components/Auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkSphere",
  description: "In this platform you can manage your project urls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
