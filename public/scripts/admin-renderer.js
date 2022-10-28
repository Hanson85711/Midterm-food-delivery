$(document).ready(function() {
  const $adminOrderContainer = $('#admin-main');
  let userId;
  let buttonsDetails = [];
  let orderUserIds = [];

  //Initial renders of orders from server
  const loadOrdersForAdmin = function() {
    $.ajax({
      method: 'GET',
      url: '/api/admin'
    })
      .then(function(response) {
        // console.log("orders from db",response);
        console.log(response);
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

    const orderNumber = orderObj.order_number;
    const orderUser = orderObj.user_id;
    // const orderID = orderObj.id;
    console.log("order",orderObj)
    userId = orderObj.user_id;
    orderUserIds.push(userId);

    const $orderListing = $(`
    <li class="admin-item">
    <div class="admin-item-name"> ${"Order number: " + orderNumber + "    From: User " + orderUser}</div>
    <button class= "admin-button" id=${orderNumber}>See Order Details</button>
  </li>
  `);
    setTimeout(() => {
      buttonsDetails = document.querySelectorAll('.admin-button');
      viewOrderDetails();
    }, 500);
    return $orderListing;
  };

  const viewOrderDetails = function() {
    for (let index = 0; index < buttonsDetails.length; index++) {
      buttonsDetails[index].onclick = function() {
        let orderNum = buttonsDetails[index].id;
        let userIdURLParam = orderUserIds[index];
        let url = new URL('localhost:8080/order/detail');
        let params = new URLSearchParams(url.search);
        params.append('orderNum', orderNum);
        params.append('orderUser', userIdURLParam);
        window.location = '/order/detail?orderNum=' + orderNum + '&orderUser=' + userIdURLParam;
      }
    }
  }


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
