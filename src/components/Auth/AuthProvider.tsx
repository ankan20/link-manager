"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
    </>
  );
};
