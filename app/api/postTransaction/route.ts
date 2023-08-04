import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const { month, year, date, dateText, type, category, description, amount } =
      await req.json();

    if (
      !month ||
      !year ||
      !date ||
      !dateText ||
      !type ||
      !category ||
      !description ||
      !amount
    ) {
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

    const transactionData = {
      month,
      year,
      date,
      dateText,
      type,
      category,
      description,
      amount,
      user: { connect: { email: user.email || '' } },
    };

    const createdTransaction = await prisma.transaction.create({
      data: transactionData,
    });

    await prisma.user.update({
      where: {
        email: user.email || '',
      },
      data: {
        transactions: {
          connect: [{ id: createdTransaction.id }],
        },
      },
    });

    return NextResponse.json(createdTransaction, { status: 200 });
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}
