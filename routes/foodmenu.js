const express = require("express");
const router = express.Router()

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
router.get('/checkout', (req, res) => {
  res.render('testfoods');
});

router.get('/fix', (req, res) => {
  res.render('testfoods');
});

module.exports = router;



