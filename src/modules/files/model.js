const mongoose = require('mongoose');
const db = require("../../utilities/db");
const fileSchema = new mongoose.Schema({
  filename: {
     type: String, 
     required: true 
    },
  bucket: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bucket', 
    required: true 
    },
  
});

const File = db.model('File', fileSchema);

module.exports = File;