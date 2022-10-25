// Client facing scripts here

//Test Button Click for getting from order database
$(document).ready(function() {
  const $ordersList = $('#orders');
  const loadCart = function() {
    return $.get('/api/orders')
      .then((response) => {
        $ordersList.empty();
        for (const order of response.orders) {
          console.log(order);
          $(`<li class="order">`).text(order.food + " " + "Quantity: x" + order.count + " Price: " + order.total_price).appendTo($ordersList);
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

