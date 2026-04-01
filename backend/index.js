require('dotenv').config();
const express = require('express');
const cors = require('cors');
const StripeRoutes = require('./routes/stripes');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/stripe', StripeRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})
module.exports = { stripe };