const express = require("express");
const router = express.Router();
const db = require("../db.js");
const cors = require("cors");
router.use(express.json());
router.use(cors());

router.post("/us", (req, res) => {
  const { name, email, message } = req.body;

  const query = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
  db.run(query, [name, email, message], function (err) {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
    res
      .status(200)
      .json({ message: "Message saved successfully!", id: this.lastID });
  });
});

module.exports = router;
