"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    setIsLoading(true);
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/validate", { withCredentials: true });
        setIsLoggedIn(res.status === 200);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    setIsLoading(false);
  }, []);

  // Handle login/logout
  const handleAuth = async () => {
    if (isLoggedIn) {
      // Logout logic
      try {
        await axios.post("/api/auth/logout", {}, { withCredentials: true });
        setIsLoggedIn(false);
        router.push("/signin");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      // Redirect to login
      router.push("/signin");
    }
  };

  return (
    <nav className="w-full absolute z-50 py-3 px-6 flex justify-between items-center border-md border-y dark:border-gray-900 border-zinc-50 text-white shadow-md">
      {/* Left Side: Website Name */}
      <div className="font-bold text-2xl flex-1">
        <Link href="/" className="flex items-center">
          <span className="inline bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text drop-shadow-lg">
            LinkSphere🔗
          </span>
        </Link>
      </div>

      {/* Right Side: Buttons */}
      {
        !isLoading && (
          <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Button onClick={handleAuth} className="bg-red-500 hover:bg-red-700 transition">
            Logout
          </Button>
        ) : (
          <Button onClick={handleAuth} className="bg-yellow-500 hover:bg-yellow-700 transition">
            Login
          </Button>
        )}
      </div>
        )
      }
      
    </nav>
  );
};

export default Navbar;
