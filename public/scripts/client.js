/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//loop through database & filter each object to fill tweets info
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet)
    $(".container").append($tweet)
  }
}

//creating each tweet using info from the database
const createTweetElement = function(tweetData) {
  //create tweet article

  let $tweet = $('<article>').addClass('tweet');

  //create & append header, containing div (username & avatar) & handler

  let $header = $("<header>");

  let $headerDiv = $("<div>");

  $('<img>')
  .att('src', tweetData["user"]["avatars"])
  .appendTo($headerDiv);

  $('<p>')
  .text(tweetData["user"]["name"])
  .appendTo($headerDiv);
  $header.append($headerDiv);

  $('<p>')
  .addClass('username')
  .text(tweetData["user"]["handle"])
  .appendTo($header)

  //append header to tweet article

  $tweet.append($header);

  //create & append content div & main text

  let $content = $("<div>");
  $('<p>')
  .text(tweetData["content"]["text"])
  .appendTo($content);
  $tweet.append($content);

  //create footer appended to the tweet article

  let $footer = $("<footer>");
  $('<p>')
  .text(new Date(tweetData["created_at"]).toDateString())
  .appendTo($footer);

  $('<p>')
  .text('like')
  .addClass('interaction')
  .appendTo($footer);
  $tweet.append($footer);

  //Format the time passed since the tweet's creation
  const timePassed = $.timeago(tweetData["created_at"]);
  $('<p>')
  .text(timePassed)
  .appendTo($footer);

  return $tweet;
}

//AJAX POST request when posting a new tweet

const ajaxPostRequest = (url, method, data) => {
  console.log('Starting AJAX call')
  $.ajax({url, method, data})
  .then(response => {
    console.log('worked')
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {
    console.log('Completed')
  });
}

//responsible for fetching tweets
const loadTweets = (url, method) => {
  $.ajax({url, method})
  .then(tweets => {
    renderTweets(tweets)

    //After rendering tweets, update the timeago formatting
    $(".container").find("footer p:first-child").each(function() {
      const timestamp = $(this).text();
      $(this).text($.timeago(timestamp));
    })
  })
  .fail(err => {
    console.log(err)
  })
}


//shorthand of document ready menthod is $(() => {}) - $(document).ready(function() {})

$(() => {
  $('#form').on('submit', function(event) {
    event.preventDefault();
    tweet = $(this).serialize();
    ajaxPostRequest('/tweets', 'POST', tweet);
  })

  loadTweets("/tweets", "GET")
});
