const express = require('express');
const router  = express.Router();
const { getUsers } = require('../db/queries/users');
const {  getUserDetails } = require('../helpers');

router.get('/', async (req, res) => {
  const users = await getUsers(); // users objects
  const userId = req.cookies.user_id; // id from cookie
  const type = getUserDetails(users, userId)
  res.render('orderDetails', {orderId: req.query.orderNum, userIdParams: req.query.orderUser, type } )
});

module.exports = router;
