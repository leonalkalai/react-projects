import express from "express"; //import express

import projects_db from "../database/connection.js"; // import projects database from connection

import { ObjectId } from "mongodb"; // import ObjectId method to convert the _id field value to string [ https://www.mongodb.com/docs/manual/reference/method/ObjectId/ ]

const router = express.Router(); // create new instance of Router to create middleware for requests

// Helper function to set CORS headers
const setCorsHeaders = (response) => {
  response.setHeader("Access-Control-Allow-Origin", "*"); // Allow your GitHub Pages URL
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE"
  ); // Allow GET, POST, PATCH, DELETE methods
  response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow content-type header
};

// Handle preflight requests (OPTIONS method)
router.options("*", (request, response) => {
  setCorsHeaders(response);
  response.status(200).send();
});

// ********** Application routes **********
// [ https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes ]

// ######## Get all projects ########

router.get("/", async (request, response) => {
  // [ https://www.geeksforgeeks.org/express-js-app-get-request-function/ ]

  const collection = await projects_db.collection("projects"); // get the projects collection request
  /* find all projects in the collection and convert data to array with .toArray() method [ https://www.mongodb.com/docs/manual/reference/method/cursor.toArray/ ]
     return all documents in a collection, omit query parameter or pass an empty document ({}) 
     db.collection.find() same with db.collection.find({}) [ https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-query ]
  */
  const projects = await collection.find({}).toArray();

  setCorsHeaders(response); // Set CORS headers before sending the response
  response.send(projects).status(200); // send response with status 200 ok
});

// ######## Get a project based on project id ########

/* [ https://expressjs.com/en/guide/routing.html#route-parameters ]
To use route parameters, im adding a parameter to the route. Syntax for defining a route parameter (:parameter).
*/
router.get("/:id", async (request, response) => {
  // [ https://www.geeksforgeeks.org/express-js-app-get-request-function/ ]

  const collection = await projects_db.collection("projects"); // get the projects collection
  /* find all projects in the collection and convert data to array with .toArray() method [ https://www.mongodb.com/docs/manual/reference/method/cursor.toArray/ ]
       return all documents in a collection, omit query parameter or pass an empty document ({}) 
       db.collection.find() same with db.collection.find({}) [ https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-query ]
    
    [ https://www.geeksforgeeks.org/what-is-objectid-in-mongodb/ ]
    In MongoDB, every document within a collection contains an "_id" field that uniquely identifies it, serving as the primary key.
    
    [ https://expressjs.com/en/guide/routing.html#route-parameters ]
    example
        Route path: /:id/
        Request URL: http://localhost:5050/34/
        req.params: { "id": "34" }
    */

  const project_id = request.params.id; // get the project .id referring to "/:id" parameter from the url params object
  const query = { _id: new ObjectId(project_id) }; // set new query object id based on entry in the database having the _id field
  /* [ https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/ ]
    findOne(query) looks for a single document in the collection that matches the criteria in query (_id).
   */
  const project = await collection.findOne(query);

  setCorsHeaders(response); // Set CORS headers before sending the response
  // check if no projects are found
  if (!project) {
    response
      .send("project not found") // Send the HTTP response. [ https://expressjs.com/en/5x/api.html#res.send ]
      .status(404); // Set the status code. [ https://expressjs.com/en/5x/api.html#res.status ]
  } else {
    response.send(project).status(200); // send response with status 200 ok
  }
});

// ######## Create a new project ########

// Create a new class to create new project

class CreateProject {
  constructor(request) {
    const reqbody = request.body; // easier access to request.body
    this.name = reqbody.name;
    this.category = reqbody.category;
    this.description = reqbody.description;
    this.tech_stack = reqbody.tech_stack;
    this.repository = reqbody.repository;
    this.url = reqbody.url;
    this.image = reqbody.image;
  }
}

/* [ https://expressjs.com/en/guide/routing.html#route-parameters ]
To use route parameters, im adding a parameter to the route. Syntax for defining a route parameter (:parameter).
*/
router.post("/", async (request, response) => {
  // [ https://www.geeksforgeeks.org/express-js-app-post-function/ ]

  try {
    const newProject = new CreateProject(request);

    /*
        -----result-----
        const newProject = {
            name: request.body.name,
            category: request.body.category,
            description:request.body.description,
            tech_stack:request.body.tech_stack,
            repository:request.body.repository,
            url:request.body.url,
            image:request.body.image,
        };
        */

    const collection = await db.collection("projects"); // get the projects collection

    const project = await collection.insertOne(newProject); // [ https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/ ]
    setCorsHeaders(response); // Set CORS headers before sending the response
    response.send(project).status(204); // send response with status 204 ok [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204 ]
  } catch (error) {
    console.error(error); // console log error
    response
      .status(500) // [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 ]
      .send("Error adding new project");
  }
});

// ######## Update a project based on project id ########

router.patch("/:id", async (request, response) => {
  // [  update the specific part of the database entry [ https://www.geeksforgeeks.org/difference-between-put-and-patch-request/#patch-request ]

  try {
    const project_id = request.params.id; // get the project .id referring to "/:id" parameter from the url params object
    const query = { _id: new ObjectId(project_id) }; // set new query object id based on entry in the database having the _id field
    // [ https://www.mongodb.com/docs/manual/reference/operator/update/set/ ]

    const newProject = new CreateProject(request);

    const collection = await db.collection("projects"); // get the projects collection

    const projectUpdates = { $set: newProject };

    /*
        -----result-----
        const projectUpdates = {
            $set:{
                name: request.body.name,
                category: request.body.category,
                description:request.body.description,
                tech_stack:request.body.tech_stack,
                repository:request.body.repository,
                url:request.body.url,
                image:request.body.image,
            },
        };
        */

    const project = await collection.updateOne(query, projectUpdates); // [ https://www.mongodb.com/docs/php-library/current/reference/method/MongoDBCollection-updateOne/ ]
    setCorsHeaders(response); // Set CORS headers before sending the response
    response.send(project).status(200); // send response with status 200 ok [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200 ]
  } catch (error) {
    console.error(error); // console log error
    response
      .status(500) // [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 ]
      .send("Error updating project");
  }
});

// ######## Update a project based on project id ########

router.delete("/:id", async (request, response) => {
  // [  update the specific part of the database entry [ https://www.geeksforgeeks.org/express-js-app-delete-function/ ]

  try {
    const project_id = request.params.id; // get the project .id referring to "/:id" parameter from the url params object
    const query = { _id: new ObjectId(project_id) }; // set new query object id based on entry in the database having the _id field
    // [ https://www.mongodb.com/docs/manual/reference/operator/update/set/ ]

    const newProject = new CreateProject(request);

    const collection = await projects_db.collection("projects"); // get the projects collection

    const project = await collection.deleteOne(query); // [https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/ ]
    setCorsHeaders(response); // Set CORS headers before sending the response
    response.send(project).status(200); // send response with status 200 ok [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200 ]
  } catch (error) {
    console.error(error); // console log error
    response
      .status(500) // [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 ]
      .send("Error deleting project");
  }
});

export default router; // export router module
