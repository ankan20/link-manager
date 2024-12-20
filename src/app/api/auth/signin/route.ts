import prisma  from "@/lib/prisma"; 
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { signinSchema } from "@/schema/AuthSchema";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body using Zod
    const validationResult = signinSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((error) => error.message).join(", ");
      return new Response(
        JSON.stringify({ error: errorMessages }),
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email." }),
        { status: 401 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = await generateToken(user.id);
      const response = NextResponse.json({message:"Logged in successfully"},{ status: 200 });
      response.cookies.set("token",token,{httpOnly:true,secure:true,sameSite:"strict"});
      return response;
      // return new Response(
      //   JSON.stringify({ token }),
      //   { status: 200 }
      // );
    }

    return new Response(
      JSON.stringify({ error: "Invalid password" }),
      { status: 401 }
    );
  } catch (error) {
    console.error("Error during login:", error);

    return new Response(
      JSON.stringify({ error: "An unexpected server error occurred" }),
      { status: 500 }
    );
  }
}
