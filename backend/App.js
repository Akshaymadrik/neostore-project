const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const db = "mongodb://localhost:27017/neostore";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();

const postRoutes = require("./routes/eshop_routes");
app.use("/api/eshop/", postRoutes);
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`work on ${PORT}`);
});
