const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const parcelRoute = require("./routes/parcels");
const branchRoute = require("./routes/branches");
const orderRoute = require("./routes/orders");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ROUTES

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/parcels", parcelRoute);
app.use("/api/v1/branches", branchRoute);
app.use("/api/v1/orders", orderRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
