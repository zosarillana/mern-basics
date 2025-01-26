import { MongoClient, ServerApiVersion } from "mongodb";

const url = process.env.ATLAS_URL || "";
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

try {
    //Connect the clien to the server
    await client.connect();
    //Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
        "Successfully pinged deployment to MongoDB"
    );
} catch(err) {
    console.error(err);
}

let db = client.db("employees");

export default db;