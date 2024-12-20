import prisma  from "@/lib/prisma";  
import bcrypt from "bcryptjs";
import { z } from "zod";


// Zod Schema for validation
const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body using Zod
    const validationResult = signupSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((error) => error.message).join(", ");
      return new Response(
        JSON.stringify({ error: errorMessages }),
        { status: 400 }
      );
    }

    const { name, email, password } = validationResult.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return new Response(
        JSON.stringify({ error: "Email already in use" }),
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully", userId: user.id }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);

    return new Response(
      JSON.stringify({ error: "An unexpected server error occurred" }),
      { status: 500 }
    );
  }
}
