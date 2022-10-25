// Client facing scripts here



//Test Button Click for getting from order database
$(document).ready(function () {
  const $ordersList = $('#orders');
  const loadCart = function () {
    $.ajax({
      method: 'GET',
      url: '/api/orders'
    })
      .done((response) => {
        $ordersList.empty();

        for (const order of response.orders) {
          //console.log("order", response);


          // $(`<li class="order">`).text(order.food + " " + "Quantity: x" + order.count + " Price: " + order.total_price).appendTo($ordersList);

          const $cartItems = $(`
          <li class="cart-item">
         <img class="cart-item-image" src=${order.pic}/>
          <div class="cart-item-name"> ${order.food}</div>
          <div class="cart-item-count-icon"></div>
          <div class="cart-item-count"> <i class="fa-solid fa-circle-minus"></i>${order.count}<i class="fa-solid fa-circle-plus"></i></div>
          <div class="category-item-price">$${order.total_price}</div>
          <div><i class="fa-solid fa-trash"></i></div>
        </li>
        `);
          $cartItems.appendTo($ordersList);
        }
      });
  };

  const getFinalPrice = function () {
    $.ajax({
      method: 'GET',
      url: '/api/orders/final'
    })
      .done((response) => {
        for (const order of response.final) {
          //console.log(order);
          $(`<div class="order">`).text("Total Price : $" + order.final_price).appendTo($ordersList);
        }
      });
  }


  loadCart();
  getFinalPrice();

});

