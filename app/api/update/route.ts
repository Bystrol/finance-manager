import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const validateEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  try {
    const { email, image, newEmail } = await req.json();

    if (image || image === "") {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          image,
        },
      });
    }

    if (newEmail === "") {
      return new NextResponse("Invalid email", { status: 422 });
    }

    if (newEmail) {
      if (!validateEmail(newEmail)) {
        return new NextResponse("Invalid email", { status: 422 });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user && newEmail !== user.email) {
        await prisma.user.update({
          where: {
            email,
          },
          data: {
            email: newEmail,
          },
        });
      } else {
        return new NextResponse(
          "New email must be different from the current one",
          { status: 422 }
        );
      }
    }

    return new NextResponse("Profile updated", { status: 200 });
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }
}
