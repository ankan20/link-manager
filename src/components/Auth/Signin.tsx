"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AuthGuard from "@/components/Auth/AuthGuard";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/schema/AuthSchema";
import Link from "next/link";
import { Label } from "@/components/ui/label"
import Error from "@/components/ui/error";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors,setErrors]=useState<any>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // Validate the form data with Zod
      const validationResult = signinSchema.safeParse(formData);

      if (!validationResult.success) {
        // Display the first error encountered
        const newErrors:any = {};
        if(validationResult.error.errors){
          validationResult.error.errors.forEach((err) => {
            newErrors[err.path[0]] = err.message;
          });
  
          setErrors(newErrors);
        }
        toast.error("Please fill it.");
        return;
      }

      const res = await axios.post("/api/auth/signin", formData);

      if (res.status === 200) {
        // localStorage.setItem("token", res.data.token);
        toast.success("Logged in successfully!");
        router.push("/dashboard");
        
      } else {
        setErrors(null);
        toast.error(res?.data?.error || "Invalid credentials");
      }
    } catch (error: any) {
      setErrors(null);
      console.error("Error during login:", error);
      toast.error(error?.response?.data?.error || "Failed to sign in. Please try again later.");
    }
  };

  return (
    <AuthGuard>
    <Card>
      <CardHeader>
        <CardTitle>Signin</CardTitle>
        <CardDescription>
          Signin to your account if you have already
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        {errors?.email && <Error message={errors?.email} />}
        <div className="space-y-1">
        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        {errors?.password && <Error message={errors?.password} />}
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button onClick={handleSubmit}>
          Signup
        </Button>
        <div className="h-[2px] w-[80%] mt-2 bg-slate-600 dark:bg-white"></div>
        <p className="mt-2 text-sm text-black dark:text-white">If you don&rsquo;t have an account ,<Link href={"/signup"} className="text-blue-700 underline" >signup</Link></p>

      </CardFooter>
    </Card>
    </AuthGuard>
  );
};
