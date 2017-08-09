"use strict";

// code pertinent to counting the number of characters typed into the tweet textbox

$(document).ready(function() {

  $("textarea").on('input', function() {

    const CHARACTER_LIMIT = 140

    const CHAR_COUNT = CHARACTER_LIMIT - $(this).val().length;
    $("#char-counter").html(CHAR_COUNT);

    if (CHAR_COUNT < 0) {
      $("#char-counter").addClass("beyond-limit");
    } else if (CHAR_COUNT >= 0) {
      $("#char-counter").removeClass("beyond-limit");
    }
  });
});

