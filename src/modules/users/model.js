
const mongoose = require("mongoose");
// require("dotenv").config();
const db = require("../../utilities/db");
const jwt = require("jsonwebtoken");
const constants = require("../../utilities/constants");

const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: false,
        trim: true,
      },
      gender: {
        type: String,
        enum: ["Male", "Female"],
      },
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true, // `email` must be unique
      },
      phoneNumber: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
         // `email` must be unique
      },
      password: {
        type: String,
        minLength: [8, "Password must be at least 8 characters"],
        required: true,
      },
      isActive: {
        type: Boolean,
        default : true,
      },
        //   not using all token approach right now
      tokens: {
        accessToken: { type: String },
        Access_ts: { type: String }, // issue time stamp
        access_validity_dur: { type: Number }, // validity
        refreshToken: { type: String }, // refresh token
        refresh_ts: { type: Date }, // issue time stamp
        refresh_validity_dur: { type: Number }, // validity in days
      },
      webNotificationToken: {
        type: [String],
        default: [],
      },
    },
    { timestamps: true }
  );

  module.exports = db.model("User", userSchema);