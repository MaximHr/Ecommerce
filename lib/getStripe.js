import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        // stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
        stripePromise = loadStripe('pk_test_51LLTQ3FHYPKlmTUKT7spab0B0ZynKn075JU8yQnkJ1lUlOZanHJxBAQ8vY1IHCwlgNEt57FLDgyApp9NvPJxv4Sp00qbM9DuNf');
    }
    return stripePromise;
}

export default getStripe;