const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./Routes/auth");
const productRoutes = require("./Routes/product");
const connectToDB = require("./Mongodb");

app.use(express.json());
app.use(cors());
const port = process.env.PORT ? process.env.PORT : 4002;

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

connectToDB();
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
