const express = require("express");
const router = express.Router();
const { getPageByNumber } = require("../controllers/pageController");

// GET page data by page number
router.get("/:pageNumber", getPageByNumber);

module.exports = router;