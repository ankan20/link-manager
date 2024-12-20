"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AuthGuard from "@/components/Auth/AuthGuard";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label"
import { signupSchema } from "@/schema/AuthSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Error from "@/components/ui/error";
import Link from "next/link";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors,setErrors]= useState<any>(null)

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // Validate the form data with Zod
      const validationResult = signupSchema.safeParse(formData);

      if (!validationResult.success) {
        // Show the first validation error
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

      const res = await axios.post("/api/auth/signup", formData);

      if (res.status === 201) {
        toast.success("Signup successful!");
        router.push("/signin");

      } else {
        setErrors(null);
        toast.error(res?.data?.error || "Signup failed.");
      }
    } catch (error: any) {
      setErrors(null);
      console.error("Error during signup:", error);
      toast.error(error?.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <AuthGuard>
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
        <Input
            name="name"
            type="text"
            id="name"
            placeholder="Enter Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}     
            />
        </div>
        {errors?.name && <Error message={errors?.name} />}
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
        <p className="mt-2 text-sm text-black dark:text-white">If you already have an account ,<Link href={"/signin"} className="text-blue-700 underline" >signin</Link></p>

      </CardFooter>
    </Card>
    </AuthGuard>
  );
};
