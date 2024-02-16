const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const { ObjectId } = require("mongodb");
 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qpiuuji.mongodb.net/`;
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

    async function run() {
        try {
          await client.connect();

          // database and collection
          const menuCollection = client.db("food-deliver").collection("menus");
          const cartCollection = client
            .db("food-deliver")
            .collection("cartItems");

          // all menu items
          app.get("/menu", async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
          });

          // post items in to database
          app.post("/carts", async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
          });

          // get carts using emaial
          app.get("/carts", async (req, res) => {
            const email = req.query.email;
            const filter = { email: email };
            const result = await cartCollection.find(filter).toArray();
            res.send(result);
          });

          // get specific product from cart
          app.get("/carts/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await cartCollection.findOne(filter);
            res.send(result);
          });

          // delete item from cart
          app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(filter);
            res.send(result);
          });
            
            // update quantity
            app.put('/carts/:id', async (req, res) => {
                const id = req.params.id;
                const { quantity } = req.query;
                const filter = { _id: new ObjectId(id) };
                const options = { upsert: true };

                const updateDoc = {
                  $set: {
                    quantity:parseInt(quantity,10),
                  },
                };

                const result = await cartCollection.updateOne(
                    filter,
                    updateDoc,
                    options
                );

            })

          await client.db("admin").command({ ping: 1 });
          console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
          );
        } finally {
        //  await client.close();
    }   
    }
    run().catch(console.dir);

    app.get('/', (req, res) => {
        res.send("hello world")
    });

    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
