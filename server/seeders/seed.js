require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Page = require("../models/page");
const fs = require("fs");
const path = require("path");

(async () => {
  try {
    // Connect DB
    await connectDB();

    // Clear existing data
    await Page.deleteMany({});

    // Function to encode an audio file in base64; throws error if the file is not found.
    const encodeAudioFile = (filename) => {
      const filePath = path.join(__dirname, "..", "audio", filename);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Audio file not found: ${filePath}`);
      }
      const fileData = fs.readFileSync(filePath);
      return fileData.toString("base64");
    };

    // Define pages data with unique audio files for both words and sentences.
    const pagesData = [
      {
        pageNumber: 1,
        pageType: "words",
        words: [
          { word: "Spend", audioFile: encodeAudioFile("Spend.mp3") },
          { word: "Spent", audioFile: encodeAudioFile("Spent.mp3") },
          { word: "Spell", audioFile: encodeAudioFile("Spell.mp3") },
          { word: "Spill", audioFile: encodeAudioFile("Spill.mp3") },
          { word: "Spin", audioFile: encodeAudioFile("Spin.mp3") },
          { word: "Splash", audioFile: encodeAudioFile("Splash.mp3") },
          { word: "Split", audioFile: encodeAudioFile("Split.mp3") },
          { word: "Spring", audioFile: encodeAudioFile("Spring.mp3") },
          { word: "Spot", audioFile: encodeAudioFile("Spot.mp3") },
          { word: "Spun", audioFile: encodeAudioFile("Spun.mp3") },
        ],
      },
      {
        pageNumber: 2,
        pageType: "sentence",
        sentence: "Spot is my pet dog.",
        sentenceAudioFile: encodeAudioFile("spot-sentence.mp3"),
      },
      {
        pageNumber: 3,
        pageType: "words",
        words: [
          { word: "Run", audioFile: encodeAudioFile("run.mp3") },
          { word: "jump", audioFile: encodeAudioFile("jump.mp3") },
        ],
      },
      {
        pageNumber: 4,
        pageType: "sentence",
        sentence: "I run fast.",
        sentenceAudioFile: encodeAudioFile("example-sentence.mp3"),
      },
    ];

    await Page.insertMany(pagesData);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding DB:", error);
    process.exit(1);
  }
})();
