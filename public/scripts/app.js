// Client facing scripts here

//Test Button Click for getting from order database
$(() => {
  $('#test-orders').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/orders'
    })
    .done((response) => {
      const $ordersList = $('#orders');
      $ordersList.empty();
      console.log(response);

      for(const order of response.orders) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});
