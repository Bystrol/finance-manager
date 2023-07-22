import prisma from '@/lib/prisma';
import { compare, hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/form/isValidEmail';
import { isValidPassword } from '@/lib/form/isValidPassword';

export async function POST(req: Request) {
  try {
    const {
      currentEmail,
      image,
      newUsername,
      newEmail,
      oldPassword,
      newPassword,
    } = await req.json();

    if (
      !currentEmail &&
      !image &&
      !newUsername &&
      !newEmail &&
      !oldPassword &&
      !newPassword
    ) {
      return new NextResponse('Empty fields', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: currentEmail,
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
      if (isValidEmail(newEmail)) {
        if (user && newEmail !== user.email) {
          const userExists = await prisma.user.findUnique({
            where: {
              email: newEmail,
            },
          });

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
      } else {
        return new NextResponse('Invalid email format', { status: 422 });
      }
    }

    if (oldPassword && newPassword) {
      const isPasswordCorrect = await compare(
        oldPassword,
        user!.hashedPassword!,
      );
      const isPasswordSame = await compare(newPassword, user!.hashedPassword!);

      if (isPasswordCorrect) {
        if (!isValidPassword(newPassword)) {
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
