/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//driver code (tempotary). Eventuall it will get from the server
// Fake data taken from initial-tweets.json

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet)
    $(".container").append($tweet)
  }
}

//creating each tweet using info from the database
const createTweetElement = function(tweetData) {
  //create tweet article

  let $tweet = $('<article>').addClass('tweet');

  //create header, append div containing avatar & username & handler

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

  return $tweet;
}


//shorthand of document ready menthod is $(() => {})

$(document).ready(function() {
  renderTweets(data)
});
