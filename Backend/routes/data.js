const express = require('express')
const app = express()
const router = express.Router()
const db = require('../db.js'); 
const cors = require("cors");
router.use(express.json());
router.use(cors());

router.get('/stock', (req, res) => {
    const query = 'SELECT * FROM ToyotaStockValue';

    db.all(query, [], (err, chart) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(chart); 
    });
});

router.get('/market', (req, res) => {
    const query = 'SELECT * FROM car_market_values';

    db.all(query, [], (err, chart) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(chart); 
    });
});

router.get('/super-cars', (req, res) => {
    const query = 'SELECT * FROM cars';

    db.all(query, [], (err, cards) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(cards); 
    });
});


module.exports = router