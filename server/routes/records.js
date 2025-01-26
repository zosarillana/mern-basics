import express from "express";

// This will help us connect to the databse
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// Router is on instance of the express routes.
//  We use it to define our routes
// The router will be added as a middleware and will take control of requests starting path /record
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (requestAnimationFrame, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (requestAnimationFrame, res) => {
  let collection = await db.collection("records");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

//This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("records");
    let result = collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.errors(err);
    res.status(500).send("Error adding record");
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const updates = {
      $set:{
        name: req.body.name,
        position: req.body.position,
        level: req.body.position,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collectoin = db.collection("records");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record")
  }
});

export default router;