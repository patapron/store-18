// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51Q2tfWR1HRj8k2Es2nxrFHrGx3SqWeL13vL7C75HjkFws6jo1R9uAnJadS5oj8WHWHWM7QuClOlnNWZsIBwWMl3G00NwXVEHLH"
);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { ReturnStatement } = require("@angular/compiler");

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/checkout", async (req, res) => {
  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [...items],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.status(200).json(session);

  // res.send({ clientSecret: session.client_secret });
});

// app.get("/session-status", async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email,
//   });
// });

app.listen(4242, () => console.log("Running on port 4242"));
