const mongoose = require("mongoose");
const uri = process.env.MONGO_URL || "mongodb://localhost:27017/jk_local";


// Connect to MongoDB using createConnection method
const db = mongoose.createConnection(uri);

// Check for connection errors
db.on("error", console.error.bind(console, "connection error:"));

// Once connected, logging a success message
db.once("open", async function () {
  console.log("Connected to VB Store database");
});

module.exports = db;

// using mongoose for interacting with db