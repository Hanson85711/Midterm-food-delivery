require('dotenv').config();
const express = require('express');
const router = express.Router();
const adminQueries = require('../db/queries/adminorders');
const userQueries = require('../db/queries/users');
const cookieParser = require("cookie-parser");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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

router.post('/', (req, res) => {
  const orderNumber = req.body.orderNum;
  const orderMinutes = req.body.minutes;
  const userId = req.body.orderUser;
  return adminQueries.completeOrder(orderNumber)
    .then(data1 => {
      userQueries.getUsersFromId(data1[0].user_id)
      .then(data2 => {
       client.messages
      .create({
        body: `Hi ${data2[0].name}, your order will be ready in ${ orderMinutes } Minutes. `,
        from: '+13464856834',
        to: data2[0].phone
      })
      .then(message => console.log(message.sid))
      .catch(e => console.log(e));
      res.redirect('/')
    })
    .catch(e => console.log("error",e))

});
});

router.post('/delete', (req, res) => {
  const orderNumber = req.body.orderNum;
  let userId = req.query.userId;

  return adminQueries.deleteCompletedOrder(orderNumber)
    .then((result) => {
      const output = result.rows[0];
      console/log("result from admin-api",result)
      res.json({ output });
    })
    .catch((err) => {
      console.log("this is error", err);
    });
});


module.exports = router;

