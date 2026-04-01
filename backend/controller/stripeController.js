const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
module.exports.checkoutSession = async (req, res, next) => {
    try{
        const {products} = req.body;
        const lineItems = products.map((product)=>({
            price_data:{
                currency:"USD",
                product_data:{
                    name: product.name,
                    images: [`${process.env.BASE_URL_IMAGE}${product.image}`],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.productQty,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success-payment',
            cancel_url: 'http://localhost:5173/cancel-payment',
        })
        res.json({
            id: session.id,
            url: session.url
        })


    }catch(err){
        next(err);
    }
}