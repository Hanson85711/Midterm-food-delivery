require('dotenv').config();
const express = require('express');
const router = express.Router();
const foodQueries = require('../db/queries/foods');
const userQueries = require('../db/queries/users');
const adminQueries = require('../db/queries/adminorders');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = '+18584375414'
const testNum = process.env.TEST_NUMBER;
const client = require('twilio')(accountSid, authToken);

const { Pool } = require('pg');
const { get } = require('./users-api');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

router.get('/', (req, res) => {
  foodQueries.getFoods()
    .then(foods => {
      res.json({ foods });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/add', (req, res) => {
  let foodId = req.query.foodId;
  let userId = req.query.userId;

  return pool
    .query(`INSERT INTO orders (food_id, user_id)
        VALUES ($1, $2) RETURNING *;`, [foodId, userId])
    .then((result) => {
      const output = result.rows[0];
      res.json({ output });
    })
    .catch((err) => {
      console.log("this is error", err);
    });
});

router.get('/minus', (req, res) => {
  let foodId = req.query.foodId;
  let userId = req.query.userId;

  return pool
    .query(`DELETE FROM orders
          WHERE ctid IN (
          SELECT ctid
          FROM orders
          WHERE user_id = $2
          AND food_id = $1
          AND submitted = false
          LIMIT 1)
          RETURNING *;`, [foodId, userId])
    .then((result) => {
      const output = result.rows[0];
      res.json({ output });
    })
    .catch((err) => {
      console.log("this is error", err);
    });
});

router.get('/trash', (req, res) => {
  let foodId = req.query.foodId;
  let userId = req.query.userId;
  console.log('foodId: ', foodId)
  console.log('userId: ', userId)
  return pool
    .query(`DELETE FROM orders
    WHERE user_id = $2
    AND food_id = $1
    AND submitted = false
    RETURNING *;
        ;`, [foodId, userId])
    .then((result) => {
      const output = result.rows[0];
      res.json({ output });
    })
    .catch((err) => {
      console.log("this is error", err);
    });
});

router.get('/update', (req, res) => {
  let userId = req.query.userId;
  return adminQueries.placeOrder(userId)
    .then(foods => {
      userQueries.getAdminPhone()
        .then(admin => {
          console.log(admin.rows)
           const adminNum = admin.rows[0].phone
           console.log('adminnum:', adminNum)
          client.messages
            .create({
              body: `You have received an order from customer ${foods[0].name}. Order Number ${foods[0].order_number}.   Please confirm on admin page. `,
              from: twilioNum,
              to: adminNum
            })
            .then(message => console.log('twilio message is a success: ', message.sid));
          res.json({ foods });
        })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;


