import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/form/isValidEmail';
import { isValidPassword } from '@/lib/form/isValidPassword';

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    if (username.length < 3) {
      return new NextResponse('Username must consist of minimum 3 characters', {
        status: 422,
      });
    }

    if (!isValidEmail(email)) {
      return new NextResponse('Invalid email format', { status: 422 });
    }

    if (!isValidPassword(password)) {
      return new NextResponse(
        'Password must consist of minimum 8 characters, at least one uppercase letter, one lowercase letter and one number',
        { status: 422 },
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse('Email already taken', {
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
        image: '',
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse('Something went wrong', {
      status: 400,
    });
  }
}
