const express = require('express');
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const Stripe = require('stripe');
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(amount * 100),
      currency: 'mxn',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error('Error creando payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;