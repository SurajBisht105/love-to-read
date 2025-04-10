const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  audioFile: { type: String, required: true }, // base64-encoded string
});

const pageSchema = new mongoose.Schema({
  pageNumber: { type: Number, required: true, unique: true },
  pageType: { type: String, enum: ["words", "sentence"], required: true },
  words: [wordSchema],
  sentence: { type: String },
  sentenceAudioFile: { type: String }, // base64-encoded string
});

module.exports = mongoose.model("Page", pageSchema);