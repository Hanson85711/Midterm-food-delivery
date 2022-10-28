const express = require('express');
const router  = express.Router();
const adminQueries = require('../db/queries/adminorders');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUMBER;
const testNum = process.env.TEST_NUMBER;
const client = require('twilio')(accountSid, authToken);

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

router.post('/', (req, res) => {
  const orderNum = req.body.orderNum
  console.log(orderNum)
  const userId = req.body.orderUser
  console.log(userId)
  const minutes = req.body.minutes
  console.log(minutes)
  client.messages
  .create({
    body: `Hi name! Order ${orderNum} has been received and will be ready in ${minutes} minutes!`,
    from: twilioNum,
    to: testNum
  })
  .then(message => console.log(message.sid));
  res.redirect('/')
})

module.exports = router;

