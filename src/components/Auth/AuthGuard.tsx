import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/"); // Redirect logged-in users to the homepage
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
