import express from "express"; //import express
import cors from "cors"; // import cors to allow cors origin requests
import projects from "./routes/project.js"; // import data from the database;

const PORT = process.env.PORT || 5050; // set port from env or to 5050 if missing variable

const app = express(); // set express server

//app.use(cors()); // use cors

app.use(
  cors({
    origin: "*", // Replace with your GitHub Pages URL
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"], // Add PATCH method
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // parse request data as json

const localhostPath = "/project";

const netlifyPath = "/project";

const chosenPath = netlifyPath;

app.use(`${chosenPath}`, projects); // use data entries [ example all entries "/db_entry" - specific entry "/db_entry/145" ]

app.listen(PORT, () => {
  // start express server listening to the port
  console.log(`Server has started, using port ${PORT}`);
});
