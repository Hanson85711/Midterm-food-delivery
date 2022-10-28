const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  console.log('query: ', req.query)
  console.log('orderID: ', req.query.orderNum)
  console.log('userIdParams: ', req.query.orderUser)
  res.render('orderDetails', {orderId: req.query.orderNum, userIdParams: req.query.orderUser})
});

module.exports = router;
