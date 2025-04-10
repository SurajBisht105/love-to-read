const Page = require("../models/page");

// @desc    Get page by pageNumber
// @route   GET /api/pages/:pageNumber
// @access  Public
exports.getPageByNumber = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.pageNumber);
    const page = await Page.findOne({ pageNumber });

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};