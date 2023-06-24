$(document).ready(function() {
  //hides the form to submit the new tweet & back up button on load
  $('#downBtn').hide();
  $('#form').hide();

  

  $("#textBar").on('input', function() {
    const maxCount = 140;

    let inputLength = $(this).val().length;
    $(this).nextAll('.counter').text(maxCount - inputLength);
    if (inputLength > 140) {
      $(this).nextAll('.counter').css("color", "red");
    } else {
      $(this).nextAll('.counter').css("color", "#545149");
    }
  });

//   const maxCount = 140;
  
//   $('#myTextarea').on('input', function() {
//     let inputLength = $(this).val().length;
//     let remainingCount = maxCount - inputLength;
    
//     $(this).nextAll('.counter').text(remainingCount);
    
//     if (inputLength > maxCount) {
//       $(this).nextAll('.counter').css("color", "red");
//     } else {
//       $(this).nextAll('.counter').css("color", "#545149");
//     }
//   });
// });

//when the user scroll past 230px it displays the second toggle button
$(window).scroll(function() {
  console.log($(window).scrollTop());
    if ($(window).scrollTop() > 230) {
      $('#downBtn').fadeIn('50');
      $('#navBtn').fadeOut('50');
    } else {
      $('#downBtn').fadeOut('50');
      $('#navBtn').fadeIn('50');
    }
  });
//when clicking on the second toggle button it brings back to the top of the page, also focuses on the textarea
$('#downBtn').on('click', function() {
  $('body, html').animate({scrollTop: 0}, '250', 'linear', () => {
    $('#form').slideDown();
    $('textarea').focus();
    $('#downBtn').fadeOut('50');
    $('#navBtn').fadeIn('50');
  });
});
});