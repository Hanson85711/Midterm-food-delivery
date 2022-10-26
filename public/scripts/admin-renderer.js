$(document).ready(function() {
  const $adminOrderContainer = $('#admin-main');
  let userId;

  //Initial renders of orders from server
  const loadOrdersForAdmin = function() {
    $.ajax({
      method: 'GET',
      url: '/api/admin'
    })
      .then(function(response) {
        // console.log("orders from db",response);
        renderOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadOrdersForAdmin();

  //Individual order Listing Creator
  const creatOrderListing = function(orderObj) {
    //Takes in a order object and formats it into html format

    const orderName = orderObj.food;
    const orderPrice = orderObj.total_price;
   // const orderID = orderObj.id;

    userId = orderObj.user_id;
    console.log("foodobje",orderObj)

    const $orderListing = $(`
    <li class="admin-item">
    <div class="admin-item-name"> ${orderName}</div>
    <div class="admin-item-price">$${orderPrice}</div>
  </li>
  `);
    return $orderListing;
  };

  const renderOrders = function(foods) {
    // console.log(foods.orders)
    //function that loops through orders and calls createFoodListing on each food
    for (const order of foods.orders) {

      const $order = creatOrderListing(order);
      // console.log("$food",$food)
      $adminOrderContainer.append($order); //Appends return value to food container
    }
  };


});
