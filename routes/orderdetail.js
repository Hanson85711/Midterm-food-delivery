const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  
  console.log('query: ', req.query)
  res.render('orderDetails', {orderId: req.params.orderId, userIdParams: req.params.userIdParam})
});

module.exports = router;
