import { MongoClient, ServerApiVersion } from "mongodb"; // import  MongoClient and ServerApiVersion classes from mongodb
const uri = process.env.ATLAS_URI || ""; // get Atlas URI from env file

// create client instance using new MongoClient constructor
const client = new MongoClient(uri, {
  //serverAPI object uses MongoDB driver configuration to use the Server API for specific MongoDB versions compatibility.
  serverAPI: {
    version: ServerApiVersion.v1, // version 1 of the MongoDB Server API for compatibility.
    strict: true, //  MongoDB driver throws error for Server API version unsupported methods-features.
    deprecationErrors: true, // MongoDB driver throws error for Server API version deprecated methods-features.
  },
});

try {
  await client.connect(); // wait for the client to connect to the server
  await client.db("admin").command({ ping: 1 }); // connect to admin database and send a ping to test the connection
  // [ https://www.mongodb.com/docs/drivers/node/current/fundamentals/run-command/ ]
  // [ https://www.mongodb.com/docs/manual/reference/command/ping/ ]
  console.log("MongoDB connection established sucessfully");
} catch (error) {
  console.error(error); // console log error
}

let projects_db = client.db("projects"); // get projects database

export default projects_db; // export projects database
