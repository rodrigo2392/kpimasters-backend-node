import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  stripeClient: Stripe;
  constructor() {
    this.stripeClient = new Stripe(process.env.STRIPE_KEY ?? '');
  }
  async getPlans() {
    const plans = await this.stripeClient.products.list({
      expand: ['data.default_price'],
      active: true,
    });
    return {
      data: plans.data,
    };
  }

  async createIntent(planId: string, customer: string) {
    const plan = await this.stripeClient.products.retrieve(planId, {
      expand: ['default_price'],
    });
    const price = plan.default_price as Stripe.Price;
    const suscription = await this.stripeClient.subscriptions.create({
      customer,
      items: [
        {
          price: price.id,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    const invoice = suscription.latest_invoice as Stripe.Invoice;
    const intent = invoice.payment_intent as Stripe.PaymentIntent;

    return {
      client_secret: intent.client_secret,
    };
  }
}
