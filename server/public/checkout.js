// This is your test secret API key.
const stripe = Stripe("pk_test_51Q2tfWR1HRj8k2Es2RFM5fwfffCDekRjunDqF0Lx0jzSjznFBQvDS4Ib5cq9DKXzOEDLTs3yndMqY7ziktT4QZMF00hDOeWphB");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}