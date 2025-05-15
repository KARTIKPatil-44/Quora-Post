// Importing required modules
const express = require("express"); // Express for building the web server
const app = express(); // Creating an instance of an Express app
const port = 8080; // Defining the port number for the server

const path = require("path"); // Path module to handle file/directory paths
const { v4: uuidv4 } = require("uuid"); // UUID module for generating unique IDs
const methodOverride = require("method-override"); // For supporting PUT & DELETE in HTML forms

// Middleware setup
app.use(methodOverride("_method")); // Override HTTP methods using query string (e.g., ?_method=DELETE)
app.use(express.urlencoded({ extended: true })); // Parses incoming form data (urlencoded)
app.use(express.static(path.join(__dirname, "public"))); // Serves static files from the 'public' folder

// View engine configuration
app.set("view engine", "ejs"); // Setting EJS as the templating engine
app.set("views", path.join(__dirname, "views")); // Setting the path for EJS view files

// In-memory sample data (array of post objects)
let posts = [
  {
    id: uuidv4(),
    username: "apanacollege",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    username: "Kartik Patil",
    content: "I got an internship at google",
  },
  {
    id: uuidv4(),
    username: "Prachi Jadhav",
    content: "I got an internship at cisco",
  },
];

// Route: Display all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); // Render index.ejs and pass posts array
});

// Route: Show form to create a new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs"); // Render form for new post creation
});

// Route: Handle form submission for new post
app.post("/posts", (req, res) => {
  let { username, content } = req.body; // Extract username and content from the form
  let id = uuidv4(); // Generate a unique ID for the new post
  posts.push({ id, username, content }); // Add new post to the posts array
  res.redirect("/posts"); // Redirect back to posts list
});

// Route: Show details of a specific post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params; // Extract post ID from URL
  let post = posts.find((p) => id == p.id); // Find the post with matching ID
  res.render("show.ejs", { post }); // Render the show.ejs page with the found post
});

// Route: Update an existing post's content
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params; // Get post ID from URL
  let newContent = req.body.content; // Get updated content from form
  let post = posts.find((p) => id == p.id); // Find the post
  post.content = newContent; // Update its content
  res.redirect("/posts"); // Redirect to posts list
});

// Route: Show edit form for a specific post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params; // Get ID from URL
  let post = posts.find((p) => id == p.id); // Find the post to be edited
  res.render("edit.ejs", { post }); // Render edit form with current post data
});

// Route: Delete a specific post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params; // Get ID from URL
  posts = posts.filter((p) => id !== p.id); // Remove the post from the array
  res.redirect("/posts"); // Redirect to posts list
});

// Start the server
app.listen(port, () => {
  console.log("Listening to port : 8080"); // Log when server starts
});
