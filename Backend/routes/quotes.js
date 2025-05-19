const express = require('express')
const app = express()
const router = express.Router()
const db = require('../db.js');
const cors = require("cors");
router.use(express.json());
router.use(cors());

router.get('/view', (req, res) => {
    const query = 'SELECT * FROM ToyotaQuotes';

    db.all(query, [], (err, quotes) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(quotes); 
    });
});

router.post('/add', (req, res) => {
  const { name, quote, position, image } = req.body;

    const query = 'INSERT INTO ToyotaQuotes (name, quote, type, image_url) VALUES (?, ?, ?, ?)';

    db.all(query, [name, quote, position, image], (err, quotes) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(quotes); 
    });
});


module.exports = router