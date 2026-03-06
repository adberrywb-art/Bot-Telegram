const express = require('express');
const stripe = require('stripe')('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_secreta_real...'); // ¡NUNCA en el frontend!
const app = express();

app.use(express.json());

// Endpoint para crear el pago
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // En centavos: $100.00 = 10000
            currency: currency || 'mxn',
            automatic_payment_methods: { enabled: true },
        });
        
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
