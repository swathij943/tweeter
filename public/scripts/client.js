/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//creating each tweet using info from the database(in-memory)

const createTweetElement = function(tweetData) {

  //create tweet article

 let $tweet = $('<article>').addClass('tweet');

  //create & append header, containing div (username & avatar) & handler

  let $header = $("<header>");
  let $headerDiv = $("<div>");
  $('<img>')
    .attr('src', tweetData["user"]["avatars"])
    .appendTo($headerDiv);
  $('<p>')
    .text(tweetData["user"]["name"])
    .appendTo($headerDiv);
    $header.append($headerDiv);
  $('<p>')
    .addClass('username')
    .text(tweetData["user"]["handle"])
    .appendTo($header);

  //append header to tweet article

  $tweet.append($header);

  //create & append main content & main text

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
    .addClass('timeago')
    .attr('title', new Date(tweetData["created_at"]).toISOString())
    .appendTo($footer);

    $('p.timeago').ready(function() {
      $("p.timeago").timeago();
    })
    
    let $footerDiv = $('<div>');
    $('<img>')
      .attr('src', '../images/flag.png')
      .appendTo($footerDiv);
    $('<img>')
      .attr('src', '../images/exchange.png')
      .appendTo($footerDiv);
    $('<img>')
      .attr('src', '../images/heart.png')
      .appendTo($footerDiv);
  
      $footer.append($footerDiv);
  $tweet.append($footer);

  return $tweet;
};

//loops through the database and extract each object to fill the tweets information

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweetSection').prepend($tweet);
  }
  $('#textBar').val('');
};

//checks for error message and returns it for display

const formValidation = (data) => {
  let errorMsg;
  if (!data) {
    errorMsg = "Cannot submit empty tweet";
  }
  if (data.length > 140) {
    errorMsg = "Cannot submit tweet over 140 characters";
  }
  return errorMsg;
};

//submit an ajax request to add the tweet to the db asynchronously

const submitForm = (url, method, tweet) => {
  $.ajax({url, method, data: { text: tweet } })
    .then(() => {
      loadLastTweet('/tweets');
    })
    .fail(err => {
      console.log(err);
    });
};
//fetch or load all tweet async onto the page

const loadTweets = url => {
  $.ajax({url, method: 'GET'})
    .then(tweets => {
      renderTweets(tweets);
    })
    .fail(err => {
      console.log(err);
    });
};
//load the newly submitted tweet onto the page

const loadLastTweet = url => {
  $.ajax({url, method: 'GET'})
    .then(tweets => {
      renderTweets([tweets[tweets.length - 1]]);
    })
    .fail(err => {
      console.log(err);
    });
};

//shorthand of document ready menthod is $(() => {}) - $(document).ready(function() {})

$(() => {
  //hides the initial error message
  $('.error').hide()

  $('#form').on('submit', function(event) {
    event.preventDefault();
    let tweet = $('#form textarea').val();


    const errorMsg = formValidation(tweet);

    //if there is an error toggles down the error message
    if (errorMsg) {
      $('.error').slideDown().text(errorMsg);

      //clicking anywhere on the body will toggle the errorMsg back up 
      $('body').on('click', function() {
        $('.error').slideUp();
        $('textarea').focus();
      });
    } else {
      submitForm('/tweets', 'POST', tweet);
    }
  });
  //load all the tweets onto the page without refreshing 

  loadTweets("/tweets")

  //To slide down the form to submit a new tweet

  $('#slideBtn').on('click', function() {
    $('#form').slideToggle();
    $('textarea').focus();
  });
});
