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

router.post('/', (req, res) => {
  console.log('body: ', req.body)
  
  res.redirect('/')
})

// client.messages
// .create({
//   body: `You have received an order from customer ${foods[0].name}. Order Number ${foods[0].order_number}.   Please confirm on admin page. `,
//   from: twilioNum,
//   to: adminNum
// })
// .then(message => console.log(message.sid));

module.exports = router;

