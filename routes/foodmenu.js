const express = require("express");
const router = express.Router()
const { getUsers } = require('../db/queries/users');
const {  getUserDetails } = require('../helpers');
//POST request to delete foods from order
router.post("/foods/:id/delete", (req, res) => {
})

//POST request for adding orders to cart
router.post("/foods", (req, res) => {
})

//Basic Landing Page which redirects to admin exclusive site if
router.get('/foods/:id', (req, res) => {
  if (users[req.session.user_id] === users[restaurantAdminID]) {
    res.redirect("/foods/admin");
  }
  res.render("foods");
});


//TestPage
router.get('/', async (req, res) => {
  // const myFoods = await getFoods();
  // //console.log('My Foods: ', myFoods);
  // const templateVars = {
  //   myFoods
  // }
  // res.render('index', templateVars);
  const users = await getUsers(); // users objects
  const userId = req.cookies.user_id; // id from cookie
  const type = getUserDetails(users, userId)
  console.log("type",type)
  const templateVars = {
    type
  }
  res.render('testfoods', templateVars);
});

router.get('/fix', (req, res) => {
  res.render('testfoods');
});

router.post('/orders', (req, res) => {
  const userId = req.session.userId;
  console.log(req);
  console.log(res);
  database.addOrder(1, userId)
    .then(food => {
      res.send(food);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
});



module.exports = router;



