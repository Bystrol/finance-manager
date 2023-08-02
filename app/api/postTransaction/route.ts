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

    const transactionData = {
      month,
      year,
      date,
      dateText,
      type,
      category,
      description,
      amount,
      user: { connect: { email: session?.user?.email || '' } },
    };

    const createdTransaction = await prisma.transaction.create({
      data: transactionData,
    });

    await prisma.user.update({
      where: {
        email: session?.user?.email || '',
      },
      data: {
        transactions: {
          connect: [{ id: createdTransaction.id }],
        },
      },
    });

    return new NextResponse('Transaction added', { status: 200 });
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}
