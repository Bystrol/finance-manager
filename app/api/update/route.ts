import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, image } = await req.json();

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        image,
      },
    });

    return new NextResponse("OK", { status: 200 });
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }
}
