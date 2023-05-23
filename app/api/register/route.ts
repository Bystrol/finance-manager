import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new Response("Email already taken", {
        status: 422,
      });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        emailVerified: new Date(),
        name: username,
        hashedPassword,
        image: "",
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return new Response("Bad request", {
      status: 400,
    });
  }
}
