const express = require('express');
const router  = express.Router();
const adminQueries = require('../db/queries/adminorders');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

router.get('/', (req, res) => {
  const userId = req.cookies; //Have to obtain user ID param with this
  console.log(userId['user_id']);
  adminQueries.getSubmittedOrdersByUser()
    .then(orders => {
      console.log(orders);
      res.json({ orders });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

