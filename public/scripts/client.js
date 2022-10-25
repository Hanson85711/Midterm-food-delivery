$(document).ready(function() {

  const $tweetContainer = $('#tweets-container');

  //Initial renders of tweets from server
  const loadTweets = function() {
    $.ajax({
      url: '/api/orders',
      method: 'GET'
    })
      .then(function(tweets) {
        console.log(tweets);
        renderTweets(tweets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadTweets();

  const refetchTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then(function(tweets) {
        let newTweet = createTweetElement(tweets[tweets.length - 1]);
        $tweetContainer.prepend(newTweet);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  $('.tweet-form').submit(function(event) {

    //Gets data from form
    event.preventDefault();
    const dataForAjax = $('.tweet-form').serialize();

    //Error Message reveal if trying to submit when over chara limit
    if ($('#tweet-text').val().length > 140) {
      return $('.hidden-error-msg').slideDown("slow", function() {
        //anim finished
      });
    }

    //Error Message reveal if trying to submit an empty tweet
    if ($('#tweet-text').val().length === 0) {
      return $('.hidden-error-msg-notext').slideDown("slow", function() {
        //anim finished
      });
    }

    //Submitting within chara limit makes error message go away
    if ($('#tweet-text').val().length < 140) {
      $('.hidden-error-msg').slideUp("slow", function() {
        //anim finished
      });

      $('.hidden-error-msg-notext').slideUp("slow", function() {
        //anim finished
      });
    }

    //Sending to server via POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: dataForAjax
    })
      .then((tweet) => {
        refetchTweets();
        $('.tweet-form')[0].reset();
        $('#charcounter').html(140);
      })
      .catch((error) => {
        console.log('error', error);
      });
  });



  const createTweetElement = function(tweetobj) {
    //Takes in a tweet object and formats it into html format
    const avatar = tweetobj.user.avatars;
    const user = tweetobj.user.name;
    const handle = tweetobj.user.handle;
    const content = tweetobj.content.text;
    const dateCreated = timeago.format(tweetobj.created_at);

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(`<article class="tweet">
    <header>
      <div class="tweeter-tagpfp">
        <img src= "${avatar}">
        <span class= "tweeter-name"> ${user} </span>
      </div>
      <span class= "tweeter-tag"> ${handle} </span>
    </header>
    <p class="tweet-text">
      ${escape(content)}
    </p>
    <hr class="tweet-line" size="8" width="95%" color="black">
    <footer>
      <span class="time-ago">${dateCreated}</span>
      <div class="tweet-options">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  `);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    //function that loops through tweets and calls createTweetElement for each tweet
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet); //Appends return value to tweets container
    }
  };
});
