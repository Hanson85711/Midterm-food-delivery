$(document).ready(function() {
  const $foodContainer = $('.category-row');
  let buttons = [];
  let userId;

  //Initial renders of foods from server
  const loadFoods = function() {
    $.ajax({
      method: 'GET',
      url: '/api/foods'
    })
      .then(function(response) {
        console.log(response);
        renderFoods(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadFoods();

  //Individual Food Listing Creator
  const createFoodListing = function(foodobj) {
    //Takes in a food object and formats it into html format
    const foodPic = foodobj.pic;
    const foodName = foodobj.name;
    const foodDesc = foodobj.description;
    const foodPrice = foodobj.price;
    const buttonId = foodobj.id;
    userId = foodobj.user_id;

    const $foodListing = $(`
    <li class="category-item">
    <div class="category-item-img"><img src = ${foodPic}/></div>
    <div class="category-item-name"> ${foodName}</div>
    <div class="category-item-descriptions">${foodDesc}</div>
    <div class="category-item-price">$${foodPrice}</div>
    <button id=${buttonId} class="menu-button">Add to cart</button>
    <ul id="users"></ul>
  </li>
  `);
  setTimeout(() => {
    buttons = document.querySelectorAll('.menu-button');
    console.log("the buttons", buttons);
    buttonClickSend();
  }, 500);
    return $foodListing;
  };

  const renderFoods = function(foods) {
    //function that loops through foods and calls createFoodListing on each food
    for (const food of foods.foods) {
      const $food = createFoodListing(food);
      $foodContainer.append($food); //Appends return value to food container
    }
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  //On Click Function which adds item to database
  const buttonClickSend = function() {
    for (let index = 0; index < buttons.length; index++) {
      console.log("Reading through array");
      buttons[index].onclick = function () {
        console.log("clicked");
        $.ajax({
          method: 'GET',
          url: '/api/foods/add',
          data: {foodId: buttons[index].id, userId: getCookie("user_id")}
        })
          .then(function(response) {
            console.log("this is working");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
});
