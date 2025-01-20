import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe/stripe';
import { getCreditsPack, PackId } from '@/types/billing';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    switch (event.type) {
      case 'checkout.session.completed':
        if (!event.data.object.metadata) {
          throw new Error('missing metadata');
        }
        const { userId, packId } = event.data.object.metadata;
        if (!userId) {
          throw new Error('missing user id');
        }

        if (!packId) {
          throw new Error('missing pack id');
        }

        const purchasedPack = getCreditsPack(packId as PackId);
        if (!purchasedPack) {
          throw new Error('purchased pack not found');
        }

        await prisma.userBalance.upsert({
          where: { userId },
          create: {
            userId,
            credits: purchasedPack.credits,
          },
          update: {
            credits: {
              increment: purchasedPack.credits,
            },
          },
        });

        await prisma.userPurchase.create({
          data: {
            userId,
            stripeId: event.id,
            description: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
            amount: event.data.object.amount_total!,
            currency: event.data.object.currency!,
          },
        });
        break;
      default:
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('stripe webhook error', error);
    return new NextResponse('webhook error', { status: 400 });
  }
}
