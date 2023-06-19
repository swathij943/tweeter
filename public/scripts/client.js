/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//loop through database & filter each object to fill tweets info

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet)
    $('#tweetSection').prepend($tweet)
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

const formValidation = (data) => {
  let errorMsg;
  if(!data) {
    errorMsg = "Cannot submit empty tweets" 
  }
  if (data.length > 140) {
    errorMsg = "Cannot submit tweet over 140 characters"
  }
  return errorMsg
}

const submitForm = (url, method, tweet) => {
  const errorMsg = formValidation(tweet)
  if (errorMsg) {
    alert(errorMsg)
  } else {
    $.ajax({url, method, data: { tweet }})
    .then(() => {
      loadLastTweet('/tweets');
    })
    .fail(err => {
      console.log(err)
    })
  }
}

//responsible for fetching tweets
const loadTweets = url => {
  $.ajax({url, method: 'GET'})
  .then(tweets => {
    renderTweets(tweets)

    //After rendering tweets, update the timeago formatting
    $(".container").find("footer p:first-child").each(function() {
      const timestamp = $(this).tweet();
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
    let tweet = $('#form textarea').val();
    submitForm('/tweets', 'POST', tweet);
  })

  loadTweets("/tweets")
  
  $('#slideBtn').on('click', function() {
    $('#form').slideToggle()
    $('textarea').focus()
  })
});
