// app/api/projects/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';  // Make sure this is properly imported

export async function POST(req: NextRequest) {
  try {
    // Step 1: Get the token from cookies
    const cookie = req.cookies.get('token')?.value;
    if (!cookie) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Step 2: Decode the token and verify the user
    const decoded = await verifyToken(String(cookie));  // Token verification and decoding
    console.log(decoded)
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Step 3: Parse the request body (expecting a JSON with project details and links)
    const { name, description, links } = await req.json();

    // Step 4: Create the project in the database
    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: Number(decoded?.userId),  // Associate project with logged-in user
      },
    });

    // Step 5: If links are provided, create them and associate with the project
    if (links && links.length > 0) {
      const linkData = links.map((link: { title: string; originalUrl: string; tags: string }) => ({
        title: link.title,
        originalUrl: link.originalUrl,
        tags: link.tags,
        projectId: project.id,
        shortUrl:"N/A"  // Associate link with the newly created project
      }));

      console.log(linkData);

      // Bulk create the links
      await prisma.link.createMany({
        data: linkData,
      });
    }

    // Step 6: Return the created project and a success message
    return NextResponse.json({ message: 'Project created successfully', project }, { status: 201 });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error("Unexpected error:", error);
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
}
