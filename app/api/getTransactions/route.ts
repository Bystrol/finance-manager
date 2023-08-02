import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
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

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
      },
    });

    if (!transactions) {
      return new NextResponse('No transactions found', { status: 404 });
    }

    return NextResponse.json(transactions);
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}
