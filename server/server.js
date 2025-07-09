require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
connectDB();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api", require('./routes/blogRoutes'));
app.use("/api", require('./routes/categoryRoutes'));
app.use("/api", require('./routes/commentRoutes'));
app.use("/api/categories", categoryRoutes);

// Error handling middleware 
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on https://localhost: ${PORT}`));