"use strict";

// code pertinent to counting the number of characters typed into the tweet textbox

$(document).ready(function() {

  $("textarea").on('input', function() {

    const charCount = 140 - $(this).val().length
    $("#char-counter").html(charCount);

    if (charCount < 0) {
      $("#char-counter").removeClass("within-limit")
      $("#char-counter").addClass("beyond-limit")
    } else if (charCount >= 0) {
      $("#char-counter").removeClass("beyond-limit")
      $("#char-counter").addClass("within-limit")

    }

  });

});