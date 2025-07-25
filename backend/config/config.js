const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URL || "mongodb://localhost:27017/myDatabase",
    nodeEnv: process.env.NODE_ENV || "development",
    accessTokenSecret : process.env.JWT_SECRET,
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = config;
