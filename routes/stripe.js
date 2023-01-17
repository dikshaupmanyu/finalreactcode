
const express = require("express");
const Stripe = require("stripe");
// const { Order } = require("../models/Order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async(req, res) => {
    const session = await stripe.chekout.session.create({
        line_items:[{
            price_data:{
                current:"usd",
                product_data:{
                    name:"t-shirt",
                },
                unit_amount:2000,

            },
            quantity:1
        }],
        mode:"payment",
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/home`,
    });

    res.send({url:session.url});
})

module.exports = router;