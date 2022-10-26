const express = require("express");
const router = express.Router();
const adminQueries = require('../db/queries/adminorders');

router.get('/', (req, res) => {
  res.render('admin');
});

// router.get('/', (req, res) => {
//   let userId = req.query.userId;
//   adminQueries.getSubmittedOrders()
//     .then(orders => {
//       res.json({ orders });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
//     res.render('admin');
// });

module.exports = router;

