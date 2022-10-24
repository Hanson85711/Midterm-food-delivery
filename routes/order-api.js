const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

router.get('/', (req, res) => {
  const userId = req.cookies; //Have to obtain user ID param with this
  console.log(req.cookies);
  orderQueries.getOrders(userId) //Change 2 to userId once cookie is implemented
    .then(orders => {
      res.json({ orders });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
