const express = require('express');
const router = express.Router();
const orderQueries = require('../db/queries/orders');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());



router.get('/', (req, res) => {
  const userId = req.cookies; //Have to obtain user ID param with this
  console.log('userid: ', userId['user_id']);
  orderQueries.getOrders(userId['user_id'])
    .then(orders => {
      res.json({ orders });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/final', (req, res) => {
  const userId = req.cookies; //Have to obtain user ID param with this
  console.log(userId['user_id']);
  orderQueries.getFinalTotal(userId['user_id'])
    .then(final => {
      res.json({ final });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/detail', (req, res) => {
  const userId = req.cookies; //Have to obtain user ID param with this
  console.log("this is user id", req.query.userIdParam);
  orderQueries.getOrderFromNumber(req.query.orderId, req.query.userIdParam)
    .then( orderDetail => {
      res.json({ orderDetail });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



module.exports = router;
