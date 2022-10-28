$(document).ready(function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const orderNumber = urlParams.get("orderNum");
  const orderUser = urlParams.get("orderUser");
  const $ordersList = $('#orders');

  const loadOrder = function() {
    console.log("this is user", orderUser);
    $.ajax({
      method: 'GET',
      url: '/api/orders/detail',
      data: {orderId: orderNumber, userIdParam: orderUser}
    })
      .then(function(response) {
        for (const order of response.orderDetail) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  loadOrder();
})
