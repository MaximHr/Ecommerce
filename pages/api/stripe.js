import Stripe from "stripe";
// const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
const stripe = new Stripe('sk_test_51LLTQ3FHYPKlmTUKwKo1Zae0yVtYjfpwdD5ISeX2AkLLBQcKMzuXTkYw7zRHqhIv3Sd0d2vtNsiLIuAkwhvWA6TS00SCYNEAJt');

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    try {
        const params = {
            line_items: req.body.map(item => { 
              const img = item.image[0].asset._ref;
              const newImage = img.replace('image-', 'https://cdn.sanity.io/images/6lz1bfoe/production/').replace('-webp', '.webp').replace('-jpg', '.jpg').replace('-png', '.png');


              return {
                price_data: {
                  currency: 'bgn',
                  product_data: {
                    name: item.title,
                    images: [newImage]
                  },
                  unit_amount: item.price * 100
                },
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1
                },
                quantity: item.quantity
              }

            }),
            mode: 'payment',
            submit_type: 'pay',
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          }

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session)

    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
  } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
  }
}