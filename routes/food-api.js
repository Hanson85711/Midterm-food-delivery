require('dotenv').config()

const express = require('express');
const router = express.Router();
const foodQueries = require('../db/queries/foods');
const adminQueries = require('../db/queries/adminorders');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const testNumber = process.env.TEST_NUMBER;
const client = require('twilio')(accountSid, authToken);

const { Pool } = require('pg');
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

  return pool
    .query(`UPDATE orders
        SET submitted = TRUE
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
      client.messages
        .create({ body: `You have received a new order from name, user. Please confirm on admin page.`, from: twilioNumber, to: testNumber })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e))
      res.json({ foods });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


