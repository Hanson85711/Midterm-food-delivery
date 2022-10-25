// Client facing scripts here



//Test Button Click for getting from order database
$(document).ready(function () {
  const $ordersList = $('#orders');


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
          <div class="cart-item-count"><button id="count-increment"> <i class="fa-solid fa-circle-minus"></i></button>${order.count}<button id="count-increment"><i class="fa-solid fa-circle-plus"></button></i></div>
          <div class="category-item-price">$${order.total_price}</div>
          <div><button id="delete-button"> <i class="fa-solid fa-trash"></i></button></div>
        </li>
        `);
          $cartItems.appendTo($ordersList);
        }
      });
  };

  const getFinalPrice = function() {
    return $.get('/api/orders/final')
      .then((response) => {
        for (const order of response.final) {
          console.log(order);
          $(`<li class="order">`).text("Final Price: " + order.final_price).appendTo($ordersList);
        }
      });
  };

  loadCart()
    .then(() => {
      getFinalPrice();
    });
});

