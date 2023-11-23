const mongoose = require("mongoose")
const db = require("../../utilities/db");

const bucketSchema = new mongoose.Schema(
    {
        bucketName: {
            type: String,
            required: true,
            trim: true,
          },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: false,
        },
        files: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'File' 
        }],
    }

    )
    
module.exports = db.model("Bucket", bucketSchema);