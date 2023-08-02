import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new NextResponse('Missing ID', { status: 400 });
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

    const transactionToDelete = await prisma.transaction.delete({
      where: {
        id,
        userId: user?.id,
      },
    });

    if (!transactionToDelete) {
      return new NextResponse('Transaction not found', { status: 404 });
    }

    return new NextResponse('Transaction deleted', { status: 200 });
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}
