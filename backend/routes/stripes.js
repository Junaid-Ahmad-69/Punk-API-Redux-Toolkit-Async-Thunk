const router = require("express").Router();
const {checkoutSession } = require("../controller/stripeController");

router.post('/create-checkout-session', checkoutSession);
module.exports = router;