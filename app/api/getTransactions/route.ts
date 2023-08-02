import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || '',
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(transactions);
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}
