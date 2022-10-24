const express = require('express');
const router  = express.Router();
const foodQueries = require('../db/queries/foods');

router.get('/', (req, res) => {
  foodQueries.getFoods()
    .then(users => {
      res.json({ foods });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
