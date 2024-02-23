const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qpiuuji.mongodb.net/foodDeliverDB`;
const app = express();
const port = process.env.PORT || 4000;

const MenuRoute = require("./api/routes/MenuRoute");
const CartRoute = require("./api/routes/CartRoute");
const UserRoute = require("./api/routes/UserRoute");
const verifyToken = require("./api/middlware/verifyToken");

app.use(cors());
app.use(express.json());

mongoose
  .connect(uri)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });


app.get("/", verifyToken,(req, res) => {
  res.send("hello world");
});

 // jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })

  // console.log(process.env.ACCESS_TOKEN_SECRET);

app.use("/menu", MenuRoute);
app.use("/carts", CartRoute);
app.use("/user",UserRoute)

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
