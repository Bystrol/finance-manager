import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PATCH(req: Request) {
  try {
    const { id, description, category, amount } = await req.json();

    if (!id || !description || !category || !amount) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || '',
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 400 });
    }

    const transactionToUpdate = await prisma.transaction.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        description,
        category,
        amount,
      },
    });

    if (!transactionToUpdate) {
      return new NextResponse('Transaction not found', { status: 404 });
    }

    return new NextResponse('Transaction edited', { status: 200 });
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}
