require("dotenv").config();

const express = require("express");
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();

// Connect to database
connectDB()

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://restro-rosy.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// Root endpoints
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});

//other Endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order" , require("./routes/orderRoute"));
app.use("/api/table" , require("./routes/tableRoute"));
app.use("/api/payment" , require("./routes/paymentRoute"));
app.use("/api/menu" , require("./routes/menuRoute"));

// Global error handler
app.use(globalErrorHandler);

// Start server
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running ${PORT}`);
});
