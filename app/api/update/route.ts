import prisma from '@/lib/prisma';
import { compare, hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const validateEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };

  try {
    const {
      currentEmail,
      image,
      newUsername,
      newEmail,
      oldPassword,
      newPassword,
    } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: currentEmail,
      },
    });

    const userExists = await prisma.user.findUnique({
      where: {
        email: newEmail,
      },
    });

    if (image || image === '') {
      await prisma.user.update({
        where: {
          email: currentEmail,
        },
        data: {
          image,
        },
      });
    }

    if (newUsername) {
      if (newUsername.length >= 3) {
        if (newUsername !== user!.name) {
          await prisma.user.update({
            where: {
              email: currentEmail,
            },
            data: {
              name: newUsername,
            },
          });
        } else {
          return new NextResponse(
            'New username must be different from the current one',
            { status: 422 },
          );
        }
      } else {
        return new NextResponse(
          'Username must consist of minimum 3 characters',
          { status: 422 },
        );
      }
    }

    if (newEmail) {
      if (!validateEmail(newEmail)) {
        return new NextResponse('Invalid email', { status: 422 });
      }

      if (user && newEmail !== user.email) {
        if (!userExists) {
          await prisma.user.update({
            where: {
              email: currentEmail,
            },
            data: {
              email: newEmail,
            },
          });
        } else {
          return new NextResponse('Email already taken', { status: 422 });
        }
      } else {
        return new NextResponse(
          'New email must be different from the current one',
          { status: 422 },
        );
      }
    }

    if (oldPassword && newPassword) {
      const isPasswordCorrect = await compare(
        oldPassword,
        user!.hashedPassword!,
      );
      const isPasswordSame = await compare(newPassword, user!.hashedPassword!);

      if (isPasswordCorrect) {
        if (!validatePassword(newPassword)) {
          return new NextResponse(
            'Password must consist of minimum 8 characters, at least one uppercase letter, one lowercase letter and one number',
            { status: 422 },
          );
        }

        if (isPasswordSame) {
          return new NextResponse(
            'New password must be different from the current one',
            { status: 422 },
          );
        }

        const newHashedPassword = await hash(newPassword, 12);

        await prisma.user.update({
          where: {
            email: currentEmail,
          },
          data: {
            hashedPassword: newHashedPassword,
          },
        });
      } else {
        return new NextResponse('Old password is incorrect', { status: 422 });
      }
    }

    return new NextResponse('Profile updated', { status: 200 });
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}
