import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to environment variables.' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);

  try {
    const body = await request.json();
    const { title, amount } = body;
    // amount is in smallest currency unit (paise for INR)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: title || 'OmniExchange Purchase',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin') || 'https://buynsell-two.vercel.app'}?payment=success`,
      cancel_url: `${request.headers.get('origin') || 'https://buynsell-two.vercel.app'}?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
