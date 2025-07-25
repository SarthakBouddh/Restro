const Razorpay = require("razorpay")
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const { log } = require("console");

const createOrder = async (req, res, next) => {

    if(req.body.paymentMethod === "razorpay"){
        const razorpay = new Razorpay({
            key_id: config.razorpayKeyId,
            key_secret: config.razorpaySecretKey,
        });
    
        try {
            const { amount } = req.body;
            const options = {
                amount: amount * 100, // Amount in paisa (1 INR = 100 paisa)
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            }
    
            const order = await razorpay.orders.create(options);
            res.status(200).json({
                success: true,
                order
            });
        } catch (error) {
            next(error);
        }
    }else{
        const order = await Order.create(req.body);
        order.save();
        res.status(200).json({
            success: true,
            order
        });
    }
}

const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const expectedSignature = crypto
            .createHmac("sha256", config.razorpaySecretKey)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully!" });
        } else {
            const error = createHttpError(400, "Payment verification failed!");
            return next(error);
        }
    } catch (error) {
        next(error)
    }
}

const webhookverify = async (req, res, next) => {
    try {
        const secret = config.razorpyWebhookSecret;
        const signature = req.headers["x-razorpay-signature"];

        const body = JSON.stringify(req.body); // Convert payload to string

        // 🛑 Verify the signature
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (expectedSignature === signature) {
            console.log("✅ Webhook verified:", req.body);

            // ✅ Process payment (e.g., update DB, send confirmation email)
            if (req.body.event === "payment.captured") {
                const payment = req.body.payload.payment.entity;

                const newPayment = new Payment({
                    paymentId: payment.id,
                    orderId: payment.order_id,
                    amount: payment.amount / 100,
                    currency: payment.currency,
                    status: payment.status,
                    method: payment.method,
                    email: payment.email,
                    contact: payment.phone,
                    createAt: new Date(payment.created_At * 1000)
                })

                await newPayment.save();
            }
            res.json({ success: true });
        } else {
            const error = createHttpError(400, "❌ Invalid Signature!");
            return next(error);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().sort({ createAt: -1 }); // latest first
    console.log(payments);
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = { createOrder, verifyPayment , getAllPayments};