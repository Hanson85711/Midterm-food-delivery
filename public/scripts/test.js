$(document).ready(function() {

  //Initial renders of tweets from server
  const loadFoods = function() {
    $.ajax({
      url: '/api/orders',
      method: 'GET'
    })
      .then(function(foods) {
        console.log(foods);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadFoods();
});
