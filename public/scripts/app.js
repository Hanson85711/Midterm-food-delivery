// Client facing scripts here

//Test Button Click for getting from order database
$(document).ready(function() {
  const loadCart = function() {
      $.ajax({
        method: 'GET',
        url: '/api/orders'
      })
      .done((response) => {
        const $ordersList = $('#orders');
        $ordersList.empty();

        for(const order of response.orders) {
          console.log(order);
          $(`<li class="order">`).text(order.food + " " + "Quantity: x" + order.count + " Price: " + order.total_price).appendTo($ordersList);
        }
      });
  };

  loadCart();
});
