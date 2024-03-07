const express = require("express");
const accountsRouter = require("./accounts/accounts-router");
 // Adjust the path as necessary

const server = express();

server.use(express.json()); // Middleware to parse JSON bodies

// Mount the accounts router on the /api/accounts path
server.use("/api/accounts", accountsRouter);

// Default route for testing server is up
server.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Global error handler middleware
server.use((err, req, res, ) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong! Please try again later.",
    error: err.message,
  });
});

module.exports = server;

