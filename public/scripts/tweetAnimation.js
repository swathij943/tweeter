$(document).ready(function() {
  $("article.tweet").hover(
    function () {
      //adds the box shadow & username color for each tweet
      $(this).css("box-shadow", "10px 10px 5px #B0C4DE")
      $(this).find(".username").css("color", "blue")
    }, function () {
      //removes the box shadow & username color for each tweet
      $(this).css("box-shadow", "0px 0px")
      $(this).find(".username").css("color", "#f4f1ec")
    })
});