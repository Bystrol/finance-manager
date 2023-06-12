import prisma from "../../lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse("Email already taken", {
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

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Bad request", {
      status: 400,
    });
  }
}
