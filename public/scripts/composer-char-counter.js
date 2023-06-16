$(document).ready(function() {
  $("#textBar").on('keypress', function() {
    $(this).nextAll('.counter').text(String(140 - $(this).val().length))
  })
});