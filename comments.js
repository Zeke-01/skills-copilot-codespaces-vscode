// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for POST /comments
// 4. Create a route for DELETE /comments/:id
// 5. Create a route for PUT /comments/:id
// 6. Create a route for GET /comments/:id
// 7. Listen on port 3000

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const comments = require('./comments');

// Create a web server
const app = express();

// Enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors());

// Parse JSON in the request body so we can access req.body
app.use(bodyParser.json());

// Create a route for GET /comments
app.get('/comments', (req, res) => {
  comments.getAll().then(comments => {
    res.json(comments);
  });
});

// Create a route for POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.create(newComment).then(insertedComment => {
    res.json(insertedComment);
  });
});

// Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.remove(id).then(() => {
    res.json({
      message: `Comment with id ${id} deleted`
    });
  });
});

// Create a route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  comments.update(id, updatedComment).then(comment => {
    res.json(comment);
  });
});

// Create a route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.get(id).then(comment => {
    res.json(comment);
  });
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});