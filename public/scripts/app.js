// Client facing scripts here
//Test Button Click for getting from order database
$(document).ready(function () {
  const $ordersList = $('#orders');
  let buttonsAdd = [];
  let buttonsMinus = [];
  let buttonsDelete = [];
  let buttonSubmit = [];


  const loadCart = function() {
    return $.get('/api/orders')
      .then((response) => {
        $ordersList.empty();
        for (const order of response.orders) {
          console.log(order);
          const $cartItems = $(`
          <li class="cart-item">
         <img class="cart-item-image" src=${order.pic}/>
          <div class="cart-item-name"> ${order.food}</div>
          <div class="cart-item-count-icon"></div>
          <div class="cart-item-count"><button class="count-minus" id=${order.foodid}> <i class="fa-solid fa-circle-minus"></i></button>${order.count}<button class="count-add" id=${order.foodid}><i class="fa-solid fa-circle-plus"></button></i></div>
          <div class="category-item-price">$${order.total_price}</div>
          <div><button class="delete-button" id=${order.foodid}> <i class="fa-solid fa-trash"></i></button></div>
        </li>
        `);
          $cartItems.appendTo($ordersList);
        }
        console.log($ordersList);
        setTimeout(() => {
          buttonsAdd = document.querySelectorAll('.count-add');
          buttonsMinus = document.querySelectorAll('.count-minus');
          buttonsDelete = document.querySelectorAll('.delete-button');
          buttonSubmit = document.querySelectorAll('.order-button');
          console.log("the add buttons", buttonsAdd);
          console.log("the minus buttons", buttonsMinus);
          buttonClickAddSend();
          buttonClickMinusSend();
          buttonsDeleteItem();
          submitItemsInCart();
        }, 500);
      });
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


  const submitItemsInCart = function() {
    for (let index = 0; index < buttonSubmit.length; index++) {
      buttonSubmit[index].onclick = function () {
        $.ajax({
          method: 'GET',
          url: '/api/foods/update',
          data: {foodId: buttonSubmit[index].id, userId: getCookie("user_id")}
        })
          .then(function(response) {
            console.log(response);
            loadCart()
            .then(() => {
              getFinalPrice();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  const buttonsDeleteItem = function() {
    for (let index = 0; index < buttonsDelete.length; index++) {
      console.log("Reading through array");
      buttonsDelete[index].onclick = function () {
        console.log("clicked");
        $.ajax({
          method: 'GET',
          url: '/api/foods/trash',
          data: {foodId: buttonsDelete[index].id, userId: getCookie("user_id")}
        })
          .then(function(response) {
            console.log(response);
            loadCart()
            .then(() => {
              getFinalPrice();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
    //On Click Function which adds item to database
    const buttonClickAddSend = function() {
      for (let index = 0; index < buttonsAdd.length; index++) {
        console.log("Reading through array");
        buttonsAdd[index].onclick = function () {
          console.log("clicked");
          $.ajax({
            method: 'GET',
            url: '/api/foods/add',
            data: {foodId: buttonsAdd[index].id, userId: getCookie("user_id")}
          })
            .then(function(response) {
              console.log(response);
              loadCart()
              .then(() => {
                console.log("It's not working");
                getFinalPrice();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }

      //On Click Function which adds item to database
  const buttonClickMinusSend = function() {
    for (let index = 0; index < buttonsMinus.length; index++) {
      console.log("Reading through array");
      buttonsMinus[index].onclick = function () {
        console.log("clicked");
        $.ajax({
          method: 'GET',
          url: '/api/foods/minus',
          data: {foodId: buttonsMinus[index].id, userId: getCookie("user_id")}
        })
          .then(function(response) {
            console.log(response);
            loadCart()
            .then(() => {
              console.log("It's not working");
              getFinalPrice();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  const getFinalPrice = function() {
    return $.get('/api/orders/final')
      .then((response) => {
        for (const order of response.final) {
          console.log(order);
          if (order.final_price === null) {
            $(`<li class="order">`).text("Nothing in cart!").appendTo($ordersList);
          } else
          $(`<li class="order">`).text("Final Price: " + order.final_price).appendTo($ordersList);
        }
      });
  };

  loadCart()
    .then(() => {
      getFinalPrice();
    });
});

