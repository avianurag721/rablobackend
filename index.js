const express = require("express");
const app = express();
require("dotenv").config()
const PORT =process.env.PORT|| 4000;

const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./Routes/User");
const productsRoutes = require("./Routes/Product");

const database = require("./dbConfig/dbconnect");
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://rablobackend-d3o3.onrender.com",
    credentials: true,
  })
);

// console.log(userRoutes)
app.use("/auth", userRoutes);
app.use("/product", productsRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
